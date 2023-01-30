import Topbar from "../../components/topbar/Topbar";
import "./messenger.css";
import Conversation from "../../components/conversations/Conversation";
import { Search } from "@mui/icons-material";
import Message from "../../components/message/Message";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ChatOnline from "../../components/chatOnline/ChatOnline";

export default function Messenger() {
	return (
		<div>
			<Topbar />
			<div className="messenger">
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
						<Conversation></Conversation>
						<Conversation></Conversation>
						<Conversation></Conversation>
						<Conversation></Conversation>
						<Conversation></Conversation>
						<Conversation></Conversation>
						<Conversation></Conversation>
						<Conversation></Conversation>
						<Conversation></Conversation>
						<br />
						<br />
					</div>
				</div>
				<div className="chatBox">
					<div className="chatBoxWrapper">
						<div className="chatBoxTop">
							<Message></Message>
							<Message own></Message>
							<Message></Message>
							<Message></Message>
							<Message own></Message>
							<Message></Message>
							<Message></Message>
							<Message own></Message>
							<Message></Message>
							<Message></Message>
							<Message own></Message>
							<Message></Message>
						</div>
						<div className="chatBoxBottom">
							<textarea
								className="chatMessageInput"
								name="Bu yerga yozing..."></textarea>
							<button className="chatSubmitButton">
								<SendRoundedIcon size="50px"></SendRoundedIcon>
							</button>
						</div>
					</div>
				</div>
				<div className="chatOnline">
					<div className="chatOnlineWrapper">
						<h4 className="chatOnlineTitle">Online Do'stlaringiz</h4>
						<hr className="chatHr"/>
						<ChatOnline></ChatOnline>
						<ChatOnline></ChatOnline>
						<ChatOnline></ChatOnline>
						<ChatOnline></ChatOnline>
					</div>
				</div>
			</div>
		</div>
	);
}
