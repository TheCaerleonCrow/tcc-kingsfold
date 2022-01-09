import { writable } from 'svelte/store';

export const workspaceWidth = writable(0);
export const workspaceHeight = writable(0);

export const documentTitle = writable(document.title);
documentTitle.subscribe(value =>
{
    document.title = value;
});

export const Extensions = writable({});
__window.getExtensions((data) =>
{
    Extensions.set(data);
});

export const Workspaces = writable({});
__window.getWorkspaces((data) =>
{
    Workspaces.set(data);
});