import "./share.css";
import { PermMedia } from "@mui/icons-material";

export default function Share() {
	return (
		<div className="share">
			<div className="shareWrapper">
				<div className="shareTop">
					<img className="shareProfileImg" src="/assets/person/1.png" alt="" />
					<input
						type="text"
						className="shareInput"
						placeholder="Create post here..."
					/>
				</div>
				<hr className="shareHr" />
				<div className="shareBottom">
					<div className="shareOptions">
						<div className="shareOption">
							<PermMedia className="shareIcon"></PermMedia>
							<span className="shareOptionText">Photo or Video</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
