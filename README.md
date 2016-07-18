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

			<input className="form-control" placeholder="Search For Friends" />

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
    * `order` - Initially the string `"ascending"`
* Assign the above sections of the component's state to the appropriate input and select fields.
* Add appropriate values to each option.

Your `FriendsList` class should now look something like this:

``` jsx
import React from "react";

class FriendsList extends React.Component {
	constructor( props ) {
	    super( props );
	    
		this.state = {
			  searchText: ""
			, orderBy: "name"
			, order: "ascending"
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
							placeholder="Search Anything For Friends"
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
							value={ this.state.order }
						>
							<option value="descending">Descending</option>
							<option value="ascending">Ascending</option>
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

To test this component we'll need to import it into `App.js` and add the component inside of the div with the class of "friends". Because we haven't yet added an `onChange` handler none of these values are editable, so let's fix that!

* Begin by creating a new method on the `FriendsList` class named `handleChange`.
	* This method should take in two parameters, `field` and `event`.
	* When called, the method should use React's `setState` method to change the value of the correct property on state to `event.target.value`.
* Next we need to add `onChange` properties to our select and input elements, passing in our `handleChange` method.
	* Don't forget to use `bind` to preserve the context of `this`!
	* Make sure `onChange`'s `field` parameter matches the field on state that you want to change.


**Checkpoint:** You should now be able to make changes to your search field and select boxes and have that value placed on `FriendsList`'s `state`. Your code should look something like this:

``` jsx
import React from "react";

class FriendsList extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			  searchText: ""
			, orderBy: "name"
			, order: "ascending"
		};
	}

	handleChange( field, event ) {
		this.setState( { [ field ]: event.target.value } );
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
							onChange={ this.handleChange.bind( this, "searchText" ) }
							placeholder="Search For Friends"
							value={ this.state.searchText }
						/>

						<select
							className="input-medium"
							onChange={ this.handleChange.bind( this, "orderBy" ) }
							value={ this.state.orderBy }
						>
							<option value="name">Name</option>
							<option value="friend_count">#Friends</option>
						</select>

						<select
							className="input-medium"
							onChange={ this.handleChange.bind( this, "order" ) }
							value={ this.state.order }
						>
							<option value={ "descending" }>Descending</option>
							<option value={ "ascending" }>Ascending</option>
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

___

### Step 3: Friend Component, repeating, filtering.

Create a new file named `Friend.js` and follow the usual steps for creating a class with a render method that returns the following JSX:

``` jsx
<li className='friend'>
	<img className="profile-pic" src='http://placebear.com/50/50.jpg' />

		<h3>Cali Fornia</h3>

		<div className="location">
			Location: New Port Beach, California, United States
		</div>

		<div className="status">
			Status: I hate the snow. I wish I was on the beach right now!!! <span className="hashtag">#ihateprovo</span>
		</div>

		<div className="num-friends">
			Friends: 1,367
		</div>
</li>
```

* Import `Friend` into `FriendsList` and place it inside the `ul` tag at the bottom.
	* You should now see a single friend listed, but we want to display our whole list!
* First we need our data, import `friends.js` into `FriendList.js` and save it to a variable named `friends`.
* At the top of the render method `map` over the array of friends to create an array of `Friend` components, passing in `friend.name`, `friend.pic_square`, `friend.status`, `friend.friend_count`, and `friend.current_location` as props.
	* Don't forget that every repeated item in React needs a unique `key`. `friend.$$hashKey` would work well for this.
	* Be careful of null values!
* Adjust `Friend.js` to use `this.props` instead of the static data we included in our original JSX.
	
**Checkpoint:** You should now be displaying a large list of friends. Your code should look something like this:

``` jsx
// FriendsList.js
import React from "react";

import friends from "../../friends";

import Friend from "./Friend";

class FriendsList extends React.Component {

// ...
    render() {
		const friendsList = friends.map( friend => (
			<Friend
				currentLocation={ friend.current_location || {} }
				friendCount={ friend.friend_count }
				key={ friend.$$hashKey }
				name={ friend.name }
				pictureUrl={ friend.pic_square }
				status={ friend.status ? friend.status.message : "" }
			/>
		) );
        
        return (
            // ...
            <ul>
                { friendsList }
            </ul>
        );
    }
    // ...
```

``` jsx
// Friend.js
import React from "react";

class Friend extends React.Component {
	render() {
		return (
			<li className='friend'>
				<img className="profile-pic" src={ this.props.pictureUrl } />

					<h3>{ this.props.name }</h3>

					<div className="location">
						Location: { this.props.currentLocation.city }, { this.props.currentLocation.state }, { this.props.currentLocation.country }
					</div>

					<div className="status">
						{ this.props.status }
					</div>

					<div className="num-friends">
						{ this.props.friendCount }
					</div>
			</li>
		);
	}
}

export default Friend;
```

As the final touch, we need to add sorting and filtering. For this we will use plain JavaScript.

* Using the values we have stored on our FriendList component's state and built in array methods sort, filter, and reverse the array of Friend components as expected.
    * **Warning:** JavaScript's built in `.sort` does not reliably sort in Chrome. Either test in another browser or find a different sorting algorithm.
    * Your code should look something like this:
    
``` jsx
// FriendsList.js

// ...
const friendsList = friends
	.filter( friend => friend.name.toLowerCase().indexOf( this.state.searchText.toLowerCase() ) !== -1 )
	.sort( ( a, b ) => a[ this.state.orderBy ] > b[ this.state.orderBy ] )
	.map( friend => (
		<Friend
			currentLocation={ friend.current_location || {} }
			friendCount={ friend.friend_count }
			key={ friend.$$hashKey }
			name={ friend.name }
			pictureUrl={ friend.pic_square }
			status={ friend.status ? friend.status.message : "" }
		/>
	) );

const displayFriends = this.state.order === "ascending" ? friendsList : friendsList.slice().reverse();

// ...
```

___

### Black Diamonds:

* Currently we are only searching by name. Create a select that allows users to choose what to search by.
* Update the UI so that Friend components without location data do not display two empty commas.


## Contributions

### Contributions

#### 
 
If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

### Copyright

#### 

© DevMountain LLC, 2016. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
