import Share from "../share/Share";
import Post from "../post/Post";
import "./feed.css";

export default function Feed() {
	return (
		<div className="feed">
			<div className="feedWrapper">
				<Share></Share>
				<Post></Post>
				<Post></Post>
				<Post></Post>
				<Post></Post>
				<Post></Post>
				<Post></Post>
				<Post></Post>
			</div>
		</div>
	);
}
