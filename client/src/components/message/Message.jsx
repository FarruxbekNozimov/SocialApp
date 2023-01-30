import "./message.css";

export default function Message({ own }) {
	return (
		<div className={own ? "message own" : "message"}>
			{own ? (
				<div className="messageTop">
					<p className="messageText">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat
						necessitatibus.
						<div className="messageBottom own">1 hour ago</div>
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
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat
						necessitatibus.
						<div className="messageBottom">1 hour ago</div>
					</p>
				</div>
			)}
		</div>
	);
}
