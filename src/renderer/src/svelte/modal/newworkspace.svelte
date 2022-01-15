<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import * as Workspaces from '../workspace-store.js';

    let name;
    let selectedIcon = Assets.images.avatars.MORGANABOOK1;
    let avatars = [];
    let dispatch = createEventDispatcher();

    const OnSubmit = () => 
    {
        Workspaces.AddWorkspace(name, selectedIcon);
        Workspaces.SelectWorkspace(name);
        dispatch('close');
    }   

    onMount(async() =>
    {
        avatars = Object.values(Assets.images.avatars);
    });
</script>

<div class="container">
    <div class="name">
        <div>Workspace Name</div>
        <input type="text" bind:value={name}>
    </div>
    <img src={selectedIcon} alt="" />
    <div class="icons">
        {#each avatars as icon}
            <img src={icon} alt="" on:click={()=>selectedIcon=icon}/>
        {/each}
    </div>
    <div class="submit" on:click={OnSubmit}>Submit</div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
    }

    .name {
        display: flex;
        flex-direction: column;
        user-select: none;
    }

    .submit {
        align-self: flex-end;
        padding: 8px;
        background-color: #22AA22;
        border-radius: 5px;
        margin-top: 8px;
    }

    .submit:hover {
        background-color: #227722;
        cursor: pointer;
    }

    input {
        background-color: #111;
        width: 300px;
        padding: 8px;
        color: white;
        border: none;
        border-radius: 2px;
    }

    input:focus {
        outline: 1px solid #444;
    }

    .icons {
        display: grid;
        grid-template-columns: auto auto auto;
        height: 256px;
        overflow: scroll;
        overflow-x: hidden;
        margin-top: 8px;
    }

    img {
        width: 96px;
    }

    .icons img:hover {
        background-color: #444;
        cursor: pointer;
    }
</style>