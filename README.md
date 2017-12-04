# react-substrate-canvas

![Gif of what it looks like](assets/canvas.gif).

The method for showing cracks on a canvas created by [Jared Tarbell](http://www.complexification.net/programmer.html) on his [complexification site](http://www.complexification.net/gallery/machines/substrate/index.php)

## Installation

This is a [ReactJS](https://reactjs.org/) component available through the
[npm registry](https://www.npmjs.com/).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install react-substrate-canvas
```

## How to Use

To simply add the happy place canvas on to the page import it and include it into the container. The styling must be manually applied through your CSS environment, there is no styling added on to the page from the `react-substrate-canvas`.

```javascript
import React from 'react';
import SubstrateCanvas from 'react-substrate-canvas';

const App = () => {
  return (
    <SubstrateCanvas />
  );
};

export default App;
```