import { React, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/style.css';

function InputTalk({ addtalk }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  function handleaddtalk() {
    if (title.trim() && category.trim() && body.trim()) {
      addtalk({ title, body, category });
      setTitle('');
      setCategory('');
      setBody('');
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'category') {
      setCategory(value);
    } else if (name === 'isi') {
      setBody(value);
    }
  }

  return (
    <div className="input-komentar">
      <input
        type="text"
        name="title"
        placeholder="title"
        value={title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="category"
        placeholder="category"
        value={category}
        onChange={handleInputChange}
      />
      <textarea
        name="isi"
        placeholder="Apa yang Anda pikirkan?"
        value={body}
        onChange={handleInputChange}
      />
      <button type="button" onClick={handleaddtalk}>Kirim</button>
    </div>
  );
}

InputTalk.propTypes = {
  addtalk: PropTypes.func.isRequired,
};

export default InputTalk;
