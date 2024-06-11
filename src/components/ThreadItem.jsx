import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { FaThumbsUp, FaThumbsDown, FaReply } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useDispatch } from 'react-redux';
import {
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
} from '../thunks/thread';
import '../styles/ChatItem.css';

function ThreadItem({ thread, authUser, ...props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUserLike = thread?.upVotesBy?.includes(authUser);
  const isUserDislike = thread?.downVotesBy?.includes(authUser);
  const [likeCount, setLikeCount] = useState(thread?.upVotesBy?.length ?? 0);
  const [dislikeCount, setDislikeCount] = useState(thread?.downVotesBy?.length ?? 0);
  const [isLiked, setIsLiked] = useState(isUserLike || localStorage.getItem(`liked_${thread.id}`) === 'true');
  const [isDisliked, setIsDisliked] = useState(isUserDislike || localStorage.getItem(`disliked_${thread.id}`) === 'true');
  const [isNeutral, setIsNeutral] = useState(!isUserLike && !isUserDislike && localStorage.getItem(`liked_${thread.id}`) !== 'true' && localStorage.getItem(`disliked_${thread.id}`) !== 'true');

  useEffect(() => {
    setLikeCount(thread?.upVotesBy?.length ?? 0);
    setDislikeCount(thread?.downVotesBy?.length ?? 0);
  }, [thread]);

  const onVoteClickHandler = async (btn, event) => {
    event.stopPropagation();
    try {
      if (!isNeutral && isLiked && !isDisliked && btn === 'like') {
        dispatch(neutralVoteThread(thread.id, authUser));
        setIsNeutral(true);
        setIsLiked(false);
        setIsDisliked(false);
        localStorage.removeItem(`liked_${thread.id}`);
        setLikeCount(likeCount - 1);
      } else if (!isNeutral && !isLiked && isDisliked && btn === 'dislike') {
        dispatch(neutralVoteThread(thread.id, authUser));
        setIsNeutral(true);
        setIsLiked(false);
        setIsDisliked(false);
        localStorage.removeItem(`disliked_${thread.id}`);
        setDislikeCount(dislikeCount - 1);
      } else if (isNeutral && btn === 'like') {
        dispatch(upVoteThread(thread.id, authUser));
        setIsLiked(true);
        setIsDisliked(false);
        setIsNeutral(false);
        localStorage.setItem(`liked_${thread.id}`, 'true');
        setLikeCount(likeCount + 1);
      } else if (isNeutral && btn === 'dislike') {
        dispatch(downVoteThread(thread.id, authUser));
        setIsLiked(false);
        setIsDisliked(true);
        setIsNeutral(false);
        localStorage.setItem(`disliked_${thread.id}`, 'true');
        setDislikeCount(dislikeCount + 1);
      } else if (!isNeutral && isDisliked && !isLiked && btn === 'like') {
        dispatch(upVoteThread(thread.id, authUser));
        setIsLiked(true);
        setIsDisliked(false);
        setIsNeutral(false);
        localStorage.setItem(`liked_${thread.id}`, 'true');
        localStorage.removeItem(`disliked_${thread.id}`);
        setLikeCount(likeCount + 1);
        setDislikeCount(dislikeCount - 1);
      } else if (!isNeutral && !isDisliked && isLiked && btn === 'dislike') {
        dispatch(downVoteThread(thread.id, authUser));
        setIsLiked(false);
        setIsDisliked(true);
        setIsNeutral(false);
        localStorage.setItem(`disliked_${thread.id}`, 'true');
        localStorage.removeItem(`liked_${thread.id}`);
        setDislikeCount(dislikeCount + 1);
        setLikeCount(likeCount - 1);
      }
    } catch (error) {
      console.error('Failed to like/dislike thread:', error);
    }
  };

  const onThreadClick = () => {
    if (thread && thread.id) {
      navigate(`/threads/${thread.id}`);
    }
  };

  const keyPressHandler = (event) => {
    if ((event.key === 'Enter' || event.key === ' ') && thread && thread.id) {
      navigate(`/threads/${thread.id}`);
    }
  };

  const createdAtFormatted = formatDistanceToNow(new Date(thread?.createdAt), {
    addSuffix: true,
  });

  return (
    <div
      key={thread?.id}
      role="button"
      tabIndex={0}
      className="thread-item"
      onClick={onThreadClick}
      onKeyDown={keyPressHandler}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <div className="thread-item__detail">
        <header>
          <div className="thread-item__user-info" />
          <p className="thread-item__created-at">{createdAtFormatted}</p>
        </header>
        <article>
          <h2>{thread?.title}</h2>
          <p>
            Category:
            {thread?.category}
          </p>
          <p
            className="thread-item__text"
            dangerouslySetInnerHTML={{ __html: thread?.body }}
          />
        </article>

        <div className="thread-item__likes">
          <div>
            <button
              type="button"
              aria-label="like"
              onClick={(event) => {
                event.stopPropagation();
                onVoteClickHandler('like', event);
              }}
            >
              <FaThumbsUp
                style={{
                  color: isLiked && !isNeutral ? 'blue' : 'gray',
                }}
              />
              <span>{likeCount}</span>
            </button>
            {' '}
            <button
              type="button"
              aria-label="dislike"
              onClick={(event) => {
                event.stopPropagation();
                onVoteClickHandler('dislike', event);
              }}
            >
              <FaThumbsDown
                style={{
                  color: isDisliked && !isNeutral ? 'blue' : 'gray',
                }}
              />
              <span>{dislikeCount}</span>
            </button>
            <FaReply />
            {' '}
            {thread?.totalComments}
            <div className="thread-item__user-name">
              Dibuat oleh:
              {' '}
              <span>{thread?.ownerData?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string,
    upVotesBy: PropTypes.arrayOf(PropTypes.string),
    downVotesBy: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    body: PropTypes.string,
    totalComments: PropTypes.number,
    ownerData: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  authUser: PropTypes.string.isRequired,
};

ThreadItem.defaultProps = {
  thread: {
    id: '',
    upVotesBy: [],
    downVotesBy: [],
    createdAt: '',
    title: '',
    category: '',
    body: '',
    totalComments: 0,
    ownerData: {
      name: '',
    },
  },
};

export default ThreadItem;
