import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useContext } from 'react';
import ContactUs from "./components/ContactUs";
import Alert from "./components/Alert";
import Home from "./components/Home";
import UserHome from "./components/UserHome";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserState from "./context/users/UserState";
import alertContext from "./context/alerts/alertContext";
import UserProfile from "./components/UserProfile";
import { Demo } from "./components/Demo";
import DemoState from "./context/demo/DemoState";


function App() {
	const alrtContext = useContext(alertContext);
	const { alert } = alrtContext;

	return (
		<UserState>
			<DemoState>
				<NoteState>
					<Router>
						<NavBar />
						<Alert alert={alert} />
						<Routes>
							<Route exact path="/" element={<Home />} />
							<Route exact path="/demo" element={<Demo />} />
							<Route exact path="/user/home" element={<UserHome />} />
							<Route exact path="/contactus" element={<ContactUs />} />
							<Route exact path="/login" element={<Login />} />
							<Route exact path="/signup" element={<Signup />} />
							<Route exact path="/user/profile" element={<UserProfile />} />
						</Routes>
						<Footer />
					</Router>
				</NoteState>
			</DemoState>
		</UserState>
	);
}

export default App;
