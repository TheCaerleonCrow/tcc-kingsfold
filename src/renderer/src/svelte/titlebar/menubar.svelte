<script>
    import Button from './button.svelte';
    import Menu from './menu.svelte';

    import { CurrentModal } from '../modal/store.js';

    const buttons = [
        {name:'File', hover:false, menuItems: [
            {enabled:true, name:'New Workspace', hotkey:'Ctrl+W', onClick:()=>CurrentModal.set('New Workspace')},
            {enabled:false, name:'Import Workspace', hotkey:'Ctrl+O', onClick:()=>console.log('Import Workspace')},
            {enabled:false, name:'Export Workspace', hotkey:'Ctrl+K', onClick:()=>console.log('Export Workspace')},
            {name:'sep'},
            {enabled:true, name:'Settings', hotkey:'Ctrl+K', onClick:()=>console.log('Settings')},
            {name:'sep'},
            {enabled:true, name:'Exit', onClick:__window.close},
        ]},
        {name:'Help', hover:false, menuItems: [
            {enabled:true, name:'Open Dev Tools', hotkey:'Ctrl+Shift+I', onClick:__window.openDevTools},
            {name:'sep'},
            {enabled:false, name:'Check For Updates'},
            {name:'sep'},
            {enabled:false, name:'About', hotkey:'Home'},
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
                <Menu x={menuState.position} items={button.menuItems} on:clickout={ClickOutMenu} on:clickitem={ClickOutMenu}/>
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