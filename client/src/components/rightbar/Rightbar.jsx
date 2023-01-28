import "./rightbar.css";
import Online from "../online/Online";
import { Users } from "../../dummyData";

export default function Sidebar({ profile }) {
	const HomeRightbar = () => {
		return (
			<div>
				<div className="birthdayContainer">
					<h4 className="rightbarTitle">Online Friends</h4>
					<ul className="rightbarFriendList">
						{Users.map((u) => (
							<Online key={u.id} user={u}></Online>
						))}
					</ul>
				</div>
			</div>
		);
	};
	const ProfileRightbar = () => {
		return (
			<>
				<h4 className="rightbarTitle">User information</h4>
				<div className="rightbarInfo">
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">City </span>
						<span className="rightbarInfoValue">Tashkent </span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">From </span>
						<span className="rightbarInfoValue">Uzbekistan </span>
					</div>
					<div className="rightbarInfoItem">
						<span className="rightbarInfoKey">Phone </span>
						<span className="rightbarInfoValue">+99812398 </span>
					</div>
				</div>
				<h4 className="rightbarTitle">User Friends</h4>
				<div className="rightbarFollowings">
					<div className="rightbarFollowing">
						<img
							className="rightbarFollowingImg"
							src="/assets/person/1.png"
							alt=""
						/>
						<span className="rightbarFollowingName">John Carter</span>
					</div>
					<div className="rightbarFollowing">
						<img
							className="rightbarFollowingImg"
							src="/assets/person/2.png"
							alt=""
						/>
						<span className="rightbarFollowingName">John Carter</span>
					</div>
					<div className="rightbarFollowing">
						<img
							className="rightbarFollowingImg"
							src="/assets/person/3.png"
							alt=""
						/>
						<span className="rightbarFollowingName">John Carter</span>
					</div>
				</div>
			</>
		);
	};
	return (
		<div className="rightbar">
			<div className="rightbarWrapper">
				{profile ? (
					<ProfileRightbar></ProfileRightbar>
				) : (
					<HomeRightbar></HomeRightbar>
				)}
			</div>
		</div>
	);
}
