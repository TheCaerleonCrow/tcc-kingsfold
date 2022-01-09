import { writable,readable,get } from 'svelte/store';

let wsList = writable([]);
let wsCounter = 0;
let panelCounter = 0;



export const Store = wsList;
export const VisibleWorkspace = writable('');

export const AddWorkspace = (name, icon, panels=[]) => 
{
    wsList.update(v => 
    {
        // Do not add this workspace if it already exists
        for (let ws of v)
        {
            if (ws.name === name) return v;
        }

        let ps = [];
        for (let panel of panels)
        {
            ps.push({id:++panelCounter, ...panel});
        }

        v.push({
            id: ++wsCounter,
            visible: false,
            name,
            icon,
            panels: writable(ps),
        });

        return v;
    });

    SaveWorkspace(name);
};

export const AddPanel = (name, panel) => 
{
    wsList.update(x => 
    {
        for (let ws of x)
        {
            if (ws.name !== name) continue;
            
            ws.panels.update(y => 
            {
                y.push({id:++panelCounter, ...panel});
                return y;
            });
        }

        return x;
    });

    SaveWorkspace(name);
};

export const RemovePanel = (name, id) => 
{
    wsList.update(x => 
    {
        for (let ws of x) 
        {
            if (ws.name !== name) continue;

            ws.panels.update(y => 
            {
                for (let i = 0; i < y.length; i++) 
                {
                    if (y[i].id !== id) continue;

                    y.splice(i, 1);
                    return y;
                }
            });
        }

        return x;
    });

    SaveWorkspace(name);
};

export const GetWorkspace = (name) =>
{
    let $ws;

    wsList.subscribe(x => 
    {
        // If no name was given, return the entire list
        if (name == null) return $ws = x;

        // If a name was given, search the list for the name
        for (let ws of x)
        {
            if (ws.name !== name) continue;
            return $ws = ws;
        }
    })();

    return $ws;
};

export const GetPanels = (name) =>
{
    let $panels;

    wsList.subscribe(x =>
    {
        for (let ws of x)
        {
            if (ws.name !== name) continue;
            
            ws.panels.subscribe(y =>
            {
                $panels = y;
            })();

            return;
        }
    })();

    return $panels;
};

export const GetPanelsStore = (name) =>
{
    let $store;

    wsList.subscribe(x =>
    {
        for (let ws of x)
        {
            if (ws.name !== name) continue;
            
            $store = ws.panels;
            return;
        }
    })();

    return $store;
};

export const SetMouseState = (name, state) => 
{
    wsList.update(x =>
    {
        for (let ws of x)
        {
            if (ws.name !== name) continue;

            ws.panels.update(y =>
            {
                for (let panel of y)
                {
                    panel.iframe.style.pointerEvents = state;
                }
                
                return y;
            });

            return x;
        }

        return x;
    });
};

export const SaveWorkspace = (name) => 
{
    let ws = GetWorkspace(name);
    let ps = GetPanels(name);

    __window.SaveWorkspace(name, ws.icon, ps);
};

export const ShowWorkspace = (name) =>
{
    wsList.update(x =>
    {
        for (let ws of x) ws.visible = ws.name === name;
        VisibleWorkspace.set(name);
        return x;
    });
};

export const LoadWorkspaces = (fn) =>
{
    __window.LoadWorkspaces(data =>
    {
        for (let ws of Object.values(data))
        {
            AddWorkspace(ws.name, ws.icon, ws.panels);
        }

        fn();
    });
};
