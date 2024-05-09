import './App.css';
import './reset.css';
import HomePage from './pages/home.js';
import Dashboard from './pages/dashboard.js';
import FindPage from './pages/find.js';
import LoginPage from './pages/login.js';
import PageNotFound from './pages/notfound.js';
import ProfilePage from './pages/profile.js';
import SignupPage from './pages/signup.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={ <HomePage/> }/>
          <Route path="/dashboard" element={ <Dashboard/> }/>
          <Route path="/find" element={ <FindPage/> }/>
          <Route path="/login" element={ <LoginPage/> }/>
          <Route path="/profile" element={ <ProfilePage/> }/>
          <Route path="/signup" element={ <SignupPage/> }/>
          <Route path="*" element={ <PageNotFound/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
