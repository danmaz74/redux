import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class Repository {
  static propTypes = {
    repository: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }).isRequired,
    owner: PropTypes.shape({
      login: PropTypes.string.isRequired
    }).isRequired
  }

  render() {
    const { repository, owner } = this.props;
    const { login } = owner;
    const { name, description } = repository;

    return (
      <div className='Repo'>
        <h3>
          <Link to={`/${login}/${name}`}>
            {name}
          </Link>
          {' by '}
          <Link to={`/${login}`}>
            {login}
          </Link>
        </h3>
        {description &&
          <p>{description}</p>
        }
      </div>
    );
  }
}
