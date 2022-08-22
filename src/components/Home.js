import SongsIndex from "./songs/SongsIndex"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	const { msgAlert } = props
	return (
		<>
			<h2>Home Page</h2>
			<SongsIndex msgAlert={ msgAlert }/>
		</>
	)
}

export default Home
