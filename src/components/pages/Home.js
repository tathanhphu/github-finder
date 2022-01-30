import React, {Fragment, Component} from 'react';
import Search from '../users/Search';
import Users from '../users/Users';
import PropTypes from 'prop-types';

export class Home extends Component{
  static propsTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired  
  }
  render() {
    const {searchUsers, clearUsers, users, setAlert, loading} = this.props;
  
    return <Fragment>
      <Search 
        searchUsers={searchUsers} 
        clearUsers={clearUsers} 
        showClear={users.length > 0 ? true: false}
        setAlert={setAlert}/>
      <Users loading={loading} users={users}/>
    </Fragment>;
  }
}

export default Home;
