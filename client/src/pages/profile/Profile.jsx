import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./profile.css";

export default function Profile() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	return (
		<div>
			<Topbar></Topbar>
			<div className="profile">
				<Sidebar></Sidebar>
				<div className="profileRight">
					<div className="profileRightTop">
						<div className="profileCover">
							<img className="profileCoverImg" src={`${PF}post/5.png`} alt="" />
							<img className="profileUserImg" src={`${PF}person/3.png`} alt="" />
						</div>
						<div className="profileInfo">
							<h4 className="profileInfoName">Toshmat Eshmatov</h4>
							<span className="profileInfoDesc">Hello my firends !!!</span>
						</div>
					</div>
					<div className="profileRightBottom">
						<Feed></Feed>
						<Rightbar profile></Rightbar>
					</div>
				</div>
			</div>
		</div>
	);
}
