import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<>
			<header className="text-white" style={{ height: "350px", background: "#2079fd" }}>
				<div className="h-100 container px-4 text-center" style={{ paddingTop: "5%" }}>
					<h1 className="fw-normal">Welcome to <b>day</b>Book</h1>
					<p className="lead">Save your day logs or notes on cloud</p>
					<Link className="btn btn-lg btn-light" to="/demo">Start Demo!</Link>
				</div>
			</header>
			<section id="aboutSection">
				<div className="container px-4 py-5">
					<div className="row gx-4 justify-content-center">
						<div className="col-lg-8">
							<h2>About this page</h2>
							<p className="lead">This is a great place to order your day priorities. This is dayBook, a cloud platform to save your day logs and notes in one place. This dayBook features:</p>
							<ul>
								<li>Create and customize your logs and notes</li>
								<li>There's a demo page and data on demo page is removed if browser is refreshed</li>
								<li>If you like the Demo and also want to save your notes on cloud then you also Signup with your email</li>
								<li>Your data is secured and cannot be access by anyone</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
			<section className="bg-light" id="services">
				<div className="container px-4 py-5">
					<div className="row gx-4 justify-content-center">
						<div className="col-lg-8">
							<h2>Services we offer</h2>
							<p className="lead">We offer CRUD permission to user, User can create, read, update or delete notes and also user will be able to set tag for each note so that user can track notes priority. User can create account using email id and user cannot be able change the email after the signup.</p>
						</div>
					</div>
				</div>
			</section>
			<section id="contact">
				<div className="container px-4 py-5">
					<div className="row gx-4 justify-content-center">
						<div className="col-lg-8">
							<h2>Contact us</h2>
							<p className="lead">If you have any problem regrading any bug and issue in our platform service then you can mail us your query.</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
