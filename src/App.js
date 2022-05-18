import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Router from './Router';
import {useState, useEffect} from "react"
import cookie from "cookie"


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(()=>{
    const cookies = cookie.parse(document.cookie)
    console.log(cookies["loggedIn"]);
    if (cookies["loggedIn"]){
      setLoggedIn(true)
    }


  },[])



  return (
    <div className="App">
      {console.log(loggedIn)}
      <Router loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
    </div>
  );
}

export default App;
