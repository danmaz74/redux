import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchRepository } from '../actions';
import Repository from '../components/Repository';

class RepositoryPage extends Component {
  componentWillMount() {
    this.props.fetchData(this.props.repositoryFullName);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.repositoryFullName !== this.props.repositoryFullName) {
      this.props.fetchData(nextProps.repositoryFullName);
    }
  }

  render() {
    const { repository, owner } = this.props;
    if (!repository || !owner) {
      return <h1>Loading...</h1>;
    }

    return (
      <div>
        <Repository repository={repository}
                    owner={owner} />
      </div>
    );
  }
}

RepositoryPage.propTypes = {
  repository: PropTypes.object,
  repositoryFullName: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    repositories: state.database.repositories,
    users: state.database.users
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { repositories, users } = stateProps;
  const { userLogin, repositoryName } = ownProps.params;

  const repositoryFullName = `${userLogin}/${repositoryName}`;
  const repository = repositories[repositoryFullName];
  const owner = users[userLogin];

  return Object.assign({}, dispatchProps, {
    repository,
    owner,
    repositoryFullName
  });
}

function fetchData(repositoryFullName) {
  return dispatch => {
    dispatch(fetchRepository(repositoryFullName));
  }
}

export default connect(
  mapStateToProps,
  { fetchData },
  mergeProps
)(RepositoryPage);
