import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { Button, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavBar = () => {
	return (
		<div className="row" style={{ margin: '0' }}>
			<Navbar bg="light" expand="lg">
				<Container fluid>
					<Navbar.Brand href="/">
						<div className="">
							<img
								className=""
								src="/du-logo.png"
								alt="Dennis Udeh"
								style={{ height: 'auto', maxHeight: '100px' }}
							/>
						</div>
						<div className="stage">
							<img className="spinner" src="/du-logo.png" alt="Dennis Udeh" />
						</div>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="navbarScroll" />
					<Navbar.Collapse id="navbarScroll">
						<Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100%' }} navbarScroll>
							<Nav>
								<Link to="/home">
									<img src="/home.png" alt="home" title="home" />
								</Link>
							</Nav>
							<Nav>
								<Link to="/about">
									<img src="/about.png" alt="about" title="home" />
								</Link>
							</Nav>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
		// <Navbar>
		//     <NavLink>Home</NavLink>
		//     <NavLink>About</NavLink>

		// </Navbar>
	);
};

export default NavBar;
