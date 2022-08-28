import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown } from 'react-bootstrap'

import { Link } from 'react-router-dom'
const linkStyle = {
    color: 'teal',
    textDecoration: 'none'
}
const homeStyle = {
    color: 'white',
    textDecoration: 'none'
}
const authenticatedOptions = (
	<>
		<Nav.Item className='m-2 playFont'>
			<Link to='messageboard' style={linkStyle}>
				<span className='HoverClass1'>Messageboard</span>
			</Link>
		</Nav.Item>

		<NavDropdown   
		title={
        	<span className="navTitle playFont HoverClass1">Songs</span>
			} 	
			menuVariant="dark" 
			style={linkStyle}
		>
			<Nav.Item className='m-2 playFont'>
				<Link to='mysongs' style={linkStyle}>
				<span className='HoverClass1'>My Song List</span>
				</Link>
			</Nav.Item>
			<Nav.Item className='m-2 playFont'>
				<Link to='songs' style={linkStyle}>
				<span className='HoverClass1'>Song Index</span>
				</Link>
			</Nav.Item>
			<Nav.Item className='m-2 playFont'>
				<Link to='create-song' style={linkStyle}>
					<span className='HoverClass1'>Add a Song</span>
				</Link>
			</Nav.Item>
		</NavDropdown>
		
		<NavDropdown   
			title={<span className="navTitle playFont HoverClass1">My Account</span>} 
			menuVariant="dark" 
			style={linkStyle}
			>
			<Nav.Item eventKey='1' className='m-2 playFont'>
				<Link to='change-password' style={linkStyle}>
				<span className='HoverClass1'>Change Password</span>
				</Link>
			</Nav.Item >
			<Nav.Item eventKey='2' className='m-2 playFont'>
				<Link to='sign-out' style={linkStyle}>
				<span className='HoverClass1'>Sign Out</span>
				</Link>
			</Nav.Item>
		</NavDropdown>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Item className='m-2'>
		    <Link to='sign-in' style={linkStyle}>
				<span className='HoverClass1'>Sign In</span>
			</Link>
        </Nav.Item>
        <Nav.Item className='m-2'>
		    <Link to='sign-up' style={linkStyle}>
				<span className='HoverClass1'>Sign Up</span>
			</Link>
        </Nav.Item>
	</>
)

// const alwaysOptions = (
// 	<>
// 		<Nav.Item className='m-2'>
// 			<Link to='/' style={linkStyle}>
// 				Home
// 			</Link>
// 		</Nav.Item>
// 	</>
// )

const Header = ({ user }) => (
	<Navbar bg='dark' variant='dark' expand='md'>
		<Navbar.Brand className='m-2 playFont'>
            <Link to='/' style={linkStyle}>
				<span className='HoverClass1'>Harmony Haven</span>
            </Link>
        </Navbar.Brand>

		<Navbar.Toggle aria-controls='basic-navbar-nav' />

		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='m-2'>
			{/* <Nav className='ml-auto' className='m-2'> */}
				{user && (
					<span className='navbar-text mr-2 playFont' style={linkStyle}>Welcome, {user.email}</span>
				)}
				{/* {alwaysOptions} */}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
