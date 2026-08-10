/*
  17. Mini Projects
  Notes App (create, edit, delete, with localStorage persistence)

  ASSUMED HTML:
    <button id="newNoteBtn">+ New Note</button>
    <div id="notesGrid"></div>

  CORE IDEA: each note is an object { id, title, content }, stored in
  an array that's saved to localStorage. Same "single source of truth,
  re-render on every change" pattern as the Todo App.
*/

const newNoteBtn = document.getElementById("newNoteBtn");
const notesGrid = document.getElementById("notesGrid");

const STORAGE_KEY = "notes";

function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

let notes = loadNotes();

// Generate a simple unique ID (good enough for a small app - for a
// real production app you'd likely use crypto.randomUUID() instead).
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function render() {
  notesGrid.innerHTML = "";

  notes.forEach((note) => {
    const card = document.createElement("div");
    card.className = "note-card";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = note.title;
    titleInput.placeholder = "Title";
    // "input" fires on every keystroke - we save as the user types.
    titleInput.addEventListener("input", (e) => {
      updateNote(note.id, { title: e.target.value });
    });

    const contentArea = document.createElement("textarea");
    contentArea.value = note.content;
    contentArea.placeholder = "Write your note...";
    contentArea.addEventListener("input", (e) => {
      updateNote(note.id, { content: e.target.value });
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    card.appendChild(titleInput);
    card.appendChild(contentArea);
    card.appendChild(deleteBtn);
    notesGrid.appendChild(card);
  });
}

function createNote() {
  const newNote = { id: generateId(), title: "", content: "" };
  notes.unshift(newNote); // add to the FRONT so new notes appear first
  saveNotes(notes);
  render();
}

function updateNote(id, changes) {
  // Find the note by id and merge in the changed fields (title and/or
  // content), leaving everything else untouched.
  const note = notes.find((n) => n.id === id);
  if (note) {
    Object.assign(note, changes);
    saveNotes(notes);
    // NOTE: we deliberately do NOT call render() here - re-rendering
    // on every keystroke would rebuild the <input>/<textarea>
    // elements and cause the user's cursor position to jump around.
    // We just save quietly; the DOM already reflects what was typed.
  }
}

function deleteNote(id) {
  notes = notes.filter((n) => n.id !== id);
  saveNotes(notes);
  render(); // safe to re-render here - deleting genuinely changes the list
}

newNoteBtn.addEventListener("click", createNote);

render(); // show saved notes from a previous session on page load

/*
  IMPORTANT DESIGN DECISION worth mentioning in an interview: notice
  updateNote() does NOT call render(). If it did, every single
  keystroke would wipe and rebuild the <textarea>, which would make
  the user's typing cursor jump back to the start each time - a
  common, subtle bug. We only re-render for STRUCTURAL changes
  (creating or deleting a note), not for in-place edits.
*/
