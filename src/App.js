// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import HomeTwo from './components/HomeTwo'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import SongsIndex from './components/songs/SongsIndex'
import ShowSong from './components/songs/ShowSong'
import ShowMessage from './components/messageBoard/ShowMessage'
import CreateSong from './components/songs/CreateSong'
import MessageBoardIndex from './components/messageBoard/MessageBoardIndex'
import CreateMessage from './components/messageBoard/CreateMessage'
import MessageBoardForm from './components/shared/MessageBoardForm'
import MySongList from './components/user/MySongList'

const App = () => {

  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])

  console.log('user in app', user)
  console.log('message alerts', msgAlerts)
  const clearUser = () => {
    console.log('clear user ran')
    setUser(null)
  }

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
      )
		})
	}

	return (
		<Fragment>
			<Header user={user} />
			<Routes>
				<Route path='/' element={<><Home msgAlert={msgAlert} user={user} /></>} />
				<Route
					path='/sign-up'
					element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/sign-in'
					element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/sign-out'
					element={
					<RequireAuth user={user}>
						<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
					</RequireAuth>
					}
				/>
				<Route
					path='/change-password'
					element={
						<RequireAuth user={user}>
						<ChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>}
				/>
					<Route
						path='/songs'
						element={
							<RequireAuth user={user}>
								<SongsIndex msgAlert={msgAlert} user={user} />
							</RequireAuth>
						}
					/>
					<Route
						path='/mysongs'
						element={
							<RequireAuth user={user}>
								<MySongList msgAlert={msgAlert} user={user} />
							</RequireAuth>
						}
					/>
					<Route
						path='/messageboard'
						element={
							<RequireAuth user={user}>
								<MessageBoardIndex msgAlert={msgAlert} user={user} />
								<CreateMessage msgAlert={msgAlert} user={user} />
							</RequireAuth>
						}
					/>
					<Route
						path='/messageboard/:id'
						element={
							<RequireAuth user={user}>
								<ShowMessage msgAlert={msgAlert} user={user} />
							 </RequireAuth>
						}
					/>
				<Route
					path='/songs/:id'
					element={
						<RequireAuth user={user}>
							<ShowSong msgAlert={msgAlert} user={user} />
						</RequireAuth>
					}
				/>
				<Route
					path='/create-song'
					element={
						<RequireAuth user={user}>
							<CreateSong msgAlert={msgAlert} user={user} />
						</RequireAuth>
					}
				/>

			</Routes>
			{msgAlerts.map((msgAlert) => (
			<AutoDismissAlert
				key={msgAlert.id}
				heading={msgAlert.heading}
				variant={msgAlert.variant}
				message={msgAlert.message}
				id={msgAlert.id}
				deleteAlert={deleteAlert}
			/>
			))}
		</Fragment>
	)
}

export default App
