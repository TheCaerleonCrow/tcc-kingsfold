<script>
    export let name;
</script>

{#if name === 'sep'}
    <div class="separator"></div>
{:else}
    <div class="container" on:click>
        {name}
    </div> 
{/if}


<style>
    .container {
        padding: 4px 16px;
        margin: 2px 0;
    }

    .container:hover {
        background-color: #444;
        color: gold;
    }

    .separator {
        border: 1px solid #444;
        margin: 2px 8px;
        height: 0px;
        border-radius: 25px;
    }
</style>