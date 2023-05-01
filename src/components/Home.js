// import logo from '../assets/load.gif'
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import HolyCats from '../images/holycats.png'

const Home = (props) => {
	// const { msgAlert, user } = props

	const { msgAlert, user, background} = props
	return (
		<>
			<Container  className="m-2 playFont text-center">
			<div>
				<img className="rounded" style={{height: '200px'}} src={HolyCats} alt="HolyCats Image" />
			</div>				
			<h1>Welcome</h1>
				<p>Harmony Haven is a supportive community that will give you the resources you need to become a great chorus. </p>
				{/* <img src='https://images.app.goo.gl/uvsdw9p2QTTHQM9V6' alt="loading..." /> */}
				<p>Sign up for a free account to enjoy all our free resources</p>
				<h3 ><Link to="messageboard">Message Board</Link></h3>
				<p>Share a post with our community. Tell us what songs you are working on or what inspires you. Leave a comment on other posts to encourge and support your fellow choir members.</p>
				<h3><Link to="/songs">Songs</Link></h3>
				<p>Browse through a large array of diverse repertoire located in our <Link to="/songs">song index</Link>. Choose a song from the index to see the composer, authors, lyrics, recordings, or see a video from youtoube. If you are learning a song add it to <Link to="/mysongs">My Song List</Link> so you can keep track of what songs you are learning. <Link to="/create-song">Add a song</Link> to help us grow our resources and share the music that inspires you the most.</p> 
				<h3>My Account</h3>
				<p>Update your personal account information. <Link to="change-password">Change your password</Link> and keep it in a secure place. Keep your account secure. Don't share your password with anyone.</p> 
			</Container>
		</>
	)
}

export default Home
