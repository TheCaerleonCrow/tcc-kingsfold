<script>
    import { documentTitle } from '../store.js';

    import MenuBar from './menubar.svelte';
    import Button from './button.svelte';
</script>

<div class="container">
    <div class="left">
        <img class="logo" src="assets/gui/spikey_crown.png" alt=""/>
        <MenuBar />
    </div>
    <div class="center">
        <div class="title">{$documentTitle}</div>
    </div>
    <div class="right">
        <Button name="fas fa-window-minimize" icon on:click={__window.minimize} />
        <Button name="fas fa-window-restore" icon on:click={__window.maximize} />
        <Button name="fas fa-times" icon red on:click={__window.close} />
    </div>
</div>

<style>
    .container {
		-webkit-app-region: drag;
		background-color: #222;
		grid-area: 1 / 1 / 2 / 2;
        display: flex;
        justify-content: space-between;
        font-size: 0.8em;
        user-select: none;
        color: #AAA;
	}

    .left, .center, .right {
        display: flex;
    }

    .left {
        align-items: left;
    }

    .center {
        align-items: center;
    }

    .right  {
        align-items: right;
    }

    .title {
        width: auto;
    }

    .logo {
        width: 32px;
    }
</style>