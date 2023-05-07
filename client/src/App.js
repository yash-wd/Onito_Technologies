import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegistrationForm from "./components/PersonalDetails/RegistrationForm";
import UserList from "./components/UsersData/UserList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/registration">Register</Link>
            </li>
            <li>
              <Link to="/users">View Users</Link>
            </li>
          </ul>
        </nav>

        <Routes>
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/users" element={<UserList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
