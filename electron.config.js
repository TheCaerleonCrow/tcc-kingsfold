exports.default = {
    appId: "TheCaerleonCrow.Kingsfold",
    productName: "Kingsfold",
    asar: false,

    directories: 
    {
        buildResources : "resources",
    },

    files: 
    [
        "**/*",
        "!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}",
        "!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}",
        "!**/node_modules/*.d.ts",
        "!**/node_modules/.bin",
        "!**/*.{iml,o,hprof,orig,pyc,pyo,rbc,swp,csproj,sln,xproj}",
        "!.editorconfig",
        "!**/._*",
        "!**/{.DS_Store,.git,.hg,.svn,CVS,RCS,SCCS,.gitignore,.gitattributes}",
        "!**/{__pycache__,thumbs.db,.flowconfig,.idea,.vs,.nyc_output}",
        "!**/{appveyor.yml,.travis.yml,circle.yml}",
        "!**/{npm-debug.log,yarn.lock,.yarn-integrity,.yarn-metadata.json}",
        "!*.md",
        "!package.json",
        "!sniffer.exe",
        "!logs",
        "!extensions",
        "!src/renderer/src",
        "!.vscode",
        "!*.config.js",
    ],

    extraFiles: 
    [
        "sniffer.exe",
        "extensions/*/build/**",
        "extensions/*/extension.json",
    ],

    win: 
    {
        target: 
        [
            {
                target: "nsis",
                arch: "x64",
            },
        ],
    },

    linux:
    {
        target:
        [
            {
                target: "tar.gz",
                arch: "x64",
            },
        ],
    },

    nsis: 
    {
        artifactName: "${productName}Setup.${ext}",
        oneClick: false,
        allowToChangeInstallationDirectory: true,
    },
};