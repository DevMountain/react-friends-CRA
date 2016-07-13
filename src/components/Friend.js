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
