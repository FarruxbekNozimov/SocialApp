import React from "react";

export default function Online(User) {
	return (
		<li className="rightbarFriend">
			<div className="rightbarProfileImgContainer">
				<img className="rightbarProfileImg" src="/assets/person/3.png" alt="" />
				<span className="rightbarOnline"></span>
			</div>
			<span className="rightbarUsername">John Carter</span>
		</li>
	);
}
