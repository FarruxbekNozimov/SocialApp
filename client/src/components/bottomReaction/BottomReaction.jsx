import "./bottomReaction.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function BottomReaction({ post, target, chat }) {
	const [msg, setMsg] = useState(null);
	const [reactionsPostAll, setReactionsPostAll] = useState(post?.reactions);
	const [reactionsPost, setReactionsPost] = useState([]);
	const { user: currentUser } = useContext(AuthContext);

	let setAllReactions = () => {
		for (let i in reactionsPostAll) {
			if (!reactionsPost.map((r) => r[1]).includes(reactionsPostAll[i][1])) {
				setReactionsPost([...reactionsPost, reactionsPostAll[i]]);
			}
		}
	};

	let handleReaction = (x) => {
		console.log(x);
		try {
			const getReaction = async () => {
				let updateReactions = await axios.put(`/posts/${post._id}/reaction`, {
					userId: currentUser._id,
					reaction: x,
				});
				console.log(updateReactions);
				setReactionsPostAll(updateReactions.data);
			};
			getReaction();
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		setAllReactions();
	}, [reactionsPost, reactionsPostAll, post]);

	useEffect(() => {
		setMsg(document.getElementById(target));
		if (msg) {
			let reactionShowButton = document.getElementById(`${target}sh`);
			msg.addEventListener("mouseover", () => {
				reactionShowButton.style.opacity = "1";
			});
			msg.addEventListener("mouseout", () => {
				reactionShowButton.style.opacity = "0";
			});
		}
	}, [msg]);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const reactions = ["drink", "cake", "like", "vomit", "angry", "cry", "heart"];

	return (
		<>
			<div className="postBottomLeft">
				<div className="reactionShow" id={`${target}sh`}>
					{reactions.map((r) => (
						<img
							id={`${target}ic`}
							src={PF + `emojis/${r}.gif`}
							onClick={() => handleReaction(r)}
							className="reactIconShow"></img>
					))}
				</div>
				<span id={`${target}Btn`} className="bottomReactionButtonsContainer">
					{reactionsPost.map((r) =>
						reactionsPostAll.filter((x) => x[1] == r[1]) != 0 ? (
							<div
								className={`bottomReactionButton ${
									Object.fromEntries(reactionsPostAll)[currentUser._id] ==
										r[1] && "selectedReaction"
								}`}>
								{console.log(r)}
								<img
									src={PF + `emojis/${r[1]}.gif`}
									className="reactIcon"></img>
								<span className="postLikeCounter">
									{reactionsPostAll.filter((x) => x[1] == r[1]).length}
								</span>
							</div>
						) : (
							""
						)
					)}
				</span>
			</div>
		</>
	);
}
