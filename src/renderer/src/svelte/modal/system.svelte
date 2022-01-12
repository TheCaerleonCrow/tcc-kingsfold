<script>
    import Base from './base.svelte';
    import NewWorkspace from './newworkspace.svelte';
    import { CurrentModal } from './store';

    const modals = 
    {
        'New Workspace' : NewWorkspace,
    };

    const OnClose = () => 
    {
        CurrentModal.set('');
    };
</script>

{#if modals[$CurrentModal] !== undefined}
    <Base bind:title={$CurrentModal} on:close={OnClose}>
        <svelte:component this={modals[$CurrentModal]} on:close={OnClose}/>
    </Base>
{/if}