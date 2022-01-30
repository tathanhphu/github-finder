import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

import axios from "axios";
import { Alert } from "./components/layout/Alert";
import { About } from "./components/pages/About";
import Home from "./components/pages/Home";
import User from "./components/users/User";
const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  
  const searchUsers = async (text) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}
    &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setLoading(false);
    setUsers(res.data.items);
  };
  // Get a single Github user
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}
    ?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setLoading(false);
    setUser(res.data );
  };
  // Get users repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res =
      await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc
    &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setLoading(false);
    setRepos(res.data);
  };
  // Clear users from state
  const clearUsers = () => {
    setUsers([]);
  };
  // Set alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };
  // async componentDidMount() {
  //   this.setState({ loading: true});
  //   const res = await axios.get(`https://api.github.com/users?
  //   client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
  //   client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({loading: false, users: res.data});
  // }

  
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/about" element={<About />} />

            <Route
              exact
              path="/"
              element={
                <Home
                  searchUsers={searchUsers}
                  setAlert={showAlert}
                  clearUsers={clearUsers}
                  users={users}
                  loading={loading}
                />
              }
            />

            <Route
              path="/user/:login"
              element={
                <User
                  getUser={getUser}
                  loading={loading}
                  user={user}
                  getUserRepos={getUserRepos}
                  repos={repos}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
