const noteForm = document.querySelector('.note-form');
const noteCards = document.querySelector('.note-cards');

let notes = [];

// Add note to notes array
function addNoteToNotesArray(note) {
  notes.push(note);
  saveNotesToLocalStorage();
  displayNotes();
}

// Save notes array to local storage
function saveNotesToLocalStorage() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Get notes array from local storage
function getNotesFromLocalStorage() {
  const storedNotes = localStorage.getItem('notes');
  if (storedNotes) {
    notes = JSON.parse(storedNotes);
  }
}

// Display notes in note cards
function displayNotes() {
  noteCards.innerHTML = '';
  for (let i = 0; i < notes.length; i++) {
    const noteCard = document.createElement('div');
    noteCard.classList.add('note-card');
    const noteTitle = document.createElement('h2');
    noteTitle.textContent = notes[i].title;
    const noteContent = document.createElement('p');
    noteContent.textContent = notes[i].content;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      deleteNoteFromNotesArray(i);
    });
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit');
    editButton.addEventListener('click', function() {
      editNoteInNotesArray(i);
    });
    noteCard.appendChild(noteTitle);
    noteCard.appendChild(noteContent);
    noteCard.appendChild(deleteButton);
    noteCard.appendChild(editButton);
    noteCards.appendChild(noteCard);
  }
}

// Delete note from notes array
function deleteNoteFromNotesArray(index) {
  notes.splice(index, 1);
  saveNotesToLocalStorage();
  displayNotes();
}

// Edit note in notes array
function editNoteInNotesArray(index) {
  const note = notes[index];
  const noteTitleInput = document.getElementById('note-title');
  const noteContentInput = document.getElementById('note-content');
  noteTitleInput.value = note.title;
  noteContentInput.value = note.content;
  noteForm.removeEventListener('submit', addNote);
  noteForm.addEventListener('submit', function(event) {
    event.preventDefault();
    note.title = noteTitleInput.value;
    note.content = noteContentInput.value;
    saveNotesToLocalStorage();
    displayNotes();
    noteTitleInput.value = '';
    noteContentInput.value = '';
    noteForm.removeEventListener('submit', editNote);
    noteForm.addEventListener('submit', addNote);
  });
}

// Add note to notes array on form submit
function addNote(event) {
  event.preventDefault();
  const noteTitleInput = document.getElementById('note-title');
  const noteContentInput = document.getElementById('note-content');
  const note = {
    title: noteTitleInput.value,
    content: noteContentInput.value
  };
  addNoteToNotesArray(note);
  noteTitleInput.value = '';
  noteContentInput.value = '';
}

// Add event listener to note form
noteForm.addEventListener('submit', addNote);

// Get notes from local storage and display on page load
getNotesFromLocalStorage();
displayNotes();
