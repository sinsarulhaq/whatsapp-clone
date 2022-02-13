import './App.css';
import { useState } from 'react'; 
import { Route, Routes } from "react-router-dom";
import { Home, ChatPage } from './components'
import Login from './components/Login'
import { auth } from './components/firebase';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('users')))
  const signOut = () => {
    auth.signOut().then(() => {
        setUser(null)
        localStorage.removeItem('user')
    }).catch((err) => alert(err.message))
}
  // console.log(user)
  return (
    <div className="App">
      
        {
          user ? (<Routes>
            <Route path='/' element={ <Home currentUser={user} signOut={signOut} /> } />
        <Route path='/chatpage' element={<ChatPage currentUser={user} signOut={signOut} />} />
        </Routes> ) : <Login setUser={setUser}/>
        }
        
      
    </div>
  );
}

export default App;
//, Link, useNavigate