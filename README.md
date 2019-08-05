# This - SCSS Framework
The framework is a flat simple toolbox to make frontend programming easier. All components are optional. Only the core component is always required.


#### Requirements
- NodeSASS 4
- [NodeJS](https://nodejs.org/en/)
- Task Manager like [Gulp](https://gulpjs.com/), [Grunt](https://gruntjs.com/) or [Webpack](https://webpack.js.org/)

#### Install

Install via node

```bash
npm install @this/scss-framework --save-dev
```

#### Using

Include in your scss with:

```bash
@import '../node_modules/@this/scss-framework/import';
```

if you need an < IE10 Version use the compatible mode:

```bash
@import '../node_modules/@this/scss-framework/import-compatible';
```

The differences are:
- Using a floating block system instead of CSS grid as grid.



#### Documentation

You can simply generate a dokumentation of the framework. The complete Framework includes comments for [SassDoc](http://sassdoc.com/). Install SassDoc globally and execute the following command in the Framework folder via terminal:

```bash
sassdoc ./
```
