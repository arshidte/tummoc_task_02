import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./Pages/LoginScreen";
import NavigationBar from './Components/NavigationBar'
import HomeScreen from "./Pages/HomeScreen";
import RegisterScreen from "./Pages/RegisterScreen";
function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/home" element={<HomeScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
