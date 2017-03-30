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
