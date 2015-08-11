import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import User from '../components/User';

class UserPage extends Component {
  componentWillMount() {
    this.props.fetchData(this.props.userLogin);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userLogin !== this.props.userLogin) {
      this.props.fetchData(nextProps.userLogin);
    }
  }

  render() {
    const { user } = this.props;
    if (!user) {
      return <h1>Loading...</h1>;
    }

    return (
      <div>
        <User {...user} />
      </div>
    );
  }
}

UserPage.propTypes = {
  user: PropTypes.object,
  userLogin: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.database.users
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { users } = stateProps;
  const { userLogin } = ownProps.params;

  return Object.assign({}, dispatchProps, {
    user: users[userLogin],
    userLogin
  });
}

function fetchData(userLogin) {
  return dispatch => {
    dispatch(fetchUser(userLogin));
  }
}

export default connect(
  mapStateToProps,
  { fetchData },
  mergeProps
)(UserPage);
