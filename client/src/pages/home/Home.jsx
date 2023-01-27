import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";

export default function Home() {
	return (
		<div>
			<Topbar></Topbar>
			<div className="home">
				<Sidebar></Sidebar>
				<Feed></Feed>
				<Rightbar></Rightbar>
			</div>
		</div>
	);
}
