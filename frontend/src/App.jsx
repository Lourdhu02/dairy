import { BrowserRouter, Routes ,Route} from "react-router-dom"
import Login from "./auth/Login"
import SignUp from "./auth/SignUp"
import Home from "./pages/Home"
import Diary from "./pages/Diary"
import Memories from "./pages/Memories"
import Favorites from "./pages/Favorites"
import Personal from "./pages/Personal"
import ExpenseTracker from "./pages/ExpenseTracker"
import PasswordManager from "./pages/PasswordManager"
import "./App.css"
import Navbar from "./components/Navbar"
const App = () => {
  return (

    <div className="app">
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />      
      </Routes>
    </BrowserRouter>
      
      <BrowserRouter>
      <Navbar/>
        <Routes>
       
          <Route path="/home" element={<Home />} />
          <Route path="/expense" element={<ExpenseTracker/>}/>
          <Route path="/diary" element={<Diary/>}/>
          <Route path="/memories" element={<Memories/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="/personal" element={<Personal/>}/>
          <Route path="/password" element={<PasswordManager/>}/>

          
          
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App