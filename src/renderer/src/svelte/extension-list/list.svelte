<script>
    import { Extensions } from '../store.js';

    import { createEventDispatcher, onDestroy } from 'svelte';
    const dispatch = createEventDispatcher();

    let items = [
        {name:'Gold Extension',icon:'assets/icon/icon_module_logs.png'},
        {name:'Silver Extension', icon:'assets/icon/icon_module_silver.png'},
    ];

    function ClickItem(item)
    {
        dispatch('openextension', item);
    }

    let unsubExtensions = Extensions.subscribe((value) =>
    {
        Object.keys(value).forEach((name) => 
        {
            items = [...items, {name,icon:value[name].icon}];
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
        width: 200px;
		background-color: #333;
		grid-area: 1 / 2 / 2 / 3;
        font-size: 0.9em;
	}

    .item 
    {
        display: flex;
        width: 100%;
        cursor: pointer;
    }

    .item:hover 
    {
        background-color: #444;
    }

    .item img
    {
        width: 24px;
    }
</style>

<div class="container">
    {#each items as item}
        <div class="item" on:click={()=>ClickItem(item)}>
            <img src={item.icon}/>
            {item.name}
        </div>
    {/each}
</div>