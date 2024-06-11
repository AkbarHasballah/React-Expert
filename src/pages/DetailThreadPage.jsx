import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { formatDistanceToNow, isValid } from 'date-fns';
import {
  asyncCreateComment, asyncUpvoteComment, asyncDownvoteComment, asyncReceiveThreadDetail,
} from '../states/threadDetail/action';
import ThreadDetail from '../components/ThreadDetail';
import '../styles/DetailPage.css';

function DetailThreadPage() {
  const { id } = useParams();
  const { detailThread, authUser } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(true);
  const [likedComments, setLikedComments] = useState([]);
  const [dislikedComments, setDislikedComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCreateComment = (content) => {
    dispatch(asyncCreateComment(id, content)).then(() => {
      dispatch(asyncReceiveThreadDetail(id));
    });
  };

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  useEffect(() => {
    const likedCommentsStorage = JSON.parse(localStorage.getItem('likedComments')) || [];
    const dislikedCommentsStorage = JSON.parse(localStorage.getItem('dislikedComments')) || [];
    setLikedComments(likedCommentsStorage);
    setDislikedComments(dislikedCommentsStorage);
  }, []);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleUpvote = (commentId) => {
    const updatedLikedComments = [...likedComments];
    const updatedDislikedComments = [...dislikedComments];

    if (likedComments.includes(commentId)) {
      updatedLikedComments.splice(updatedLikedComments.indexOf(commentId), 1);
    } else {
      updatedLikedComments.push(commentId);
      updatedDislikedComments.splice(updatedDislikedComments.indexOf(commentId), 1);
    }

    setLikedComments(updatedLikedComments);
    setDislikedComments(updatedDislikedComments);

    localStorage.setItem('likedComments', JSON.stringify(updatedLikedComments));
    localStorage.setItem('dislikedComments', JSON.stringify(updatedDislikedComments));

    dispatch(asyncUpvoteComment(id, commentId)).then(() => {
      dispatch(asyncReceiveThreadDetail(id));
    });
  };

  const handleDownvote = (commentId) => {
    const updatedDislikedComments = [...dislikedComments];
    const updatedLikedComments = [...likedComments];

    if (dislikedComments.includes(commentId)) {
      updatedDislikedComments.splice(updatedDislikedComments.indexOf(commentId), 1);
    } else {
      updatedDislikedComments.push(commentId);
      updatedLikedComments.splice(updatedLikedComments.indexOf(commentId), 1);
    }

    setDislikedComments(updatedDislikedComments);
    setLikedComments(updatedLikedComments);

    localStorage.setItem('dislikedComments', JSON.stringify(updatedDislikedComments));
    localStorage.setItem('likedComments', JSON.stringify(updatedLikedComments));

    dispatch(asyncDownvoteComment(id, commentId)).then(() => {
      dispatch(asyncReceiveThreadDetail(id));
    });
  };

  const sortedComments = detailThread
    ? [...detailThread.comments].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    : [];

  const formatTimeDistance = (date) => {
    if (!isValid(new Date(date))) {
      return 'Invalid Date';
    }
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;
    await handleCreateComment(newComment);
    setNewComment('');
  };

  return (
    <section className="detail-page">
      {detailThread && (
        <>
          <div className="detail-page__parent">
            <h3>Replying To</h3>
            <ThreadDetail thread={{ ...detailThread, comments: [] }} authUser={authUser.name} />
            <form onSubmit={handleSubmit} className="comment-form">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target?.value)}
                placeholder="Write your comment..."
              />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="detail-page__comments">
            <button
              type="button"
              onClick={toggleComments}
            >
              {showComments ? 'Hide Comments' : 'Show Comments'}
            </button>
            {showComments && (
              <div className="detail-page__comments-list">
                {sortedComments.map((comment, index) => (
                  <div key={comment?.id || index} className="comment-item">
                    <div className="comment-avatar">
                      <img src={comment?.owner.avatar} alt="Avatar" />
                    </div>
                    <div className="comment-content">
                      <p className="owner-name">{comment?.owner?.name}</p>
                      <div dangerouslySetInnerHTML={{ __html: comment?.content }} />
                      <div className="comment-actions">
                        <button
                          type="button"
                          onClick={() => handleUpvote(comment?.id)}
                          style={{ color: likedComments.includes(comment?.id) ? 'blue' : 'black' }}
                        >
                          <FaThumbsUp />
                          {comment?.upVotesBy?.length}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDownvote(comment?.id)}
                          style={{ color: dislikedComments?.includes(comment?.id) ? 'blue' : 'black' }}
                        >
                          <FaThumbsDown />
                          {' '}
                          {comment?.downVotesBy?.length}
                        </button>
                        <p className="time">{formatTimeDistance(comment?.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default DetailThreadPage;
