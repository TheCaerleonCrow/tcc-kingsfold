<script>
    import { createEventDispatcher } from 'svelte';

    export let name;
    export let enabled;
    export let hotkey;

    let dispatch = createEventDispatcher();

    const OnClick = (event) =>
    {
        if (!enabled) return;
        dispatch('click', event);
    };
</script>

{#if name === 'sep'}
    <div class="separator"></div>
{:else}
    <div class="container" class:disabled={!enabled} on:click={OnClick}>
        <div class="name">{name}</div>
        {#if hotkey}
            <div class="hotkey">{hotkey}</div>
        {/if}
    </div> 
{/if}

<style>
    .container {
        padding: 4px 16px;
        margin: 2px 0;
        display: flex;
        justify-content: space-between;
    }

    .container:hover {
        background-color: #444;
        color: gold;
    }

    .disabled {
        color: #444;
    }

    .separator {
        border: 1px solid #444;
        margin: 2px 8px;
        height: 0px;
        border-radius: 25px;
    }

    .hotkey {
        padding-left: 32px;
    }
</style>