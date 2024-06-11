import React from 'react';
import PropTypes from 'prop-types';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { useDispatch } from 'react-redux';
import {
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
} from '../thunks/thread';
import '../styles/DetailThread.css';

function ThreadDetail({ thread, authUser, ...props }) {
  const dispatch = useDispatch();

  const isUserLike = thread && thread.upVotesBy ? thread.upVotesBy.includes(authUser) : false;
  // eslint-disable-next-line max-len
  const isUserDislike = thread && thread.downVotesBy ? thread.downVotesBy.includes(authUser) : false;
  // eslint-disable-next-line max-len
  const [jumlahLike, setJumlahLike] = React.useState(thread && thread.upVotesBy ? thread.upVotesBy.length : 0);
  // eslint-disable-next-line max-len
  const [jumlahDislike, setJumlahDislike] = React.useState(thread && thread.downVotesBy ? thread.downVotesBy.length : 0);
  const tanggalDibuat = thread && thread.createdAt ? thread.createdAt : '';
  const judul = thread && thread.title ? thread.title : '';
  const isi = thread && thread.body ? thread.body : '';
  const kategori = thread && thread.category ? thread.category : '';
  const teksTanggalDibuat = formatDistanceToNow(new Date(tanggalDibuat), { addSuffix: true });

  const [sudahLike, setSudahLike] = React.useState(isUserLike);
  const [sudahDislike, setSudahDislike] = React.useState(isUserDislike);
  const [netral, setNetral] = React.useState(!isUserLike && !isUserDislike);

  React.useEffect(() => {
    const statusLike = localStorage.getItem(`like-${thread.id}`);
    const statusDislike = localStorage.getItem(`dislike-${thread.id}`);

    if (statusLike === 'true') {
      setSudahLike(true);
      setSudahDislike(false);
      setNetral(false);
    } else if (statusDislike === 'true') {
      setSudahLike(false);
      setSudahDislike(true);
      setNetral(false);
    }
  }, [thread.id]);

  const updateJumlahLike = (newCount) => {
    setJumlahLike(newCount);
  };

  const updateJumlahDislike = (newCount) => {
    setJumlahDislike(newCount);
  };

  const onVoteClickHandler = async (btn) => {
    try {
      if (!netral && sudahLike && !sudahDislike && btn === 'like') {
        dispatch(neutralVoteThread(thread.id, authUser));
        localStorage.setItem(`like-${thread.id}`, 'false');
        setNetral(true);
        setSudahLike(false);
        setSudahDislike(false);
        updateJumlahLike(jumlahLike - 1);
      } else if (!netral && !sudahLike && sudahDislike && btn === 'dislike') {
        dispatch(neutralVoteThread(thread.id, authUser));
        localStorage.setItem(`dislike-${thread.id}`, 'false');
        setNetral(true);
        setSudahLike(false);
        setSudahDislike(false);
        updateJumlahDislike(jumlahDislike - 1);
      } else if (netral && btn === 'like') {
        dispatch(upVoteThread(thread.id, authUser));
        localStorage.setItem(`like-${thread.id}`, 'true');
        setSudahLike(true);
        setSudahDislike(false);
        setNetral(false);
        updateJumlahLike(jumlahLike + 1);
      } else if (netral && btn === 'dislike') {
        dispatch(downVoteThread(thread.id, authUser));
        localStorage.setItem(`dislike-${thread.id}`, 'true');
        setSudahLike(false);
        setSudahDislike(true);
        setNetral(false);
        updateJumlahDislike(jumlahDislike + 1);
      } else if (!netral && sudahDislike && !sudahLike && btn === 'like') {
        dispatch(upVoteThread(thread.id, authUser));
        localStorage.setItem(`like-${thread.id}`, 'true');
        localStorage.setItem(`dislike-${thread.id}`, 'false');
        setSudahLike(true);
        setSudahDislike(false);
        setNetral(false);
        updateJumlahLike(jumlahLike + 1);
        updateJumlahDislike(jumlahDislike - 1);
      } else if (!netral && !sudahDislike && sudahLike && btn === 'dislike') {
        dispatch(downVoteThread(thread.id, authUser));
        localStorage.setItem(`like-${thread.id}`, 'false');
        localStorage.setItem(`dislike-${thread.id}`, 'true');
        setSudahLike(false);
        setSudahDislike(true);
        setNetral(false);
        updateJumlahLike(jumlahLike - 1);
        updateJumlahDislike(jumlahDislike + 1);
      }
    } catch (error) {
      console.error('Gagal memberikan like/dislike thread:', error);
    }
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div key={thread && thread.id} className="chat-item" {...props}>
      <div className="chat-item__user-photo">
        <img src={thread.owner.avatar} alt={thread.owner.name} />
      </div>
      <div className="chat-item__detail">
        <header>
          <div className="chat-item__user-info">
            <p className="chat-item__user-name">{thread.owner.name}</p>
          </div>
        </header>
        <article>
          <h2>{judul}</h2>
          <div dangerouslySetInnerHTML={{ __html: isi }} />
          <p>
            Kategori:
            {kategori}
          </p>
        </article>
        <div className="chat-item__likes">
          <div>
            <button type="button" aria-label="like" onClick={() => onVoteClickHandler('like')}>
              <FaThumbsUp style={{ color: sudahLike && !netral ? 'blue' : 'gray' }} />
              <span>{jumlahLike}</span>
            </button>
            {' '}
            <button type="button" aria-label="dislike" onClick={() => onVoteClickHandler('dislike')}>
              <FaThumbsDown style={{ color: sudahDislike && !netral ? 'blue' : 'gray' }} />
              <span>{jumlahDislike}</span>
            </button>
            <p className="chat-item__created-at">{teksTanggalDibuat}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

ThreadDetail.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string,
    upVotesBy: PropTypes.arrayOf(PropTypes.string),
    downVotesBy: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    category: PropTypes.string,
    owner: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
  }),
  authUser: PropTypes.string.isRequired,
};

ThreadDetail.defaultProps = {
  thread: {
    id: '',
    upVotesBy: [],
    downVotesBy: [],
    createdAt: '',
    title: '',
    body: '',
    category: '',
    owner: {
      name: '',
      avatar: '',
    },
  },
};

export default ThreadDetail;
