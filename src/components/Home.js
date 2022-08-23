import SongsIndex from "./songs/SongsIndex"
// import logo from '../assets/load.gif'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	const { msgAlert } = props
	return (
		<>
			<h2>Home Page</h2>
			<img src='https://images.app.goo.gl/uvsdw9p2QTTHQM9V6' alt="loading..." />

			{/* https://images.app.goo.gl/uvsdw9p2QTTHQM9V6 */}
			{/* <SongsIndex msgAlert={ msgAlert }/> */}
		</>
	)
}

export default Home
