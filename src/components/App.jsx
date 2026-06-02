import React from 'react';
import { getInitialData } from '../utils';
import NoteInput from './NoteInput';
import NotesList from './NotesList';
import NoteSearch from './NoteSearch';

class App extends React.Component {
  constructor(props) {
    super(props);

    // Cek localStorage terlebih dahulu
    const savedNotes = localStorage.getItem('notes');
    this.state = {
      notes: savedNotes ? JSON.parse(savedNotes) : getInitialData(),
      searchKeyword: '',
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  // Simpan ke localStorage setiap kali notes berubah
  componentDidUpdate(prevProps, prevState) {
    if (prevState.notes !== this.state.notes) {
      localStorage.setItem('notes', JSON.stringify(this.state.notes));
    }
  }

  onAddNoteHandler({ title, body }) {
    const newNote = {
      id: +new Date(),
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    };
    this.setState((prevState) => ({
      notes: [newNote, ...prevState.notes],
    }));
  }

  onDeleteHandler(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.filter((note) => note.id !== id),
    }));
  }

  onArchiveHandler(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      ),
    }));
  }

  onSearchHandler(keyword) {
    this.setState({ searchKeyword: keyword });
  }

  render() {
    const { notes, searchKeyword } = this.state;

    let filteredNotes = notes;
    if (searchKeyword.trim() !== '') {
      const lowerKeyword = searchKeyword.toLowerCase();
      filteredNotes = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(lowerKeyword) ||
          note.body.toLowerCase().includes(lowerKeyword)
      );
    }

    const sortByDateDesc = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
    const activeNotes = filteredNotes.filter((note) => !note.archived).sort(sortByDateDesc);
    const archivedNotes = filteredNotes.filter((note) => note.archived).sort(sortByDateDesc);

    return (
      <div className="note-app" data-testid="note-app">
        <div className="note-app__header" data-testid="note-app-header">
          <h1>Notes</h1>
          <NoteSearch onSearch={this.onSearchHandler} />
        </div>
        <div className="note-app__body" data-testid="note-app-body">
          <NoteInput addNote={this.onAddNoteHandler} />
          <section aria-labelledby="active-notes-title" data-testid="active-notes-section">
            <h2 id="active-notes-title">Catatan Aktif</h2>
            <NotesList
              notes={activeNotes}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
              dataTestId="active-notes-list"
              searchKeyword={searchKeyword}
              isArchivedSection={false}
            />
          </section>
          <section aria-labelledby="archived-notes-title" data-testid="archived-notes-section">
            <h2 id="archived-notes-title">Arsip</h2>
            <NotesList
              notes={archivedNotes}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
              dataTestId="archived-notes-list"
              searchKeyword={searchKeyword}
              isArchivedSection={true}
            />
          </section>
        </div>
      </div>
    );
  }
}

export default App;