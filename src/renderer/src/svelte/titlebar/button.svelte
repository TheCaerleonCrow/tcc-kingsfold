<script>
    export let name;
    export let icon = false;
    export let red = false;
    export let hover = false;
</script>

<div class="container" class:icon class:red class:hover on:click on:mouseover on:focus>
    {#if icon}
        <i class={name}></i>
    {:else}
        {name}
    {/if}
</div>

<style>
    .container {
        -webkit-app-region: no-drag;
        padding: 0 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .container:hover, .hover {
        background-color: #444;
    }

    .icon {
        width: 24px;
        color: white;
    }

    .red:hover {
        background-color: red;
    }
</style>