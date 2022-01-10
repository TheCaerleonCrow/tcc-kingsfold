<script>
    import { createEventDispatcher } from 'svelte';
    import Item from './item.svelte';

    import { Store } from '../workspace-store.js';

    let dispatch = createEventDispatcher();

    function OnClickItem(item)
    {
        dispatch('selectWorkspace', item.name);
    }
</script>

<style>
    .container
    {
        width: 64px;
        background-color: #222;
		grid-area: 1 / 1 / 2 / 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 4px 0;
    }
</style>

<div class="container">
    {#each $Store as workspace}
        <Item img={workspace.icon} on:click={() => OnClickItem(workspace)}/>
    {/each}
</div>