import "./sidebar.css";
import { Explore, PlayCircleFilled } from "@mui/icons-material";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import CabinRoundedIcon from "@mui/icons-material/CabinRounded";
import CircleNotificationsRoundedIcon from "@mui/icons-material/CircleNotificationsRounded";
import Person4RoundedIcon from "@mui/icons-material/Person4Rounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";

export default function Sidebar() {
	return (
		<div className="sidebar">
			<div className="sidebarWrapper">
				<ul className="sidebarList">
					<li className="sidebarListItem">
						<CabinRoundedIcon className="sidebarIcon"></CabinRoundedIcon>
						<span className="sidebarListItemText">Home</span>
					</li>
					<li className="sidebarListItem">
						<Explore className="sidebarIcon"></Explore>
						<span className="sidebarListItemText">Explore</span>
					</li>
					<li className="sidebarListItem">
						<PlayCircleFilled className="sidebarIcon"></PlayCircleFilled>
						<span className="sidebarListItemText">Videos</span>
					</li>
					<li className="sidebarListItem">
						<MessageRoundedIcon className="sidebarIcon"></MessageRoundedIcon>
						<span className="sidebarListItemText">Messages</span>
					</li>
					<li className="sidebarListItem">
						<CircleNotificationsRoundedIcon className="sidebarIcon"></CircleNotificationsRoundedIcon>
						<span className="sidebarListItemText">Messages</span>
					</li>
					<li className="sidebarListItem">
						<Person4RoundedIcon className="sidebarIcon"></Person4RoundedIcon>
						<span className="sidebarListItemText">Profile</span>
					</li>
					<li className="sidebarListItem">
						<MenuRoundedIcon className="sidebarIcon"></MenuRoundedIcon>
						<span className="sidebarListItemText">More</span>
					</li>
				</ul>
				<h4>Your Friends</h4>
				<hr className="sidebarHr" />
				<ul className="sidebarFriendList">
					{Users.map((u) => (
						<CloseFriend key={u.id} user={u}></CloseFriend>
					))}
				</ul>
			</div>
		</div>
	);
}
