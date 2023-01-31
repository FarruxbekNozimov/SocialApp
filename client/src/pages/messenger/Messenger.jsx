import "./messenger.css";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import {
	SendRounded,
	Search,
	SentimentSatisfiedRounded,
} from "@mui/icons-material";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import { io } from "socket.io-client";

export default function Messenger() {
	let theme = localStorage.getItem("theme") || "dark-version";
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [conversations, setConversations] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const socket = useRef();
	const { user } = useContext(AuthContext);
	const scrollRef = useRef();

	useEffect(() => {
		socket.current = io("ws://localhost:8900");
		socket.current.on("getMessage", (data) => {
			setArrivalMessage({
				sender: data.senderId,
				text: data.text,
				createdAt: Date.now(),
			});
		});
	}, []);

	useEffect(() => {
		arrivalMessage &&
			currentChat?.members.includes(arrivalMessage.sender) &&
			setMessages((prev) => [...prev, arrivalMessage]);
		console.log(arrivalMessage);
	}, [arrivalMessage, currentChat]);

	useEffect(() => {
		socket.current.emit("addUser", user._id);
		socket.current.on("getUsers", (users) => {
			setOnlineUsers(users);
		});
	}, [user]);

	useEffect(() => {
		const getConversations = async () => {
			try {
				const res = await axios.get("/conversations/" + user._id);
				setConversations(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getConversations();
	}, [user._id]);

	useEffect(() => {
		const getMessages = async () => {
			try {
				const res = await axios.get("/messages/" + currentChat?._id);
				setMessages(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getMessages();
	}, [currentChat]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (newMessage.trim()) {
			const message = {
				sender: user._id,
				text: newMessage.trim(),
				conversationId: currentChat._id,
			};
			const receiverId = currentChat.members.find((m) => m != user._id);
			socket.current.emit("sendMessage", {
				senderId: user._id,
				receiverId,
				text: newMessage,
			});

			try {
				const res = await axios.post("/messages", message);
				setMessages([...messages, res.data]);
				setNewMessage("");
			} catch (err) {
				console.log(err);
			}
		}
	};

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div>
			<div className={`messenger ${theme}`}>
				<Sidebar></Sidebar>
				<div className="chatAllBoxContainer">
					<div className="chatBox">
						<div className="chatBoxWrapper">
							{currentChat ? (
								<div>
									<div className="chatBoxTop">
										{messages.map((m) => (
											<div ref={scrollRef}>
												<Message
													message={m}
													own={m.sender == user._id}></Message>
											</div>
										))}
									</div>
									<div className="chatBoxBottom">
										<textarea
											// onKeyDown={handleSubmit}
											className="chatMessageInput"
											name="Bu yerga yozing..."
											value={newMessage}
											onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
											onChange={(e) =>
												setNewMessage(e.target.value)
											}></textarea>
										<button className="emojiButton">
											<SentimentSatisfiedRounded className="emojiButtonIcon"></SentimentSatisfiedRounded>
										</button>
										<button className="chatSubmitButton" onClick={handleSubmit}>
											<SendRounded className="chatSubmitButtonIcon"></SendRounded>
										</button>
									</div>
								</div>
							) : (
								<span className="noConversationText">
									Yozish uchun do'stingizni tanlang
								</span>
							)}
						</div>
					</div>
					<div className="chatMenu">
						<div className="chatMenuWrapper">
							<div className="searchFriend">
								<Search className="searchIcon"></Search>
								<input
									type="text"
									placeholder="Do'stingizni qidiring"
									className="chatMenuInput"
								/>
							</div>
							{conversations.map((c) => (
								<div onClick={() => setCurrentChat(c)}>
									<ChatOnline
										onlineUsers={onlineUsers}
										conversation={c}
										currentUser={user}></ChatOnline>
								</div>
							))}
							<br />
							<br />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
