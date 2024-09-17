import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import SignIn from './Components/login.jsx'
import SignUp from './Components/signup.jsx'
import Dashboard from './Components/dashboardNavigation.jsx'


function App() {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
    </Router>
  )
}

export default App

