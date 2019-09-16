import React, { Component } from 'react';
import UserCard from '../Components/UserCard';
import httpClient from '../httpClient';
import { Redirect } from 'react-router-dom';

class User extends Component {
  state = {
    user: '',
    filter: 'Name',
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
    const filter = this.state.filter.toLocaleLowerCase();
    if (e.target.name === 'filter') {
      this.setState({
        filter: e.target.value,
        filteredSearch: [],
        user: ''
      });
    } else {
      this.setState(
        {
          [e.target.name]: e.target.value
        },
        () => {
          this.setState({
            filteredSearch: [...this.state.users].filter(u =>
              u[filter].toLowerCase().includes(this.state.user.toLowerCase())
            )
          });
        }
      );
    }
  };

  onClickFilterHandler = e => {
    this.setState({
      user: e.target.innerText,
      filteredSearch: [],
      filteredUsers: [...this.state.users].filter(
        u => u[this.state.filter.toLowerCase()] === e.target.innerText
      )
    });
  };

  resetHandler = () => {
    this.setState({
      user: '',
      filteredSearch: [],
      filteredUsers: [...this.state.users]
    });
  };
  render() {
    const { user, filteredSearch, filteredUsers } = this.state;
    const { bookUser, bookedUser } = this.props;
    return (
      <div className="User">
        <h1>Users</h1>
        <div className="User__search">
          <button onClick={this.resetHandler}>Reset</button>
          <select
            onChange={this.onChangeHandler}
            name="filter"
            value={this.state.filter}
          >
            <option>Name</option>
            <option>Company</option>
          </select>
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
                  {u[this.state.filter.toLowerCase()]}
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
