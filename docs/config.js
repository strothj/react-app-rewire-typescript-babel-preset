window.$docsify = {
  name: "react-app-rewire-typescript-babel-preset",
  repo: "strothj/react-app-rewire-typescript-babel-preset",
  loadSidebar: "docs/_sidebar.md",
  subMaxLevel: 2,
  plugins: [
    EditOnGithubPlugin.create(
      "https://github.com/strothj/react-app-rewire-typescript-babel-preset/tree/master/"
    )
  ],
  alias: {
    "/.*/_sidebar.md": "/docs/_sidebar.md"
  }
};
