import React, { useRef, useCallback } from 'react';

function NoteSearch({ onSearch }) {
  const inputRef = useRef(null);

  const handleChange = useCallback(() => {
    const value = inputRef.current.value;
    onSearch(value);
  }, [onSearch]);

  return (
    <div className="note-search" data-testid="note-search">
      <input
        type="text"
        className="note-search__input"
        placeholder="Cari catatan..."
        ref={inputRef}
        onChange={handleChange}
        data-testid="note-search-input"
      />
    </div>
  );
}

export default NoteSearch;