<script>
    import Button from './button.svelte';
    import Menu from './menu.svelte';

    const buttons = [
        {name:'File', hover:false, menuItems: [
            {enabled:true, name: 'New Workspace', onClick:()=>console.log('New Workspace')},
            {enabled:false, name: 'Import Workspace'},
            {enabled:false, name: 'Export Workspace'},
        ]},
        {name:'Help', hover:false, menuItems: [
            {enabled:false, name: 'Check For Updates'},
            {name: 'sep'},
            {enabled:true, name: 'About'},
        ]},
    ];

    let menuState = {
        active: false,
        position: 0,
        name: '',
    };

    const SelectMenu = (name, x) =>
    {
        menuState.active = true;
        menuState.name = name;
        menuState.position = x;

        for (let button of buttons) button.hover = button.name == name;
        buttons = buttons;
    }

    const ClickButton = (n,e) => 
    {
        SelectMenu(n,e.target.offsetLeft);
    };

    const HoverButton = (n,e) =>
    {
        if (!menuState.active) return;
        SelectMenu(n,e.target.offsetLeft);
    };

    const ClickOutMenu = () =>
    {
        menuState.active = false;

        for (let button of buttons) button.hover = false;
        buttons = buttons;
    };
</script>

<div class="container">
    <div class="buttons">
        {#each buttons as button}
            <Button 
                name={button.name} 
                bind:hover={button.hover} 
                on:click={(e) => ClickButton(button.name, e)} 
                on:mouseover={(e) => HoverButton(button.name, e)}
            />
            {#if menuState.active && menuState.name == button.name}
                <Menu x={menuState.position} items={button.menuItems} on:clickout={ClickOutMenu} />
            {/if}
        {/each}
    </div>
</div>

<style>
    .buttons {
        display: flex;
        align-items: left;
        height: 100%;
    }
</style>