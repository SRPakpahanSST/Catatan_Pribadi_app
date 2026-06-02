import React, { useState, useCallback } from 'react';

function NoteSearch({ onSearch }) {
  const [keyword, setKeyword] = useState('');

  // Handler stabil menggunakan useCallback
  const handleChange = useCallback((e) => {
    const value = e.target.value;
    setKeyword(value);
    onSearch(value);
  }, [onSearch]); // akan berubah hanya jika onSearch berubah (stabil karena dari App sudah dibinding)

  return (
    <div className="note-search" data-testid="note-search">
      <input
        type="text"
        className="note-search__input"
        placeholder="Cari catatan..."
        value={keyword}
        onChange={handleChange}
        data-testid="note-search-input"
      />
    </div>
  );
}

export default NoteSearch;