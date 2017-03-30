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