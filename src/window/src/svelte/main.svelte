<script>
	import { onMount, onDestroy } from 'svelte';

	import Titlebar from './titlebar/titlebar.svelte';
	import Workspace from './workspace.svelte';
	import ExtensionList from './extension-list/list.svelte';
	import WorkspaceList from './workspace-list/list.svelte';
	import StatusBar from './statusbar.svelte';
	import Separator from './separator.svelte';

	import ModalSystem from './modal/system.svelte';

	import { documentTitle, workspaceWidth, workspaceHeight } from './store.js';
	import * as Workspaces from './workspace-store.js';
	import { Store, VisibleWorkspace } from './workspace-store.js';

	let workspaceContainer;
	let workspacesUnsubscriber;
	const resizeObserver = new ResizeObserver(entries => OnResize());

	let showModal = true;

	function SelectWorkspace(name)
	{
		Workspaces.SelectWorkspace(name);
	}

	function OpenExtension(event)
	{
		Workspaces.AddPanel($VisibleWorkspace, {
			x:0, y:0,
			w:100, h:100,
			name: event.detail.name,
		});
	}

	function OnResize()
    {
        workspaceWidth.set(workspaceContainer.clientWidth -2);
        workspaceHeight.set(workspaceContainer.clientHeight -2);
    }

	onMount(async () =>
	{
		Workspaces.LoadWorkspaces(() =>
		{
			Workspaces.AddWorkspace('testworkspace', 'assets/avatars/MORGANABOOK1.png');
			Workspaces.AddWorkspace('default', 'assets/avatars/MORGANABOOK1.png');
			SelectWorkspace('default');
		});
		
		resizeObserver.observe(workspaceContainer);
	});

	onDestroy(() =>
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
	<ModalSystem />
	<Titlebar />
	<div class="main">
		<WorkspaceList on:selectWorkspace={(e) => SelectWorkspace(e.detail)} />
		<ExtensionList on:openextension={OpenExtension} />
		<Separator />
		<div class="workspace-container" bind:this={workspaceContainer}>
			{#each $Store as workspace (workspace.id)}
				<Workspace 
					name={workspace.name} 
				/>
			{/each}
		</div>
	</div>
	<StatusBar />
</div>