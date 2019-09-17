import React, { Component } from 'react';
import UserCard from '../Components/UserCard';
import httpClient from '../httpClient';

class User extends Component {
  state = {
    user: '',
    filter: 'Name',
    filteredSearch: [],
    users: [],
    filteredUsers: [],
    toggle: false
  };

  async componentDidMount() {
    const response = await httpClient.getUsers();
    this.setState({
      users: response.data.users,
      filteredUsers: response.data.users
    });
  }

  onChangeHandler = e => {
    const { filter } = this.state;
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        this.setState({
          filteredSearch: [...this.state.users].filter(
            u =>
              u[filter.toLowerCase()]
                .toLowerCase()
                .includes(this.state.user.toLowerCase()) && this.state.user
          )
        });
      }
    );
  };

  selectHandler = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  };

  optionHandler = e => {
    const { filter } = this.state;
    this.setState(
      {
        filter: e.target.innerText,
        toggle: false,
        user: '',
        filteredSearch: []
      },
      () => {
        this.setState({
          filteredSearch: [...this.state.users].filter(
            u =>
              u[filter.toLowerCase()]
                .toLowerCase()
                .includes(this.state.user.toLowerCase()) && this.state.user
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
        u => u[this.state.filter.toLowerCase()] === e.target.innerText
      )
    });
  };

  resetHandler = () => {
    this.setState({
      user: '',
      filteredSearch: [],
      filteredUsers: [...this.state.users],
      toggle: false
    });
  };

  render() {
    const { user, filteredSearch, filteredUsers, toggle, filter } = this.state;
    const { bookUser } = this.props;
    return (
      <div className="User">
        <h1 className="User__title">Users</h1>
        <div className="User__search">
          <div className="User__select">
            <div className="User__value" onClick={this.selectHandler}>
              {filter} <i className="fas fa-caret-down"></i>
            </div>
            {toggle && (
              <ul className="User__options">
                <li onClick={this.optionHandler}>Name</li>
                <li onClick={this.optionHandler}>Company</li>
              </ul>
            )}
          </div>
          <div className="User__filtered">
            <input
              type="text"
              name="user"
              value={user}
              placeholder="Name"
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
          <button onClick={this.resetHandler}>Reset</button>
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
