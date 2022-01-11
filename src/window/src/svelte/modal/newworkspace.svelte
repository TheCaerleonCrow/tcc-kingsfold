<script>
    import { createEventDispatcher } from 'svelte';
    import * as Workspaces from '../workspace-store.js';

    let name;
    let dispatch = createEventDispatcher();

    const OnSubmit = () => 
    {
        Workspaces.AddWorkspace(name, 'assets/avatars/MORGANABOOK1.png');
        Workspaces.SelectWorkspace(name);
        dispatch('close');
    }   
</script>

<div class="container">
    <div class="name">
        <div>Workspace Name</div>
        <input type="text" bind:value={name}>
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
</style>