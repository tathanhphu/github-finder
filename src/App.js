
import React, {Component} from 'react';
import './App.css';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users'
import axios from 'axios';
import Search from './components/users/Search';
import { Alert } from './components/layout/Alert';
class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  }

  searchUsers = async (text) => {
    this.setState({ loading: true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}
    &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({loading: false, users: res.data.items});
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
    const {users, loading} = this.state;
    return (
      <div className="App">
        <Navbar/>
        <div className='container'>
          <Alert alert={this.state.alert}/>
          <Search 
          searchUsers={this.searchUsers} 
          clearUsers={this.clearUsers} 
          showClear={users.length > 0 ? true: false}
          setAlert={this.setAlert}/>
          <Users loading={loading} users={users}/>
        </div>
      </div>
    );
  } 
}

export default App;