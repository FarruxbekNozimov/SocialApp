import "./message.css";
import BottomReaction from "../bottomReaction/BottomReaction";
import { useEffect, useRef } from "react";
import moment from "moment";

export default function Message({ unique, message, own }) {
	return (
		<div className={own ? "message own" : "message"}>
			<div className="messageTop">
				{own ? (
					<>
						<p className="messageText" id={unique}>
							{message.text}
							<div className="messageBottom own">
								{moment(message.createdAt).format("HH:mm")}
								<BottomReaction target={unique} chat></BottomReaction>
							</div>
						</p>
						<img
							className="messageImg own"
							src="https://www.placidsoftware.com/assets/images/user-img.png"
							alt=""
						/>
					</>
				) : (
					<>
						<img
							className="messageImg"
							src="https://www.placidsoftware.com/assets/images/user-img.png"
							alt=""
						/>
						<p className="messageText" id={unique}>
							{message.text}
							<div className="messageBottom">
								{moment(message.createdAt).format("HH:mm")}
							</div>
							<BottomReaction target={unique} chat></BottomReaction>
						</p>
					</>
				)}
			</div>
		</div>
	);
}
