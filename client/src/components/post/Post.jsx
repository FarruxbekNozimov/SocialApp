import "./post.css";
import { MoreVert } from "@mui/icons-material";

export default function Post() {
	return (
		<div className="post">
			<div className="postWrapper">
				<div className="postTop">
					<div className="postTopLeft">
						<img className="postProfileImg" src="/assets/person/2.png" alt="" />
						<span className="postUsername">Eshmatbek Gishmatov</span>
						<span className="postDate">5 min ago</span>
					</div>
					<div className="postTopRight">
						<MoreVert></MoreVert>
					</div>
				</div>
				<div className="postCenter">
					<span className="postText">Hey! Its my second post ::))</span>
					<img className="postImg" src="/assets/post/1.png" alt="" />
				</div>
				<div className="postBottom">
					<div className="postBottomLeft">
						<img className="reactIcon" src="/assets/like.png" alt="" />
						<span className="postLikeCounter">12 people like it</span>
					</div>
					<div className="postBottomRight">
						<span className="postCommentText">9 comments</span>
					</div>
				</div>
			</div>
		</div>
	);
}
