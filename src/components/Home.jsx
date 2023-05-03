import { useState, useEffect } from 'react'
import RouteIndex from './RouteIndex'

const Home = ({ onLogout, userId }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    fetch('http://localhost:8000/users/' + userId, {
      method: 'GET' /* or POST/PUT/PATCH/DELETE */,
      headers: {
        Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('accessToken'))}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((userData) => {
        setUser(userData)
      })
  }, [])

  const logoutHandler = () => {
    onLogout()
  }

  const role = user ? user.group_name : null

  const content = role && role === 'recepcionista' ? <RouteIndex /> : <p>Home Page</p>

  return (
    <>
      {/* <button onClick={logoutHandler}>Logout</button> */}
      {user && <>
        {/* <h1>Bienvenido {user.username}!</h1>
        <p>{user.group_name}</p> */}
        {content}
      </>}
    </>
  )
}

export default Home
