import "./rightbar.css";
import Online from "../online/Online";
import { Users } from "../../dummyData";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({ user }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [friends, setFriends] = useState([]);
	const [followers, setFollowers] = useState([]);
	const { user: currentUser, dispatch } = useContext(AuthContext);
	const [followed, setFollowed] = useState(
		currentUser.followings.includes(user?._id)
	);

	console.log(
		currentUser.followings,
		currentUser.followings.includes(user?._id),
		user?._id,
		followed
	);

	useEffect(() => {
		const getFriends = async () => {
			try {
				const friendList = await axios.get("/users/friends/" + user._id);
				const followerList = await axios.get("/users/followers/" + user._id);
				setFriends(friendList.data);
				setFollowers(followerList.data);
			} catch (err) {
				console.log(err);
			}
		};
		getFriends();
	}, [user]);

	const handleClick = async () => {
		try {
			if (followed) {
				await axios.put(`/users/${user._id}/unfollow`, {
					userId: currentUser._id,
				});
				dispatch({ type: "UNFOLLOW", payload: user._id });
			} else {
				await axios.put(`/users/${user._id}/follow`, {
					userId: currentUser._id,
				});
				console.log(user.followers, user.followings, currentUser._id);
				if (
					user.followers.includes(currentUser._id) &&
					user.followings.includes(currentUser._id)
				) {
					let result = await axios.post("/conversations", {
						senderId: currentUser._id,
						receiverId: user._id,
					});
					console.log(result);
				}
				dispatch({ type: "FOLLOW", payload: user._id });
			}
			console.log(followed);
			setFollowed(!followed);
			console.log(followed);
		} catch (err) {
			console.log(err);
		}
	};
	console.log(friends, followers);
	const HomeRightbar = () => {
		return (
			<div>
				<div className="birthdayContainer">
					<h4 className="rightbarTitle">Online Friends</h4>
					<ul className="rightbarFriendList">
						{Users.map((u) => (
							<>
								<Online key={u.id} user={u}></Online>
							</>
						))}
					</ul>
				</div>
				{/* <h4>Taklif qilinadi... </h4>
				<hr className="sidebarHr" />
				<ul className="sidebarFriendList">
					{Users.map((u) => (
						<CloseFriend key={u.id} user={u}></CloseFriend>
					))}
				</ul> */}
			</div>
		);
	};

	const ProfileRightbar = () => {
		return (
			<>
				{user.username != currentUser.username && (
					<button className="rightbarFollowButton" onClick={handleClick}>
						{followed ? "Rad etish" : "Do'st bo'lish"}
						{followed ? <Remove></Remove> : <Add></Add>}
					</button>
				)}
				<h4 className="rightbarTitle">Foydalanuvchi haqida</h4>
				<div className="rightbarInfo">
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Shahar :</span>
						<span className="rightbarInfoValue">{user.city} </span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Mamlakat :</span>
						<span className="rightbarInfoValue">{user.from} </span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Telefon :</span>
						<span className="rightbarInfoValue">
							+998 (77) 777-77-77{user.phone}{" "}
						</span>
					</div>
				</div>
				<h4 className="rightbarTitle">Do'stlari</h4>
				<div className="rightbarFollowings">
					{friends.map((friend) => (
						<a
							key={friend._id}
							className="rightbarFollowingName"
							href={`/profile/` + friend.username}
							style={{ textDecoration: "none" }}>
							<div className="rightbarFollowing">
								<img
									className="rightbarFollowingImg"
									src={friend.profilePicture || PF + "person/user.png"}
									alt=""
								/>
								<span className="rightbarFollowingName">{friend.username}</span>
							</div>
						</a>
					))}
				</div>
				<br />
				<h4 className="rightbarTitle">Followers</h4>
				<div className="rightbarFollowings">
					{followers.map((follow) => (
						<a
							className="rightbarFollowingName"
							href={`/profile/` + follow.username}
							style={{ textDecoration: "none" }}>
							<div className="rightbarFollowing">
								<img
									className="rightbarFollowingImg"
									src={follow.profilePicture || PF + "person/user.png"}
									alt=""
								/>
								<span className="rightbarFollowingName">{follow.username}</span>
							</div>
						</a>
					))}
				</div>
			</>
		);
	};
	return (
		<div className="rightbar">
			<div className="rightbarWrapper">
				{user ? (
					<ProfileRightbar></ProfileRightbar>
				) : (
					<HomeRightbar></HomeRightbar>
				)}
			</div>
		</div>
	);
}
