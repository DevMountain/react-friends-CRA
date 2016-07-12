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

Provided in `components.png` is an image breaking down the individual components of our application.

* Red - The wrapper component of our entire application
* Green - This component contains the friends list and search fields
* Yellow - Each individual friend will also be a component

We'll start in `index.js`, remember to check Webpack in your terminal for errors regularly!

* Start by importing React and ReactDOM, we'll need these to render our application into the DOM.
* Using ReactDOM's `render` method, render an `<h1>Hello from index.js!</h1>` onto the div with the id of `react-node`
    * Note that it is good practice to wrap this in a `document.addEventListener( "DOMContentLoaded", () => { //...` to ensure the application doesn't try to mount before the HTML document is ready.
* Import `styles.css` ( no need to save it to a variable ) so that Webpack will handle our styles as well.
    
**Checkpoint:** You should now be able to navigate to http://localhost:8080 and see a header with the text "Hello from index.js!". Your code should look something like this:

``` jsx
// index.js
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css"

document.addEventListener( "DOMContentLoaded", () => {
	const reactNode = document.getElementById( "react-node" );
    
    if ( reactNode ) {
        ReactDOM.render(
            <h1>Hello from index.js!</h1>
            , reactNode )
    }
} );
```

Now that we are set up and rendering, we can start building our first component. Create a new file inside of the `components/` directory named `App.js` and open it up. This will be the root component of our application.

* Start by importing React ( we won't need ReactDOM here! )
* Next create a new class named `App` that inherits from `React.Component`.
* Create a `render` method on `App` that returns the following JSX:

``` jsx
<div>
    <h1>The <strong>facebook</strong> Friend Machine</h1>
    
    <div className="friends">
    
    </div>
</div>
```

* At the bottom of the page export `App` as the default export.
* Import `App` to `index.js` and replace our current `<h1>` with the App component.

**Checkpoint:** Your browser should now be displaying a styled header of "The **facebook** Friend Machine". The code should look something like this:

``` jsx
// index.js
 // ...
	if ( reactNode ) {
		ReactDOM.render(
			<App />
			, reactNode )
	}
} );
```

``` jsx
// App.js
import React from "react";

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>The <strong>facebook</strong> Friend Machine</h1>

				<div className="friends">

				</div>
			</div>
		);
	}
}

export default App;

```

___

With our header displaying and our app component ready for some child components, we can start building the next component: `FriendsList.js`

* Start by setting up `FriendsList.js` the same as `App` was; an exported class inheriting from `React.Component` with a `render` method that returns the following JSX:

```
<div>
	<form className="form-inline searchForm" role="form">
		<div className="form-group">

			<input className="form-control" placeholder="Search Anything About Your Friends" />

            <select className="input-medium">
                <option>Name</option>
                <option>#Friends</option>
            </select>

            <select className="input-medium">
                <option>Descending</option>
                <option>Ascending</option>
            </select>

		</div>
	</form>

	<ul>
	</ul>
</div>
```

* This component will need internal state, which means it needs a `constructor`.
* The component's state should have three properties:
    * `searchText` - Initially an empty string
    * `orderBy` - Initially the string `"name"`
    * `ascending` - Initially the boolean `true`
* Assign the above sections of the component's state to the appropriate input and select fields.
* Add appropriate values to each option.

Your `FriendsList` class should now look something like this:

``` jsx
import React from "react";

class FriendsList extends React.Component {
	constructor() {
		this.state = {
			  searchText: ""
			, orderBy: "name"
			, ascending: true
		};
	}

	render() {
		return (
			<div>
				<form
				    className="form-inline searchForm"
				    role="form"
                >
					<div className="form-group">

						<input
							className="form-control"
							placeholder="Search Anything About Your Friends"
							value={ this.state.searchText }
						/>

						<select
							className="input-medium"
							value={ this.state.orderBy }
						>
							<option value="name">Name</option>
							<option value="friend_count">#Friends</option>
						</select>

						<select
							className="input-medium"
							value={ this.state.ascending }
						>
							<option value={ false }>Descending</option>
							<option value={ true }>Ascending</option>
						</select>

					</div>
				</form>

				<ul>
				</ul>
			</div>
		);
	}
}

export default FriendsList;

```
