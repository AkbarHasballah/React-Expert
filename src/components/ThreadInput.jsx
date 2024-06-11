import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/style.css';

function ThreadInput({ addTalk }) {
  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('');
  const [isi, setIsi] = useState('');

  function tambahkanThread() {
    if (judul.trim() && kategori.trim() && isi.trim()) {
      addTalk({ title: judul, body: isi, category: kategori });
      setJudul('');
      setKategori('');
      setIsi('');
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    if (name === 'judul') {
      setJudul(value);
    } else if (name === 'kategori') {
      setKategori(value);
    } else if (name === 'isi') {
      setIsi(value);
    }
  }

  return (
    <div className="thread-input">
      <input
        type="text"
        name="judul"
        placeholder="Judul"
        value={judul}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="kategori"
        placeholder="Kategori"
        value={kategori}
        onChange={handleInputChange}
      />
      <textarea
        name="isi"
        placeholder="Apa yang sedang Anda pikirkan?"
        value={isi}
        onChange={handleInputChange}
      />
      <button type="button" onClick={tambahkanThread}>Buat Thread</button>
    </div>
  );
}

ThreadInput.propTypes = {
  addTalk: PropTypes.func.isRequired,
};

export default ThreadInput;
