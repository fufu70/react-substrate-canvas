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

#### Color

The root color of the cracks painter. The painters are the lines that follow the movement and growth of the cracks

```javascript
const App = () => {
  ...
  return (
    <SubstrateCanvas
      color="#e58017" />
  );
  ...
};
```

#### Crack Count

How many cracks are suppose to be running on the canvas at one time. The more cracks there are on the board at one time the fast the board "crystilizes".

```javascript
const App = () => {
  ...
  return (
    <SubstrateCanvas
      crackCount={300} />
  );
  ...
};
```

#### Maximum Cracks

The total amount of cracks that will spawn on the canvas. Cracks only have a small lifespan, they exist until they collide with the side of the canvas or another crack.

```javascript
const App = () => {
  ...
  return (
    <SubstrateCanvas
      maxCracks={10000} />
  );
  ...
};
```

#### Initial Cracks

The initial amount of cracks that are suppose to spawn into the canvas, we need an inital amount of crack to seed the rest of the crack on the canvas.

```javascript
const App = () => {
  ...
  return (
    <SubstrateCanvas
      initialCracks={30} />
  );
  ...
};
```