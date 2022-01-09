<script>
    import { createEventDispatcher } from 'svelte';
    let dispatch = createEventDispatcher();

    import * as WorkspacePanels from './store.js';
    import { workspaceWidth, workspaceHeight } from '../store.js';

    export let workspaceName;
    export let id;
    export let title = "Extension Name";
    export let x;
    export let y;
    export let w;
    export let h;
    export let icon = "";

    $: boundsX = $workspaceWidth;
    $: boundsY = $workspaceHeight;

    let isDragging = false;
    let dragState = {};

    function OnMouseDown(event)
    {
        event.preventDefault();
        isDragging = true;
        dragState = 
        {
            x, y,
            mx : event.pageX,
            my : event.pageY,
        };

        WorkspacePanels.GetWorkspace(workspaceName).CaptureMouse();
    }

    function OnMouseUp()
    {
        if (!isDragging) return;
        isDragging = false;
        WorkspacePanels.GetWorkspace(workspaceName).FreeMouse();
        __window.saveWorkspace(workspaceName, WorkspacePanels.GetWorkspace(workspaceName).Get());
    }

    function OnMouseMove(event)
    {
        if (!isDragging) return;

        let tx = dragState.x + (event.pageX - dragState.mx);
        let ty = dragState.y + (event.pageY - dragState.my);

        WorkspacePanels.GetWorkspace(workspaceName).Get().forEach(panel =>
        {
            if (panel.id == id) return;
            
            [tx,ty] = Snap(tx,ty,w,h,panel);
        });

        x = tx;
        y = ty;

        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x + w > boundsX) x = boundsX - w;
        if (y + h > boundsY) y = boundsY - h;
    }

    function OnClose()
    {
        dispatch('close');
    }

    function Snap(tx, ty, tw, th, other)
    {
        // We use these to make the rest a bit cleaner and easier to understand.
        let [left, right] = [tx, tx+tw];
        let [top, bottom] = [ty, ty+th];
        let [oleft, oright] = [other.x, other.x+other.w];
        let [otop, obottom] = [other.y, other.y+other.h];

        let vsnapped = false;
        let hsnapped = false;

        // Only snap vertically if we are within the left and right bounds of the other panel
        if ( (right > oleft) && (left < oright))
        {
            // Snap to the top of the other panel
            if (Math.abs(bottom - otop) <= 10) 
            {ty = otop - th - 3; vsnapped = true;}
            // Snap to the bottom of the other panel
            if (Math.abs(obottom - top) <= 10) 
            {ty = obottom + 3; vsnapped = true;}
        }

        // Only snap horizontally if we are within the top and bottom bounds of the other panel
        if ( (bottom > otop) && (top < obottom))
        {
            // Snap to the left of the other panel
            if (Math.abs(right - oleft) <= 10) 
            {tx = oleft - tw - 3; hsnapped = true;}
            // Snap to the right of the other panel
            if (Math.abs(oright - left) <= 10) 
            {tx = oright + 3; hsnapped = true;}
        }

        // Snap the left and right sides if snapped vertically
        if (vsnapped)
        {
            if (Math.abs(left - oleft) <= 10) tx = oleft;
            if (Math.abs(right - oright) <= 10) tx = oright - tw;
        }

        // Snap the top and bottom sides if snapped horizontally
        if (hsnapped)
        {
            if (Math.abs(top - otop) <= 10) ty = otop;
            if (Math.abs(bottom - obottom) <= 10) ty = obottom - th;
        }

        return [tx, ty, tw, th];
    }
</script>

<style>
    .container
    {
        background-color: #222;
        border-bottom: 1px solid #444;
        width: 100%;
        height: 16px;
        display: flex;
        justify-content: space-between;
        user-select: none;
    }

    .title, .button-close
    {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.6em;
    }

    .title 
    {
        padding-left: 4px;
        font-size: 0.8em;
        flex-grow: 1;
        overflow: hidden;
        white-space: nowrap;
        justify-content: left;
    }

    .title img 
    {
        width: 16px;
    }

    .button-close
    {
        cursor: pointer;
        width: 24px;
    }

    .button-close:hover 
    {
        background-color: red;
    }
</style>

<svelte:window on:mouseup={OnMouseUp} on:mousemove={OnMouseMove} />
<div class="container" on:mousedown={OnMouseDown}>
    <div class="title">
        <img src={icon} />
        {title}
    </div>
    <div class="button-close" on:click={OnClose}>
        <i class="fas fa-trash-alt"></i>
    </div>
</div>