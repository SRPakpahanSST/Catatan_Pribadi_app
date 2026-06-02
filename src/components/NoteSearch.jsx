import React, { useState } from 'react';

function NoteSearch({ onSearch }) {
  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    onSearch(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();        // Mencegah submit form jika ada
      setKeyword('');            // Hapus teks di kotak pencarian
      onSearch('');              // Reset pencarian (tampilkan semua catatan)
    }
  };

  return (
    <div className="note-search" data-testid="note-search">
      <input
        type="text"
        className="note-search__input"
        placeholder="Cari catatan..."
        value={keyword}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        data-testid="note-search-input"
      />
    </div>
  );
}

export default NoteSearch;