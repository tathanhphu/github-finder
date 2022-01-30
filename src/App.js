import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';

import axios from 'axios';
import { Alert } from './components/layout/Alert';
import { About } from './components/pages/About';
import Home from './components/pages/Home';
import User from './components/users/User';
class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
    
  }

  searchUsers = async (text) => {
    this.setState({ loading: true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}
    &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({loading: false, users: res.data.items});
  }
  // Get a single Github user
  getUser = async(username) => {
    this.setState({ loading: true});
    const res = await axios.get(`https://api.github.com/users/${username}
    ?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({loading: false, user: res.data});
  }
  // Get users repos
  getUserRepos = async(username) => {
    this.setState({ loading: true});
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc
    &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({loading: false, repos: res.data});
  }
  // Clear users from state
  clearUsers = () => {
    this.setState({users: [], loading: false})
  }
  // Set alert
  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}});
    setTimeout(() => {
      this.setState({alert: null})
    }, 5000)
  }
  // async componentDidMount() {
  //   this.setState({ loading: true});
  //   const res = await axios.get(`https://api.github.com/users?
  //   client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
  //   client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({loading: false, users: res.data});
  // }
  render() {
    const {users, loading, user, repos} = this.state;
    return (
      <Router>
      <div className="App">
        <Navbar/>
        <div className='container'>
          <Alert alert={this.state.alert}/>
          <Routes>
            
            <Route exact path='/about' element={<About/>} />
            
            <Route 
              exact path='/' 
              element={<Home searchUsers={this.searchUsers} 
              setAlert={this.setAlert}
              clearUsers={this.clearUsers} users={users} loading={loading}/>} />
            
            <Route path='/user/:login'  element={<User getUser={this.getUser} loading={loading} user={user} getUserRepos={this.getUserRepos} repos={repos}/>} />
          </Routes>
          
        </div>
      </div>
      </Router>
    );
  } 
}

export default App;
