import "./share.css";
import { AddAPhoto, EmojiEmotions, Cancel } from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
	const { user } = useContext(AuthContext);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const desc = useRef();
	const [file, setFile] = useState(null);

	console.log(file);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (file || desc.current.value) {
			const newPost = {
				userId: user._id,
				desc: desc.current.value,
			};
			if (file) {
				const data = new FormData();
				data.append("file", file);
				try {
					const result = await axios.post("/upload", data);
					newPost.img = result.data;
				} catch (err) {
					console.log(err);
				}
			}

			try {
				await axios.post("/posts", newPost);
				window.location.reload();
			} catch (err) {
				console.log(err);
			}
		}
	};
	return (
		<div className="share">
			<div className="shareWrapper">
				<div className="shareTop">
					<img
						className="shareProfileImg"
						src={
							user.profilePicture ? user.profilePicture : PF + "person/user.png"
						}
						alt=""
					/>
					<input
						type="text"
						className="shareInput"
						placeholder={`${user.username} o'z hislaringizni bo'lishing...`}
						ref={desc}
					/>
				</div>
				{file && (
					<div className="shareImgContainer1">
						<img className="shareImg1" src={URL.createObjectURL(file)} alt="" />
						<Cancel className="shareCancelImg1" onClick={() => setFile(null)} />
					</div>
				)}
				<hr className="shareHr" />
				<form
					className="shareBottom"
					onSubmit={submitHandler}
					encType="multipart/form-data">
					<div className="shareOptions">
						<label htmlFor="file" className="shareOption">
							<AddAPhoto htmlColor="tomato" className="shareIcon"></AddAPhoto>
							<span className="shareOptionText">Rasm</span>
							<input
								style={{ display: "none" }}
								name="file"
								type="file"
								id="file"
								accept=".png,.jpg,.jpg,.gif"
								onChange={(e) => setFile(e.target.files[0])}
							/>
						</label>
					</div>
					<button className="shareButton" type="submit">
						Ulashish
					</button>
				</form>
			</div>
		</div>
	);
}
