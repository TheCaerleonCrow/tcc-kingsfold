
<script>
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';

    import { Extensions } from '../store.js';
    import Titlebar from './titlebar.svelte';
    import Borders from './borders.svelte';

    let dispatch = createEventDispatcher();
    let icon;

    export let workspaceName;
    export let id;
    export let title = 'Extension Name';
    export let iframe = null;
    export let x = 0;
    export let y = 0;
    export let w = 300;
    export let h = 300;

    function OnClose()
    {
        dispatch('close');
    }

    function OnLoadIframe()
    {
        Extensions.subscribe(value => 
        {
            if (value[title] === undefined) return;

            iframe.contentWindow.ImportAssets(Assets);

            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = value[title].main;
            iframe.contentWindow.document.head.appendChild(script);

            if (value[title].css)
            {
                let css = document.createElement('link');
                css.rel = 'stylesheet';
                css.href = value[title].css;
                iframe.contentWindow.document.head.appendChild(css);
            }

            icon = value[title].icon;
        })();
    }
</script>

<style>
    .container
    {
        position: absolute;
        background-color: #22222288;
        display: flex;
        flex-direction: column;
        border: 1px solid #444;
    }

    .container > iframe
    {
        border: none;
        width: 100%;
        height: calc(100% - 16px - 1px);
        background-color: #00000044;
    }
</style>

<div class="container" transition:fade="{{duration: 100}}"
    style={`left:${x}px;top:${y}px;width:${w}px;height:${h}px;`}
>
    <Titlebar 
        workspaceName = {workspaceName}
        bind:id bind:title bind:icon
        bind:x bind:y bind:w bind:h
        on:close={OnClose}
    />

    <Borders 
        workspaceName = {workspaceName}
        bind:id bind:x bind:y bind:w bind:h 
    />

    <iframe bind:this={iframe} title={title} src="extension.html" on:load={OnLoadIframe} sandbox="allow-scripts allow-same-origin"></iframe>
</div>