<script>
    import * as Workspaces from '../workspace-store.js';
    import { workspaceWidth, workspaceHeight } from '../store.js';

    export let workspaceName;
    export let id;
    export let x;
    export let y;
    export let w;
    export let h;

    $: boundsX = $workspaceWidth;
    $: boundsY = $workspaceHeight;

    let isDragging = false;
    let dragSide;
    let dragState;

    const dir_t = {x:0,y:-1,w:0,h:1};
    const dir_b = {x:0,y:0,w:0,h:-1};
    const dir_l = {x:-1,y:0,w:1,h:0};
    const dir_r = {x:0,y:0,w:-1,h:0};
    const dir_tl = {x:-1,y:-1,w:1,h:1};
    const dir_tr = {x:0,y:-1,w:-1,h:1};
    const dir_bl = {x:-1,y:0,w:1,h:-1};
    const dir_br = {x:0,y:0,w:-1,h:-1};

    function OnMouseDown(event, dir)
    {
        event.preventDefault();
        isDragging = true;
        dragSide = dir;
        dragState = 
        {
            x, y, w, h,
            mx: event.pageX,
            my: event.pageY,
        };

        Workspaces.SetMouseState(workspaceName, 'none');
    }

    function OnMouseUp()
    {
        if (!isDragging) return;
        isDragging = false;

        Workspaces.SetMouseState(workspaceName, 'auto');
        Workspaces.SaveWorkspace(workspaceName);
    }

    function OnMouseMove(event)
    {
        if (!isDragging) return;

        const dx = dragState.mx - event.pageX;
        const dy = dragState.my - event.pageY;

        let tx = dragState.x + dx * dragSide.x;
        let ty = dragState.y + dy * dragSide.y;
        let tw = dragState.w + dx * dragSide.w;
        let th = dragState.h + dy * dragSide.h;

        Workspaces.GetPanels(workspaceName).forEach(panel =>
        {
            if (panel.id === id) return;
            [tx,ty,tw,th] = Snap(tx,ty,tw,th,panel);
        });

        x = tx;
        y = ty;
        w = tw;
        h = th;

        if (x < 0) 
        {
            w += x;
            x = 0;
        }

        if (y < 0)
        {
            h += y;
            y = 0;
        }

        if (w < 50)
        {
            if (dragSide.w == 1) x += w - 50;
            w = 50;
        }

        if (h < 50)
        {
            if (dragSide.h == 1) y += h - 50;
            h = 50;
        }

        if (x + w > boundsX)
        {
            w = boundsX - x;
            x = boundsX - w;
        }

        if (y + h > boundsY)
        {
            h = boundsY - y;
            y = boundsY - h;
        }
    }

    function Snap(tx, ty, tw, th, other)
    {
        // We use these to make the rest a bit cleaner and easier to understand.
        let [left, right] = [tx, tx+tw];
        let [top, bottom] = [ty, ty+th];
        let [oleft, oright] = [other.x, other.x+other.w];
        let [otop, obottom] = [other.y, other.y+other.h];
        let [dleft, dright] = [dragState.x, dragState.x + dragState.w];
        let [dtop, dbottom] = [dragState.y, dragState.y + dragState.h];
        
        let vsnapped = false;
        let hsnapped = false;

        // Only snap vertically if we are within the left and right bounds of the other panel
        if ( (right > oleft) && (left < oright))
        {
            // Are we connected vertically?
            if ( (Math.abs(bottom - otop) <= 10) || (Math.abs(obottom - top) <= 10)) 
                vsnapped = true;

            // If dragging the bottom, and the bottom is near the other panel's top
            if ( (dragSide.h == -1) && (Math.abs(bottom - otop) <= 10) )
                th = otop - top - 3;

            // If dragging the top, and the top is near the other panel's bottom
            if ( (dragSide.h == 1) && (Math.abs(top - obottom) <= 10) )
            {
                ty = obottom + 3; 
                th = dbottom - (obottom + 3);
            }
        }

        // Only snap horizontally if we are within the top and bottom bounds of the other panel
        if ( (bottom > otop) && (top < obottom))
        {
            // Are we connected horizontally?
            if ( (Math.abs(right - oleft) <= 10) || (Math.abs(left - oright) <= 10)) 
                hsnapped = true;

            // If dragging the right, and the right is near the other panel's left
            if ( (dragSide.w == -1) && (Math.abs(right - oleft) <= 10) )
                tw = oleft - left - 3;

            // If dragging the left, and the left is near the other panel's right
            if ( (dragSide.w == 1) && (Math.abs(left - oright) <= 10) )
            {
                tx = oright + 3; 
                tw = dright - (oright + 3);
            }
        }


        if (vsnapped)
        {
            if ( (dragSide.w == -1) && (Math.abs(right - oright) <= 10) )
                tw = oright - left;

            if ( (dragSide.w == 1) && (Math.abs(left - oleft) <= 10) )
            {
                tx = oleft;
                tw = dright - oleft;
            }
        }

        if (hsnapped)
        {
            if ( (dragSide.h == -1) && (Math.abs(bottom - obottom) <= 10) )
                th = obottom - top;

            if ( (dragSide.h == 1) && (Math.abs(top - otop) <= 10) )
            {
                ty = otop;
                th = dbottom - otop;
            }
        }

        return [tx, ty, tw, th]
    }

</script>



<style>
    .border
    {
        position: absolute;
        z-index: 999;
    }

    .top { top: -3px; }

    .bottom { bottom: -3px; }

    .left { left: -3px; }

    .right { right: -3px; }

    .vertical
    {
        width: 100%;
        height: 4px;
        cursor: n-resize;
    }

    .horizontal
    {
        width: 4px;
        height: 100%;
        cursor: w-resize;
    }

    .corner
    {
        width: 8px;
        height: 8px;
    }

    .top.left, .bottom.right { cursor: se-resize; }
    .top.right, .bottom.left { cursor: ne-resize; }
</style>



<svelte:window on:mouseup={OnMouseUp} on:mousemove={OnMouseMove} />

<div class="container">
    <div class="border vertical top" on:mousedown={e => OnMouseDown(e, dir_t)}></div>
    <div class="border vertical bottom" on:mousedown={e => OnMouseDown(e, dir_b)}></div>
    <div class="border horizontal left" on:mousedown={e => OnMouseDown(e, dir_l)}></div>
    <div class="border horizontal right" on:mousedown={e => OnMouseDown(e, dir_r)}></div>
    <div class="border corner top right" on:mousedown={e => OnMouseDown(e, dir_tr)}></div>
    <div class="border corner top left" on:mousedown={e => OnMouseDown(e, dir_tl)}></div>
    <div class="border corner bottom right" on:mousedown={e => OnMouseDown(e, dir_br)}></div>
    <div class="border corner bottom left" on:mousedown={e => OnMouseDown(e, dir_bl)}></div>
</div>