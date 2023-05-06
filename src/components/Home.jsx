import { useState, useEffect } from 'react'
import RouteIndex from './RouteIndex'

const Home = ({ userId, setUserId}) => {
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
  
  const role = user ? localStorage.setItem('role',user.group_name ) : localStorage.setItem('role', '' )

  const content = <RouteIndex setUserId={setUserId}/>

  return (
    <>
      {user && <>
        {content}
        {/* <button onClick={logoutHandler}>Logout</button> */}
      </>}
    </>
  )
}

export default Home
