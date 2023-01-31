import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, own }) {
	return (
		<div className={own ? "message own" : "message"}>
			{own ? (
				<div className="messageTop">
					<p className="messageText">
						{message.text}
						<div className="messageBottom own">{format(message.createdAt)}</div>
					</p>
					<img
						className="messageImg own"
						src="https://www.placidsoftware.com/assets/images/user-img.png"
						alt=""
					/>
				</div>
			) : (
				<div className="messageTop">
					<img
						className="messageImg"
						src="https://www.placidsoftware.com/assets/images/user-img.png"
						alt=""
					/>
					<p className="messageText">
						{message.text}
						<div className="messageBottom">{format(message.createdAt)}</div>
					</p>
				</div>
			)}
		</div>
	);
}
