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
