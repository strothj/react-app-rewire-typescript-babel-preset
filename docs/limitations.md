# Issues and Limitations

This is experimental and can be expected to break while development continues
on both Create React App 2 and Babel 7.

?> It is recommended that the `isolatedModules` option is used so that TypeScript can call out constructs which currently give Babel trouble. Things, like re-exporting interfaces, can lead to Webpack compiler errors.  
See:  
https://github.com/strothj/react-app-rewire-typescript-babel-preset/issues/15
https://blogs.msdn.microsoft.com/typescript/2018/08/27/typescript-and-babel-7/

This project is not associated with any of the projects this makes use of.
You'll be without support from those groups if you run into issues.

!> For a stable solution, I recommend [react-scripts-ts](https://github.com/wmonk/create-react-app-typescript).

For some background into the topic of using Babel to remove TypeScript type annotations, I recommend reading some of the following:

- https://blogs.msdn.microsoft.com/typescript/2018/08/27/typescript-and-babel-7/
- http://artsy.github.io/blog/2017/11/27/Babel-7-and-TypeScript/
- https://babeljs.io/blog/2017/09/12/planning-for-7.0
- https://iamturns.com/typescript-babel/

The preset `@babel/preset-typescript` is not included in this package at this time. Once react-scripts v2 and Babel 7 officially release, this choice will be revisited. What this means is that you can expect to see missing peer dependency warnings for @babel/core.
