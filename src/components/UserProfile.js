import React from 'react'
import './UserProfile.css'
function UserProfile({name, photoUrl}) {
  return (
    <div className='user-profile' >
        <div className="user-image">
            <img src={photoUrl} alt="" />
        </div>
        <div className="user-info">
            <p className='username'>{name}</p>
        </div>
    </div>
  )
}

export default UserProfile