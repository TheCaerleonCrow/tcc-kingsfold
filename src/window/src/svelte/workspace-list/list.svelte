<script>

    import Item from './item.svelte';

    // import { Workspaces } from '../store.js';
    //import { GetAllWorkspaces } from '../store.js';

    import { Store } from '../workspace-store.js';

    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    let dispatch = createEventDispatcher();


    // let items = [];
    // let workspacesUnsubscriber;

    // function AddItem(item)
    // {
    //     items = [...items, item];
    // }

    function OnClickItem(item)
    {
        dispatch('selectWorkspace', item.name);
    }


    // const unsubWorkspaces = Workspaces.subscribe((value) =>
    // {
    //     items = [];
    //     Object.values(value).forEach(workspace => 
    //     {
    //         AddItem(workspace);
    //     });
    // });

    // onMount(() =>
    // {
    //     workspacesUnsubscriber = GetAllWorkspaces().subscribe(v =>
    //     {
    //         items = [];
    //         Object.values(v).forEach(AddItem);
    //     });
    // });

    // onDestroy(() =>
    // {
    //     if (workspacesUnsubscriber)
    //     workspacesUnsubscriber();
    //     // unsubExtensions();
    // });



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