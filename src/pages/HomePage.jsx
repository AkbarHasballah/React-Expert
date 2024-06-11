import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TalkInput from '../components/ThreadInput';
import TalksList from '../components/ThreadList';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncAddThread } from '../states/threads/action';
import '../styles/Beranda.css';

const selectTalks = (state) => state.talks;
const selectUsers = (state) => state.users;
const selectAuthUser = (state) => state.authUser;

function HomePage() {
  const talks = useSelector(selectTalks);
  const users = useSelector(selectUsers);
  const authUser = useSelector(selectAuthUser);

  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  useEffect(() => {
    const uniqueCategories = [...new Set(talks.map((talk) => talk.category))];
    setCategories(uniqueCategories);
  }, [talks]);

  const onAddTalk = (text) => {
    dispatch(
      asyncAddThread({
        body: text.body,
        category: text.category,
        title: text.title,
      }),
    );
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory((prevCategory) => (prevCategory === category ? '' : category));
  };

  const talkList = talks
    .filter((talk) => !selectedCategory || talk.category === selectedCategory)
    .map((talk) => ({
      ...talk,
      user: users.find((user) => user.id === talk.user),
      authUser: authUser.id,
    }));

  return (
    <section className="home-page">
      <TalkInput addTalk={onAddTalk} />
      <div className="category-buttons">
        {categories.map((category) => (
          // eslint-disable-next-line react/button-has-type
          <button key={category} onClick={() => handleCategoryClick(category)}>
            {category}
          </button>
        ))}
      </div>
      <TalksList body={talkList} authUser={authUser} />
    </section>
  );
}

export default HomePage;
