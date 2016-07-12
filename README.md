## React Friends

### Objectives
Learn the basics of React and see how its implementation compares to Angular.

___

### Step 1: Dependencies, file structure, and building.

Get started by cloning this repo and familiarizing yourself with the file structure.

```
react-friends/
-- dist/ /* this folder will contain all of the code we want available in the browser. */
---- index.html

-- src/ /* this folder will contain all of our pre-production code (code that hasn't yet been run through a build system). The majority of our work will happen here */
---- components/ /* React follows a component based architecture, this is the folder where we will be storing all of our components */
---- index.js /* This is the entry point of our application; the file to which everything will be connected */
---- styles.css

-- .babelrc /* We are using Babel alongside Webpack to compile our JSX/ES2015 into something browser-readable. This is where Babel is configured. */
-- webpack.config.js /* Webpack is the de facto build tool for React. A pre-built config has been provided but I highly recommend familiarizing yourself with it.
```

We'll start by using npm to install all of the dependencies necessary for our project. Don't forget to `npm init` before trying to install!

**Dev-Dependencies** ( `npm i --save-dev` )

* `webpack`
    * The module bundler we will be using as a build tool for this project.
    * If you haven't already, you will also want to install this globally ( `npm i webpack -g` )
* `webpack-dev-server`
    * A tool built for Webpack to allow live page reloads whenever a change is made.
    * If you haven't already, you will also want to install this globally ( `npm i webpack-dev-server -g` )
* `babel-core`
    * The core of Babel's parser
* `babel-preset-es2015`
    * A Babel preset allowing us to compile ES2015 to ES5
* `babel-preset-react`
    * A Babel preset allowing us to parse JSX
* `babel-loader`
    * Babel's Webpack plugin
* `style-loader`
* `css-loader`
    * These allow Webpack to handle our CSS as well as our JS
    
**Standard Dependencies** ( `npm i --save` )

* `react`
    * The core React library
* `react-dom`
    * The entry point of working with the DOM in React
    
**Checkpoint:** You should now be able to run `webpack-dev-server -d` and navigate a browser window to http://localhost:8080.

___

### Step 2: Components

Provided is an image breaking down the individual components of our application.

* Red - The wrapper component of our entire application
* Green - This component contains the friends list and search fields
* Yellow - Each individual friend will also be a component

![alt text](https://raw.githubusercontent.com/DevMountain/react-friends/solution/components.png, "Preview Image")