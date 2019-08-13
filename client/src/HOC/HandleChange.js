import React from 'react';

const Handle = WrappedComp => {
  class HandleWrapper extends React.Component {
    state = {
      name: '',
      email: '',
      password: '',
      company: ''
    };

    onChangeHandler = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };

    render() {
      return (
        <WrappedComp
          {...this.props}
          state={this.state}
          onChangeHandler={this.onChangeHandler}
        />
      );
    }
  }
  return HandleWrapper;
};

export default Handle;
