<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# React Friends

**Project Summary**

<img src="https://raw.githubusercontent.com/DevMountain/react-friends-CRA/master/solution.PNG" />

In this project we'll be creating a faux social network in React. Covering the basics of create-react-app, React, components, and interactivity.

### Step 1: Dependencies, file structure, and building.

**Summary**

The first step will involve learning the setup of a React application from scratch with create-react-app.

**Instructions**

* Clone this repo
* `cd` into the repo
* Run `create-react-app friends`

**Detailed Instructions**

Get started by cloning this repo and `cd`'ing to it in your terminal. Run `npm install -g create-react-app` to install create-react-app globally (meaning you can run it from anywhere in your terminal). Run `create-react-app friends` to scaffold out the application. Once the command has finished running, `cd` into `friends` and run `npm start` to start the application. You should now be seeing a boilerplate React app running in your browser!

Let's take a look at our basic react app:

```
- node_modules // create-react-app installed a bunch of dependencies for us
- package.json // A file npm uses to keep track of our application and its dependencies
- public
  \
   - index.html // This is the html file that our react app will render to
   - favicon.ico // The icon that displays in the browser tab when the page is open
- src
  \
   - App.css
   - App.js // This is where our first React component lives
   - App.test.js // This is a test file that we'll ignore for now
   - index.js // This is where our react app is initially rendered, commonly known as the "entry point" of the application
   - index.css
   - logo.svg
```

`create-react-app` has given us the basic "boilerplate" of our app. Now we can start working in this directory.

### Step 2: Components

Here's a breakdown of what our app's component structure will look like:

<img src="https://raw.githubusercontent.com/DevMountain/react-friends-CRA/master/components.png" />

* Red - The wrapper component of our entire application
* Green - This component contains the friends list and search fields
* Yellow - Each individual friend will also be a component

**Summary**

In this step we'll clean up the boilerplate a bit, update our `App` component, and create the first child component.

**Detailed instructions**

First let's remove some stuff. Whenever you use `create-react-app`, you'll want to remove the boilerplate
code that you don't need.

* Delete the following files:
  * `src/App.test.js`
  * `src/logo.svg`
* in `src/App.js`, remove the line `import logo from './logo.svg';`
* Replace everything in `src/index.css` with the following CSS:

<details>

<summary><code>index.css</code></summary>

```css
@import url('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');

body, html, h1, h2, h3, h4, h5, h6, ul{
    padding: 0;
    margin: 0;
    font-family: 'lucida grande',tahoma,verdana,arial,sans-serif;
}

h1{
    text-align: center;
    padding: 20px 0;
    margin-bottom: 20px;
    background-color: #3b5998;
    color: white;
}

h1 strong {
    letter-spacing: -1px;
}

input, select, form, ul {
    margin-top: 10px;
}

.searchForm{
    width: 500px;
    margin:auto;
    text-align: center;
}

.form-group .form-control {
    display: block;
}

select {
    width: 45%;
}

select:nth-of-type(1) {
    float: left;
}

select:nth-of-type(2) {
    float: right;
}

.friends ul{
    width: 500px;
    margin: auto;
    margin-top: 10px;
}
.friends li {
    font-size: 14px;
}
.friends li div{
    margin-bottom: 7px;
}

.profile-pic {
    float: left;
    padding-right: 13px;
    max-height: 50px;
}

.friend{
    text-align: left;
    border: 1px solid #ccc;
    padding: 15px;
    margin: 2px 0;
}

.friend h3 {
    font-weight: 500;
}

ul{
    list-style-type: none;
}

.location {
    color: #999;
    font-size: 11px;
    font-weight: bold;
}
.status {
    margin-top:12px;
    clear: both;
}
.num-friends {
    color: #3b5998;
    font-size: 12px;
    font-weight: bold
}
.hashtag {
    font-weight: bold
}
```

</details>

Now that we have removed unnecessary code and added our own CSS, we can start building our first component. Open `src/App.js` and replace **all** the existing JSX in `render` with this code:

``` jsx
<div>
    <h1>The <strong>facebook</strong> Friend Machine</h1>
    
    <div className="friends">
    
    </div>
</div>
```

**Checkpoint:** Your browser should now be displaying a styled header of "The **facebook** Friend Machine".

With our header displaying and our app component ready for some child components, we can start building the next component: `FriendsList.js`. Let's create a new directory in `src` named `components` to contain our new component.

* Make a file called `FriendsList.js` inside of `src/components`.
* Set up `FriendsList.js` the same as `App`:
	* Import `React` and `Component` from React
	* Export by default a class named `FriendsList` which extends `Component`
	* Give the class a `render` method that returns the following JSX:

```
<div>
	<form className="form-inline searchForm" role="form">
		<div className="form-group">

			<input className="form-control" placeholder="Search For Friends" />

            <select className="input-medium">
                <option value="name">Name</option>
                <option value="friend_count">#Friends</option>
            </select>

            <select className="input-medium">
                <option value="descending">Descending</option>
                <option value="ascending">Ascending</option>
            </select>

		</div>
	</form>

	<ul>
	</ul>
</div>
```

This component will need internal state, which means it needs a `constructor`. The component's state should have three properties:

* `searchText` - Initially an empty string, used to search for friends.
* `orderBy` - Initially the string `"name"`, used to determine how we sort friends
* `order` - Initially the string `"ascending"`, used to set the sorting order.

Take a look at the JSX code in your `FriendsList` component. Each piece of the state corresponds to a specific input or select. Use the `value` attribute to bind the values on `state` to the appropriate `<input>` and `<select>` fields.

To test this component we'll need to import it into `App.js` and add the component inside of the div with the class of "friends". None of the updated elements will be editable. This is because we gave them a `value` attribute but didn't provide any way for that value to change. To fix this we'll need to create a new method on the `FriendsList` class named `handleChange`.

* This method should take in two parameters:
	* `field` - A string representation of the property on state we want to update
	* `event` - The DOM event that triggered the change
* When called, the method should use React's `setState` method to change the value of the correct property on state to `event.target.value`.
	* For example, `this.setState( { [ field ]: event.target.value } );`


Next we need to add `onChange` properties to our `<select>` and `<input>` elements, passing in our `handleChange` method wrapped in an arrow function. Make sure `onChange`'s `field` parameter matches the field on state that you want to change, i.e `( event ) => this.handleChange( "searchText", event )`.


**Checkpoint:** You should now be able to make changes to your search field and select boxes and have that value placed on `FriendsList`'s `state`. Your code should look something like this:

<details>

<summary><b>Code Solution</b></summary>

<details>

<summary><code>src/App.js</code></summary>

```jsx
import React, { Component } from "react";

import "./App.css";

import FriendsList from "./components/FriendsList";

class App extends Component {
	render() {
		return (
			<div>
				<h1>The <strong>facebook</strong> Friend Machine</h1>

				<div className="friends">
					<FriendsList />
				</div>
			</div>
		);
	}
}

export default App;

```

</details>

<details>

<summary><code>src/components/FriendsList.js</code></summary>

```jsx
import React, { Component } from "react";

export default class FriendsList extends Component {
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
		const {
			  searchText
			, orderBy
			, order
		} = this.state;

		return (
			<div>
				<form className="form-inline searchForm" role="form">
					<div className="form-group">

						<input
							className="form-control"
							onChange={ event => this.handleChange( "searchText", event ) }
							placeholder="Search For Friends"
							value={ searchText }
						/>

						<select
							className="input-medium"
							onChange={ event => this.handleChange( "orderBy", event ) }
							value={ orderBy }
						>
							<option value="name">Name</option>
							<option value="friend_count">#Friends</option>
						</select>

						<select
							className="input-medium"
							onChange={ event => this.handleChange( "order", event ) }
							value={ order }
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
```

</details>

</details>

### Step 3: Friend Component, repeating, filtering.

**Summary**

In this step we will be displaying, filtering, and sorting a list of friends.

**Detailed Instructions**

Create a new file named `Friend.js` in `src/components`. In `src/components/Friend.js` import `React` and `PropTypes` from React, then create and export by default a functional component named `Friend` which returns the following JSX:

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

Give the `Friend` function a `propTypes` object that looks like this:

```javascript
{
	  name: PropTypes.string.isRequired
	, picSquare: PropTypes.string.isRequired
	, status: PropTypes.string
	, currentLocation: PropTypes.object.isRequired
	, friendCount: PropTypes.number
}
```

Now we'll import Friend into `FriendsList` and render it inside of the `ul` tag near the bottom of `render`. You should now see a single friend listed! But we want to display a list of friends with their own unique data.

Move the `friends.js` file (included in this repository) into `src` so we can access it. In `src/components/FriendsList.js` import `friends` from `src/friends.js`.

`map` over `friends` at the top of the `render` method to create an array of `Friend` components, passing `friend.name`, `friend.pic_square`, `friend.status`, `friend.friend_count`, and `friend.location` to the appropriate props. Don't forget that every repeated item in React needs a unique `key`! `friend.name` would work well for now. Update the `render` method to display this new array instead of the single `Friend` component.

Now a list of friends should be displaying, but they're all showing the same data! Open up `src/components/Friend.js` and update our static data to instead look at `props` for values.

As the final touch, we need to add sorting and filtering. For this we will use plain JavaScript. Using the values we have stored on our `FriendsList` component's state and built in array methods sort, filter, and reverse the array of Friend components as expected.

**Warning:** JavaScript's built in `.sort` does not reliably sort in Chrome. Either test in another browser or find a different sorting algorithm.

<details>

<summary><b>Code Solution</b></summary>

<details>

<summary><code>src/components/Friend.js</code></summary>

```jsx
import React, { PropTypes } from "react";

export default function Friend( props ) {
	return (
		<li className='friend'>
			<img className="profile-pic" src={ props.picSquare } />

			<h3>{ props.name }</h3>

			<div className="location">
				Location: { props.currentLocation.city }, { props.currentLocation.state }, { props.currentLocation.country }
			</div>

			<div className="status">
				Status: { props.status }
			</div>

			<div className="num-friends">
				Friends: { props.friendCount }
			</div>
		</li>
	);
}

Friend.propTypes = {
	  name: PropTypes.string.isRequired
	, picSquare: PropTypes.string.isRequired
	, status: PropTypes.string
	, currentLocation: PropTypes.object.isRequired
	, friendCount: PropTypes.number
};
```

</details>

<details>

<summary><code>src/components/FriendsList.js</code></summary>

```jsx
import React, { Component } from "react";

import friends from "../friends";

import Friend from "./Friend";

export default class FriendsList extends Component {
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
		const {
			  searchText
			, orderBy
			, order
		} = this.state;

		const friendsList = friends
			.filter( friend => friend.name.toLowerCase().includes( this.state.searchText.toLowerCase() ) )
			.sort( ( a, b ) => a[ orderBy ] > b[ orderBy ] ? 1 : 0 )
			.map( friend => (
			<Friend
				name={ friend.name }
				picSquare={ friend.pic_square }
				status={ friend.status }
				friendCount={ friend.friend_count }
				currentLocation={ friend.location }
				key={ friend.name }
			/>
		) );

		return (
			<div>
				<form className="form-inline searchForm" role="form">
					<div className="form-group">

						<input
							className="form-control"
							onChange={ event => this.handleChange( "searchText", event ) }
							placeholder="Search For Friends"
							value={ searchText }
						/>

						<select
							className="input-medium"
							onChange={ event => this.handleChange( "orderBy", event ) }
							value={ orderBy }
						>
							<option value="name">Name</option>
							<option value="friend_count">#Friends</option>
						</select>

						<select
							className="input-medium"
							onChange={ event => this.handleChange( "order", event ) }
							value={ order }
						>
							<option value="descending">Descending</option>
							<option value="ascending">Ascending</option>
						</select>

					</div>
				</form>

				<ul>
					{ order === "descending" ? friendsList.reverse() : friendsList }
				</ul>
			</div>
		);
	}
}
```

</details>

</details>

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