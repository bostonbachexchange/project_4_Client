// import logo from '../assets/load.gif'
import MySongList from "./user/MySongList"
const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	const { msgAlert, user} = props
	return (
		<>
			<MySongList user={user}/>
			<h2>Home Page</h2>
			<p>a nice picture</p>
			{/* <img src='https://images.app.goo.gl/uvsdw9p2QTTHQM9V6' alt="loading..." /> */}
			{/* <h3>Welcome</h3>
			<p>Welcome to a support community that will give you the resources you need to because a great chorus. </p>
			<h3>Messageboard</h3>
			<p>Share a post with our community. Tell us what songs you are working on or what inspires you. Leave a comment on other post to encourge and support your fellow choir members.</p>
			<h3>Songs</h3>
			<p>Browse through a large array of diverse repertoire. Add these songs to "My list" to keep track of what songs you are learning. Check this list often for updates. </p> */}

		</>
	)
}

export default Home
