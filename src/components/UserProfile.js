import React from 'react'
import './UserProfile.css'
function UserProfile() {
  return (
    <div className='user-profile' >
        <div className="user-image">
            <img src="./user.png" alt="" />
        </div>
        <div className="user-info">
            <p className='username'>sinsarul haq</p>
        </div>
    </div>
  )
}

export default UserProfile