import React, { Component } from 'react';
import UserCard from '../Components/UserCard';
import httpClient from '../httpClient';

class User extends Component {
  state = {
    users: []
  };

  async componentDidMount() {
    const response = await httpClient.getUsers();
    console.log(response);
    this.setState({
      users: response.data.users
    });
  }
  render() {
    const { users } = this.state;
    return (
      <div className="User">
        <h1>Users</h1>
        <div className="User__search">
          <input type="text" />
        </div>
        <div className="User__users">
          {users.map((u, i) => {
            return <UserCard key={i} user={u} />;
          })}
        </div>
      </div>
    );
  }
}

export default User;
