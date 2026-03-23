import  { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Signin from "./Components/Authentication/Signin/Signin"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
