import "./chatOnline.css";

export default function ChatOnline() {
	return (
		<div className="chatOnlineFriend">
			<div className="chatOnlineImgContainer">
				<img
					className="chatOnlineImg"
					src="https://www.placidsoftware.com/assets/images/user-img.png"
					alt=""
				/>
				<div className="chatOnlineBadge"></div>
			</div>
			<div className="chatOnlineName">Gulichapchap</div>
		</div>
	);
}
