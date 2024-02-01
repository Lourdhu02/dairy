import { BrowserRouter, Routes ,Route} from "react-router-dom"
import Login from "./auth/Login"
import SignUp from "./auth/SignUp"
import "./App.css"
const App = () => {
  return (
    <div className="app">
      
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App