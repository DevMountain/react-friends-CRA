## React Friends

### Objectives
Learn the basics of React and see how its implementation compares to Angular.

___

### Step 1: Dependencies, file structure, and building.

Get started by cloning this repo.

We'll use `create-react-app` to make our app.

1. **`npm install -g create-react-app`**

2. Then run the command `create-react-app friends` inside of your cloned repo.

3. This will make a react app in the directory friends. `cd friends` to enter that directory.

4. Run `npm start`, and you should see your basic react app spring up in the browser.

**Let's take a look at our basic react app**

```
- node_modules // create-react-app installed a bunch of dependencies for us
- public
  \
   - index.html // This is the html file that our react app will use
- src
  \
   - App.css
   - App.js // This is where our react code begins
   - App.test.js // This is a test file we can ignore
   - Index.js // This is where our react app is initially renderd
   - Index.css
```

`create-react-app` has given us the basic "boilerplate" of our app. Now we can start working in this directory.

**Checkpoint:** You should be able to see your "boilerplate" react app in your browser.**
___

### Step 2: Components

Provided in `components.png` is an image breaking down the individual components of our application.

* Red - The wrapper component of our entire application
* Green - This component contains the friends list and search fields
* Yellow - Each individual friend will also be a component

First let's remove some stuff. Whenever you use `create-react-app`, you'll want to remove the boilerplate
code they add that you don't need.

* Delete the following files:
  * `src/App.test.js`
  * `src/logo.svg`
* in `App.js`, remove the line `import logo from './logo.svg';`

Now that we have removed unnecessary code, we can start building our first component. 
Open `App.js`.


* Inside the render method, replace **all** the existing JSX with this code:

``` jsx
<div>
    <h1>The <strong>facebook</strong> Friend Machine</h1>
    
    <div className="friends">
    
    </div>
</div>
```

**Checkpoint:** Your browser should now be displaying a styled header of "The **facebook** Friend Machine". The code should look something like this:

``` jsx
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

```

``` jsx
// App.js
import React, { Component } from 'react';
import './App.css';

class App extends Component {
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

* Let's keep all our next components inside of a directory in `src` called `components`.
* Make a file called `FriendsList.js` inside of `components`.
* Set up `FriendsList.js` the same as `App` was; an exported class inheriting from `React.Component` 
  with a `render` method that returns the following JSX:

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
    * `searchText` - Initially an empty string, used to search for friends.
    * `orderBy` - Initially the string `"name"`, used to set what we sort our friends by
    * `order` - Initially the string `"ascending"`, used to set the sorting order.
* Look at the HTML code in your `FriendsList` component. Each piece of the state corresponds to
  a specific input or select. Use the `value` attribute to bind the value from that piece of state
  to that part of the HTML, like so:
  ```
  <input
    value={this.state.foo}
  />
  ```
* Each option inside of a select needs to be bound to a value. Looking at the values in `friends.js`,
  bind a property from each friend to a specific option. For example:
  ```
  <select>
    <option value="name">Name</option>
  </select>
  ```
  This will create a drop down selector with a single option of Name, bound to the name value.

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

To test this component we'll need to import it into `App.js` and add the component inside of the div with the class of "friends". 
None of our values will be editable. This is because they are bound to values on this components state, which can only be changed with `this.setState`
Let's fix this so we can change theses values.

* Begin by creating a new method on the `FriendsList` class named `handleChange`.
	* This method should take in two parameters, `field` and `event`.
	* When called, the method should use React's `setState` method to change the value of the correct property on state to `event.target.value`.
  * If the field is `"searchText"`, then setState should change `"searchText"` to `event.target.value`.
* Next we need to add `onChange` properties to our select and input elements, passing in our `handleChange` method.
	* Don't forget to use `bind` to preserve the context of `this`!
  * Remember that you can use `bind` to preset an argument for a function. 
    Use that to set the value of `field`for each `onChange` event handler.
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
* First we need our data.
  * Move `friends.js` into this directory.
  * import `friends.js` into `FriendList.js` and save it to a variable named `friends`.
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
