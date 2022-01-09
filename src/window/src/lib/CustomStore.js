import { writable } from 'svelte/store';

export const Store = (initValue) =>
{
    let value = initValue;
    let store = writable(value);
    
    const set = (v) => store.set(v => value = v);
    const update = (f) => store.update(v => value = f(v));
    const subscribe = store.subscribe;
    const sub = subscribe;

    return {
        value,set,update,subscribe,sub
    };
};