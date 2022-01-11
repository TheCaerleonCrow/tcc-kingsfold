<script>
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';

    export let title;
    export let width;
    export let height;
    let x;
    let y;
    $: style = `width:${width}px;height:${height}px;left:${x}px;top:${y}px;`;

    let dispatch = createEventDispatcher();

    onMount(() => 
    {
        x = document.body.clientWidth/2 - width/2;
        y = document.body.clientHeight/2 - height/2;
    });

    const Close = () =>
    {
        dispatch('close');
    };
</script>

<div class="shadow"></div>
<div class="container" style={style}>

    <div class="titlebar">
        <div class="title">{title}</div>
        <div class="close" on:click={Close}><i class="fas fa-times"></i></div>
    </div>
    <div class="slot">
        <slot></slot>
    </div>
</div>

<style>
    .shadow {
        position:absolute;
        left:0;
        top:32px;
        width:100%;
        height:calc(100% - 32px - 24px);
        background-color: #000000AA;
        z-index: 8888;
    }

    .container {
        position: absolute;
        box-shadow: 0 0 100px black;
        background-color: #222;
        z-index: 9999;
    }

    .titlebar {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #444;
        padding: 8px 8px 0 8px;
        user-select: none;
        font-weight: bold;
        background-color: #222;
    }

    .slot {
        padding: 8px;
    }
</style>