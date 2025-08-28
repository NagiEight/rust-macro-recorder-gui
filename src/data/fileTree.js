// data/fileTree.js
// A simple data structure to represent the file system.
// Exported as a constant to be used in other modules.
export const fileTree = {
  "my-vscode-app": {
    public: {
      "index.html": "<html>...</html>",
    },
    src: {
      components: {
        "Editor.jsx": `// Editor.jsx content...`,
        "Sidebar.jsx": `// Sidebar.jsx content...`,
      },
      "App.jsx": `// App.jsx content...`,
      "index.css": "/* Your CSS here */",
    },
    "package.json": '{ "name": "my-vscode-app", ... }',
    "README.md": "# My VS Code UI App",
  },
};
