<script>

    import Item from './item.svelte';

    import { Workspaces } from '../store.js';

    import { onDestroy, createEventDispatcher } from 'svelte';
    let dispatch = createEventDispatcher();


    let items = [];

    function AddItem(item)
    {
        items = [...items, item];
    }

    function OnClickItem(item)
    {
        dispatch('selectWorkspace', item.name);
    }


    const unsubWorkspaces = Workspaces.subscribe((value) =>
    {
        Object.values(value).forEach(workspace => 
        {
            AddItem(workspace);
        });
    });


    onDestroy(() =>
    {
        unsubExtensions();
    });



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
    {#each items as item}
        <Item img={item.icon} on:click={() => OnClickItem(item)}/>
    {/each}
</div>