import { useState, useEffect } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";

export default function Feed() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await axios.get("posts/timeline/63d2b9b0341bc5b68c628e05");
			console.log(res.data);
			setPosts(res.data);
		};
		fetchPosts();
	}, []);

	return (
		<div className="feed">
			<div className="feedWrapper">
				<Share></Share>
				{posts.map((p) => (
					<Post key={p.id} post={p}></Post>
				))}
			</div>
		</div>
	);
}
