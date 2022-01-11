<script>
    import { createEventDispatcher } from 'svelte';

    import MenuItem from './menuitem.svelte';

    export let x;
    export let items;
    $: style = `left:${x}px`;

    let dispatch = createEventDispatcher();


    const OnClickItem = (event, item) =>
    {
        item.onClick(event);
        dispatch('clickitem', item);
    };

    const DetectOutsideClick = (node) => 
    {
        const handleClick = (event) => 
        {
            if (!node) return;
            if (node.contains(event.target)) return;
            
            node.dispatchEvent(new CustomEvent('clickout', node));
        };

        document.addEventListener('click', handleClick, true);

        return {
            destroy: () => 
            {
                document.removeEventListener('click', handleClick, true);
            },
        }
    };
</script>

<div class="container" style={style} use:DetectOutsideClick on:clickout>
    {#each items as item}
        <MenuItem name={item.name} enabled={item.enabled} hotkey={item.hotkey} on:click={(e)=>OnClickItem(e,item)}/>
    {/each}
</div>

<style>
    .container {
        box-shadow: 0 5px 10px black;
        background-color: #222;
        position: absolute;
        top: 32px;
        z-index: 9999;
        padding: 4px 1px;

        display: flex;
        flex-direction: column;
    }
</style>