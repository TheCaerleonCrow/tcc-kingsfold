import { writable, readable } from "svelte/store";

function _Panels()
{
    let value = [];
    const store = writable(value);
    let counter = 0;

    function update(fn)
    {
        store.update(v => value = fn(v));
    }

    return {
        set: v => store.set(value = v),
        subscribe: store.subscribe,

        add: (x, y, w, h, iframe, title) => 
            update(p => [...p, {id:++counter, x, y, w, h, iframe, title}]),

        remove: (id) => 
            update(p => p.filter(e => e.id != id)),

        captureMouse: () =>
            update(p => 
            {
                p.forEach((e,i) => p[i].iframe.style.pointerEvents = 'none')
                return p;
            }),
        
        freeMouse: () =>
            update(p => 
            {
                p.forEach((e,i) => p[i].iframe.style.pointerEvents = 'auto')
                return p;
            }),

        getAll: () => value,

        getPanel: (id) =>
        {
            return value.filter(e => e.id == id)[0];
        },
    };
}

export const Panels = _Panels();



const workspaces = {};

export const AddWorkspace = (name) => 
{
    let value = [];
    let store = writable(value);
    let counter = 0;

    const update = (f) => store.update(v => value = f(v));
    const set = (v) => store.set(value = v);
    const subscribe = store.subscribe;

    const UpdateMouseState = (state) => update(v => 
    {
        v.forEach((p,i) => v[i].iframe.style.pointerEvents = state);
        return v;
    });

    const returnValue = 
    {
        set,subscribe,
        
        Get: () => value,
        Add: (x,y,w,h,title) => update(v => [...v, {id:++counter,x,y,w,h,title,iframe:null}]),
        Remove: (i) => update(v => v.filter(p => p.id != i)),
        CaptureMouse: () => UpdateMouseState('none'),
        FreeMouse: () => UpdateMouseState('auto'),
    };

    workspaces[name] = returnValue;
    return returnValue;
};

export const RemoveWorkspace = (name) => delete workspaces[name];
export const GetWorkspace = (name) => workspaces[name];