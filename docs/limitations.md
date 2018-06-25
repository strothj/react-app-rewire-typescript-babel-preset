# Issues and Limitations

This is experimental and can be expected to break while development continues
on both Create React App 2 and Babel 7.

This project is not associated with any of the projects this makes use of.
You'll be without support from those groups if you run into issues.

!> For a stable solution, I recommend [react-scripts-ts](https://github.com/wmonk/create-react-app-typescript).

For some background into the topic of using Babel to remove TypeScript type annotations, I recommend reading some of the following:

- http://artsy.github.io/blog/2017/11/27/Babel-7-and-TypeScript/
- https://babeljs.io/blog/2017/09/12/planning-for-7.0

The preset `@babel/preset-typescript` is not included in this package at this time. Once react-scripts v2 and Babel 7 officially release, this choice will be revisited. What this means is that you can expect to see missing peer dependency warnings for @babel/core.
