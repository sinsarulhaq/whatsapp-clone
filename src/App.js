import './App.css';
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { Home, ChatPage } from './components'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/chatpage' element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
