import "./post.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
	MoreVert,
	DeleteOutlineRounded,
	EditRounded,
} from "@mui/icons-material";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import BottomReaction from "../bottomReaction/BottomReaction";
import Message from "../message/Message";
// import { ChatBubbleOutlineRounded } from "@mui/icons-material";

export default function Post({ post }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	// const [like, setLike] = useState(post?.likes.length);
	const [isLiked, setIsLiked] = useState(false);
	const [user, setUser] = useState({});
	const { user: currentUser } = useContext(AuthContext);

	// useEffect(() => {
	// 	setIsLiked(post.likes.includes(currentUser._id));
	// }, [currentUser._id, post.likes]);

	// const likeHandler = () => {
	// 	try {
	// 		axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// 	setLike(isLiked ? like - 1 : like + 1);
	// 	setIsLiked(!isLiked);
	// };

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/users?userId=${post.userId}`);
			setUser(res.data);
		};
		fetchUser();
	}, [post.userId]);

	return (
		<div className="post" id={post._id}>
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
							<br />
							<span className="postDate">
								<WatchLaterRoundedIcon className="postDateIcon"></WatchLaterRoundedIcon>
								{moment(post.createdAt).format("HH:mm")}
							</span>
						</span>
					</div>
					<div className="postTopRight">
						<MoreVert className="moreIcon"></MoreVert>
						<div className="postMoreContainer">
							<span className="postMoreItem">
								<EditRounded className="postMoreIcons"></EditRounded>
								Update
							</span>
							<span className="postMoreItem">
								<DeleteOutlineRounded className="postMoreIcons"></DeleteOutlineRounded>
								Delete
							</span>
						</div>
					</div>
				</div>
				<div className="postCenter">
					<span className="postText">{post?.desc}</span>
					<img className="postImg" src={post?.img} alt="" />
				</div>
				<div className="postBottom">
					<BottomReaction post={post} target={post._id}></BottomReaction>
					<div className="postBottomRight">
						<span className="postCommentText">0 comments</span>
					</div>
				</div>
				<div className="postCommentsContainer">
					<div className="postCommentItem">
						<img
							className="postCommentAvatar"
							src={
								user.profilePicture
									? user.profilePicture
									: PF + "person/user.png"
							}
						/>
						<span className="postCommentTextCont">
							<span className="postCommentTitle">FarruxDEV</span>
							<span className="postCmmmentText">Hello, How are you ?</span>
							<span className="postCommentDate">12:00</span>
						</span>
					</div>
					<div className="postCommentItem">
						<img
							className="postCommentAvatar"
							src={
								user.profilePicture
									? user.profilePicture
									: PF + "person/user.png"
							}
						/>
						<span className="postCommentTextCont">
							<span className="postCommentTitle">FarruxDEV</span>
							<span className="postCmmmentText">Hello, How are you ?</span>
							<span className="postCommentDate">12:00</span>
						</span>
					</div>
					<div className="postCommentSenderCont">
						<input
							autoComplete="off"
							name="comment"
							type="text"
							className="postCommentSendInput"
							placeholder="Comment here... "
						/>
						<button className="postCommentSendButton">💭</button>
					</div>
				</div>
			</div>
		</div>
	);
}
