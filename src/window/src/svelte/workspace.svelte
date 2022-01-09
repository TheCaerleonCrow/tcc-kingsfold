<script>
    import { onMount, onDestroy } from 'svelte';

    import { Workspaces } from './store.js';
    import * as WorkspacePanels from './extension-panel/store.js';

    import ExtensionPanel from './extension-panel/panel.svelte';

    export let name;
    export let show;
    
    let panelStore;
    let panels = [];
    
    let panelsUnsubcriber;
    let workspaceUnsubscriber;

    function Init()
    {
        panelStore = WorkspacePanels.AddWorkspace(name);

        if (panelsUnsubcriber)
            panelsUnsubcriber();
        if (workspaceUnsubscriber)
            workspaceUnsubscriber();

        panelsUnsubcriber = panelStore.subscribe(v => panels = v);
        
        workspaceUnsubscriber = Workspaces.subscribe(v => 
        {
            if (v[name] === undefined) return;

            v[name].extensions.forEach(e =>
            {
                AddPanel(e.x, e.y, e.w, e.h, e.name);
            });
        });
    }

    export function AddPanel(x=0, y=0, width=100, height=100, title='Extension Name')
    {
        panelStore.Add(x, y, width, height, title);
    }

    function ClosePanel(id)
    {
        panelStore.Remove(id);
    }

    onMount(() =>
    {
        Init();
    });

    onDestroy(() => 
    {
        if (panelsUnsubcriber)
            panelsUnsubcriber();
        if (workspaceUnsubscriber)
            workspaceUnsubscriber();
    });

</script>

<style>
    .container
	{
        width: 100%;
        height: 100%;
        position: absolute;
        overflow: hidden;
	}
</style>

<div class="container" style={`display:${show ? 'initial':'none'}`}>
    {#each panels as panel (panel.id)}
        <ExtensionPanel
            on:close={() => ClosePanel(panel.id)}

            workspaceName = {name}
            bind:id={panel.id}
            bind:x={panel.x}
            bind:y={panel.y}
            bind:w={panel.w}
            bind:h={panel.h}
            bind:iframe={panel.iframe}
            bind:title={panel.title}
        />
    {/each}
</div>