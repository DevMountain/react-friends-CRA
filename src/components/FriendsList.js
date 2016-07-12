import React from "react";

import friends from "../../friends";

import Friend from "./Friend";

class FriendsList extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			  searchText: ""
			, orderBy: "name"
			, ascending: true
		};
	}

	handleChange( field, event ) {
		this.setState( { [ field ]: event.target.value } );
	}

	render() {
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

		const displayFriends = this.state.ascending ? friendsList : friendsList.slice().reverse();
		console.log( this.state.ascending, [ 1, 2, 3 ].reverse() );

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
							placeholder="Search Anything About Your Friends"
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
							onChange={ this.handleChange.bind( this, "ascending" ) }
							value={ this.state.ascending }
						>
							<option value={ false }>Descending</option>
							<option value={ true }>Ascending</option>
						</select>

					</div>
				</form>

				<ul>
					{ displayFriends }
				</ul>
			</div>
		);
	}
}

export default FriendsList;
