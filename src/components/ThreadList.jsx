import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadList({ body, authUser }) {
  console.log(typeof authUser, authUser);

  return (
    <div className="thread-list">
      {body.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} authUser={authUser.id} />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  body: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  authUser: PropTypes.object.isRequired,
};

export default ThreadList;
