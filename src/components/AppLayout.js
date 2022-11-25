import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.svg";

const AppLayout = () => {
	const [darkMode, setDarkMode] = useState(true);
	return (
		<div className={`app ${darkMode ? "dark" : "light"}`}>
			<div className="header">
				<Link to="/" className="header__container header__container--logo">
					<img src={logo} alt="logo" className="header__logo" />
				</Link>

				<div
					className="header__container header__container--theme"
					onClick={() => setDarkMode((prev) => !prev)}
				>
					{darkMode ? (
						<span className="material-icons-round header__theme">
							light_mode
						</span>
					) : (
						<span className="material-icons-round header__theme">
							dark_mode
						</span>
					)}
				</div>
			</div>
			<Outlet />
		</div>
	);
};

export default AppLayout;
