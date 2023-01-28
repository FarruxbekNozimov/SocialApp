import "./register.css";

export default function Login() {
	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">Yuzkitob</h3>
					<span className="loginDesc">
						Yuzkitob orqali do'stlaringiz va atrofingizdagilar bilan bog'laning
					</span>
				</div>
				<div className="loginRight">
					<div className="loginBox">
						<input placeholder="Username" className="loginInput" />
						<input placeholder="Email" className="loginInput" />
						<input placeholder="Parol" className="loginInput" />
						<button className="loginButton">Ro'yxatdan o'tish </button>
						<hr className="loginHr" />
						<button className="loginRegisterButton">
							Yangi akkaunt ochish
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
