<script>

    import { documentTitle } from './store.js';

</script>

<style>
    .container
	{
		-webkit-app-region: drag;
		background-color: #222;
		grid-area: 1 / 1 / 2 / 2;
        display: flex;
        justify-content: space-between;
        font-size: 0.8em;
        user-select: none;
	}

    .left, .center, .right 
    {
        display: flex;
    }

    .left 
    {
        align-items: left;
    }

    .center
    {
        align-items: center;
    }

    .right 
    {
        align-items: right;
    }

    .button 
    {
        -webkit-app-region: no-drag;

        padding-left: 12px;
        padding-right: 12px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .right .button 
    {
        width: 24px;
    }

    .title 
    {
        width: auto;
    }

    .logo
    {
        width: 32px;
    }

    .button:hover
    {
        background-color: #444;
    }

    .button.button-close:hover
    {
        background-color: red;
    }
</style>

<div class="container">
    <dev class="left">
        <img class="logo" src="assets/gui/spikey_crown.png" alt=""/>
        <div class="button">File</div>
        <div class="button">Help</div>
    </dev>
    <div class="center">
        <div class="title">{$documentTitle}</div>
    </div>
    <div class="right">
        <div class="button" on:click={_ => __window.minimize()}><i class="fas fa-window-minimize"></i></div>
        <div class="button" on:click={_ => __window.maximize()}><i class="fas fa-window-restore"></i></div>
        <div class="button button-close" on:click={_ => __window.close()}><i class="fas fa-times"></i></div>
    </div>
</div>