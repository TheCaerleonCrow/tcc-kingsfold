import App from './svelte/main.svelte';
import Assets from './assets.json';

window.Assets = Assets;

export default new App({
	target: document.body,
});