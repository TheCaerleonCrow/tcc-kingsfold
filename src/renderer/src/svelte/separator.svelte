<script>
    let container;
    let isDragging = false;
    let dragState = {};

    function OnMouseDown(event)
    {
        event.preventDefault();
        isDragging = true;
        dragState =
        {
            px: container.previousElementSibling.clientWidth,
            mx: event.pageX,
            my: event.pageY,
        }
    }

    function OnMouseMove(event)
    {
        if (!isDragging) return;

        let dx = dragState.mx - event.pageX;

        let px = dragState.px - dx;
        if (px < 100) px = 100;
        
        container.previousElementSibling.style.width = `${px}px`;
    }

    function OnMouseUp(event)
    {
        isDragging = false;
    }
</script>

<style>
    .container
    {
        width: 4px;
        background-color: black;
    }
</style>

<svelte:window on:mouseup={OnMouseUp} on:mousemove={OnMouseMove} />
<div bind:this={container} class="container" on:mousedown={OnMouseDown}>
</div>