import "./conversation.css";

export default function Conversation() {
	return (
		<div className="conversation">
			<img
				className="conversationImg"
				src="https://www.placidsoftware.com/assets/images/user-img.png"
				alt=""
			/>
			<div className="rightBottom">
				<span className="conversationName">Mamarayim</span>
				<p className="conversationDescMessage">Hello how are you</p>
			</div>
		</div>
	);
}
