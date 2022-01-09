
### Extensions
Extensions are small webpages built using svelte.
You may build your extension using any other web technologies, if you can get them working.
The system is built with svelte in mind, so that is all I will be officially supporting.

Extensions should also be small, with a specific task.
For example, there should not be 1 big extension for monitoring combat, dps, healing, damage taken, fame gathered, etc.
There should be an extension that tracks DPS, another one that tracks healing, another one that tracks damage taken, and so on.
This allows the extensions to be modular, and helps fit each responsibility to 1 panel.

### Extension Config
Inside the extension's package.json file, you must setup the extension details under "extension". 

"name"          
    This is the name that will be displayed in the client.

"author"
    Who created this extension?
    This will be viewed when the user hovers over the extension list.

"description"
    Give a quick 1 sentence description.
    This will be viewed when the user hovers over the extension list.

"version"
    The version of the extension.
    This will be viewed when the user hovers over the extension list.

"category"      
    A series of sub-sections that this extension will listed under. 
    Use `/` followed by the category name, these can be chained similar to folder paths.
    example: /Crafting/Cooking
    No category will just list the extension at the bottom of the list.
    Use this so users can find your extension with the most ease.

"background"
    If true, the extension will run in the background with no panel.
    The extension still must be enabled per workspace, and can be disabled.
    This is useful for things that obviously don't need a user interface.
    ex. A special API.

"main"
    A path to the main entry script. 
    Since we use svelte, this will be the bundled js file.

"css"
    A path to the extension's main css file.
    Since we use svelte, this will be the bundled css file.

"icon"
    The image that will be displayed next to the extension name.
    You can choose an image from the client's asset path.
    Later on, we will add support to choose an image from your own assets.