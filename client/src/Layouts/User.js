import React, { Component } from 'react';
import UserCard from '../Components/UserCard';
import httpClient from '../httpClient';
import { Redirect } from 'react-router-dom';

class User extends Component {
  state = {
    user: '',
    filteredSearch: [],
    users: [],
    filteredUsers: []
  };

  async componentDidMount() {
    const response = await httpClient.getUsers();
    console.log(response);
    this.setState({
      users: response.data.users,
      filteredUsers: response.data.users
    });
  }

  onChangeHandler = e => {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        this.setState({
          filteredSearch: [...this.state.users].filter(u =>
            u.name.toLowerCase().includes(this.state.user.toLowerCase())
          )
        });
      }
    );
  };

  onClickFilterHandler = e => {
    this.setState({
      user: e.target.innerText,
      filteredSearch: [],
      filteredUsers: [...this.state.users].filter(
        u => u.name === e.target.innerText
      )
    });
  };
  render() {
    const { user, filteredSearch, filteredUsers } = this.state;
    const { bookUser, bookedUser } = this.props;
    return (
      <div className="User">
        {bookedUser && <Redirect to="/form" />}
        <h1>Users</h1>
        <div className="User__search">
          <input
            type="text"
            name="user"
            value={user}
            onChange={this.onChangeHandler}
          />
          <ul>
            {filteredSearch.map((u, i) => {
              return (
                <li key={i} onClick={this.onClickFilterHandler}>
                  {u.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="User__users">
          {filteredUsers.map((u, i) => {
            return <UserCard key={i} user={u} bookUser={bookUser} />;
          })}
        </div>
      </div>
    );
  }
}

export default User;
