import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { red } from "@mui/material/colors";

export default function Post({ post }) {
	const [like, setLike] = useState(post.likes.length);
	const [isLiked, setIsLiked] = useState(false);
	const [user, setUser] = useState({});
	const { user: currentUser } = useContext(AuthContext);

	useEffect(() => {
		setIsLiked(post.likes.includes(currentUser._id));
	}, [currentUser._id, post.likes]);

	const likeHandler = () => {
		try {
			axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
		} catch (err) {
			console.log(err);
		}
		setLike(isLiked ? like - 1 : like + 1);
		setIsLiked(!isLiked);
	};

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/users?userId=${post.userId}`);
			setUser(res.data);
		};
		fetchUser();
	}, [post.userId]);

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	return (
		<div className="post">
			<div className="postWrapper">
				<div className="postTop">
					<div className="postTopLeft">
						<Link to={`profile/${user.username}`}>
							<img
								className="postProfileImg"
								src={
									user.profilePicture
										? user.profilePicture
										: PF + "person/user.png"
								}
								alt=""
							/>
						</Link>
						<span className="postUsername">
							{user.username}
							<br /> <span className="postDate">{format(post.createdAt)}</span>
						</span>
					</div>
					<div className="postTopRight">
						<MoreVert></MoreVert>
					</div>
				</div>
				<div className="postCenter">
					<span className="postText">{post?.desc}</span>
					<img className="postImg" src={post?.img} alt="" />
				</div>
				<div className="postBottom">
					<div className="postBottomLeft">
						{!isLiked ? (
							<FavoriteBorderRoundedIcon
								onClick={likeHandler}
								className="reactIcon"></FavoriteBorderRoundedIcon>
						) : (
							<FavoriteRoundedIcon
								onClick={likeHandler}
								className="reactIcon"
								style={{ color: "#ff1100" }}></FavoriteRoundedIcon>
						)}
						<span className="postLikeCounter">{like} people like it</span>
					</div>
					<div className="postBottomRight">
						<span className="postCommentText">{post.comments} comments</span>
					</div>
				</div>
			</div>
		</div>
	);
}
