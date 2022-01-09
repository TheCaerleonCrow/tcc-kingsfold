<script>
    import ExtensionPanel from './extension-panel/panel.svelte';
    import * as Workspaces from './workspace-store.js';
    import { VisibleWorkspace } from './workspace-store.js';

    export let name;
    
    let panels = Workspaces.GetPanelsStore(name);
    $: visible = $VisibleWorkspace === name;

    function ClosePanel(id)
    {
        Workspaces.RemovePanel(name, id);
    }
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

<div class="container" style={`display:${visible ? 'initial':'none'}`}>
    {#if panels !== undefined}
    {#each $panels as panel (panel.id)}
        <ExtensionPanel
            on:close={() => ClosePanel(panel.id)}

            workspaceName = {name}
            bind:id={panel.id}
            bind:x={panel.x}
            bind:y={panel.y}
            bind:w={panel.w}
            bind:h={panel.h}
            bind:iframe={panel.iframe}
            bind:title={panel.name}
        />
    {/each}
    {/if}
</div>