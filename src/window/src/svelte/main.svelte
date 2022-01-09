<script>
	import { onMount, onDestroy } from 'svelte';

	import Titlebar from './titlebar.svelte';
	import Workspace from './workspace.svelte';
	import ExtensionList from './extension-list/list.svelte';
	import WorkspaceList from './workspace-list/list.svelte';
	import StatusBar from './statusbar.svelte';
	import Separator from './separator.svelte';

	import { documentTitle, workspaceWidth, workspaceHeight, Workspaces } from './store.js';
	import * as WorkspacePanels from './extension-panel/store.js';

	let workspaces = [];
	let workspaceContainer;

	let workspacesUnsubscriber;

	function OpenWorkspace(name,show=false)
	{
		workspaces = [...workspaces, {name,comp:null,show}];
	}

	function SelectWorkspace(event)
	{
		documentTitle.set(`${event.detail} - Kingsfold`);
		workspaces.forEach(w => w.show = w.name == event.detail);
		workspaces = workspaces;
	}

	function OpenExtension(event)
	{
		workspaces.forEach(w => 
		{
			if (!w.show) return;
			w.comp.AddPanel(0, 0, 100, 100, event.detail.name);
			__window.saveWorkspace(
				w.name,
				WorkspacePanels.GetWorkspace(w.name).Get()
			);
		});
	}

	function OnResize()
    {
        workspaceWidth.set(workspaceContainer.clientWidth -2);
        workspaceHeight.set(workspaceContainer.clientHeight -2);
    }

	const resizeObserver = new ResizeObserver(entries => OnResize());

	onMount(_ =>
	{
		OpenWorkspace('default',true);
		OpenWorkspace('workspaceTest1');

		resizeObserver.observe(workspaceContainer);
	});

	onDestroy(_ =>
	{
		if (workspacesUnsubscriber)
			workspacesUnsubscriber();
	});
</script>

<style>
	.container 
	{
		background-color: #000;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template: 32px 1fr 24px / 1fr;
		grid-row-gap: 2px;
	}

	.main 
	{
		grid-area: 2 / 1 / 3 / 2;
		display: flex;
	}

	.workspace-container
	{
		position:relative;
		flex-grow: 1;
		background-color: #222222;
		background-image: url("../assets/misc/icon_worldmap.png");
		background-position: center;
		background-repeat: no-repeat;
        background-size: 128px;
	}
</style>

<div class="container">
	<Titlebar />
	<div class="main">
		<WorkspaceList on:selectWorkspace={SelectWorkspace} />
		<ExtensionList on:openextension={OpenExtension} />
		<Separator />
		<div class="workspace-container" bind:this={workspaceContainer}>
			{#each workspaces as workspace,index}
				<Workspace 
					bind:this = {workspace.comp}
					show={workspace.show}
					name={workspace.name} 
				/>
			{/each}
		</div>
	</div>
	<StatusBar />
</div>