const title = document.getElementById("title");
const inputNotes = document.getElementById("notes");
const btn = document.getElementById("btn");
const notesContainer = document.getElementById("notes-container");
const delNotesContainer = document.querySelector("#deleted__notes-container");
const archiveNotesContainer = document.querySelector(
  "#archived__notes-container"
);

// console.log(delNotesContainer);

// let allNotes = [];
// localStorage.setItem("notes", JSON.stringify(allNotes));

btn.addEventListener("click", function () {
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notes = [];
  } else {
    notes = JSON.parse(notes);
  }

  if (inputNotes.value == "") {
    alert("Empty");
    return;
  }
  notes.push({ title: title.value, notes: inputNotes.value });
  title.value = "";
  inputNotes.value = "";
  notesContainer.innerHTML = ``;
  localStorage.setItem("notes", JSON.stringify(notes));
  addInContainer();
});

const addInContainer = function () {
  let ele = ``;
  let allNotes = localStorage.getItem("notes");
  if (allNotes === null) return;
  allNotes = JSON.parse(allNotes);
  allNotes.forEach((val, idx) => {
    ele += `
      <div class = "item">
      <h1><span class="notes__title">Title:</span>${val.title}</h1>
      <h2>${val.notes}</h2>
      <button id= ${idx} class="btn delete--btn" onClick="deleteNotes(id)">Remove Notes</button>
      <button id= ${idx} class="btn archive--btn" onClick="archiveNotes(id)">Archive Notes</button>
      </div>
      `;
  });
  notesContainer.insertAdjacentHTML("afterbegin", ele);
};
addInContainer();

function deleteNotes(id) {
  console.log(id);
  let allNotes = localStorage.getItem("notes");
  allNotes = JSON.parse(allNotes);

  let delNotes = localStorage.getItem("deletedNotes");

  if (delNotes === null) {
    delNotes = [];
  } else {
    delNotes = JSON.parse(delNotes);
  }

  delNotes.push(allNotes[id]);
  localStorage.setItem("deletedNotes", JSON.stringify(delNotes));
  displayDeleteNotes.innerHTML = ``;
  displayDeleteNotes();

  let newNote = allNotes.filter((ele, idx) => id != idx);
  localStorage.setItem("notes", JSON.stringify(newNote));
  notesContainer.innerHTML = ``;
  addInContainer();
}

function archiveNotes(id) {
  let allArchived = localStorage.getItem("archiveNotes");
  let allNotes = localStorage.getItem("notes");
  allNotes = JSON.parse(allNotes);

  if (allArchived === null) {
    allArchived = [];
  } else {
    allArchived = JSON.parse(allArchived);
  }

  let newNote = allNotes.filter((ele, idx) => id != idx);
  localStorage.setItem("notes", JSON.stringify(newNote));
  notesContainer.innerHTML = ``;
  addInContainer();

  allArchived.push(allNotes[id]);
  localStorage.setItem("archiveNotes", JSON.stringify(allArchived));
  archiveNotesContainer.innerHTML = ``;
  displayArchive();
}

function displayDeleteNotes() {
  let allDeletedNotes = localStorage.getItem("deletedNotes");
  if (allDeletedNotes === null) return;
  else {
    allDeletedNotes = JSON.parse(allDeletedNotes);

    let ele = "";
    allDeletedNotes.forEach((val, idx) => {
      ele += `
        <div class = "deleted__notes">
        <h1><span class="notes__title">Title:</span>${val.title}</h1>
        <h2>${val.notes}</h2>
        <button id= ${idx} class="btn unarchive" onClick="handleUndoDelete(id)">Undo</button>
    
        </div>
        `;
    });
    delNotesContainer.innerHTML = ele;
  }
}
displayDeleteNotes();

function displayArchive() {
  let allArchivedNotes = localStorage.getItem("archiveNotes");
  if (allArchivedNotes === null) return;
  else {
    allArchivedNotes = JSON.parse(allArchivedNotes);

    let ele = "";
    allArchivedNotes.forEach((val, idx) => {
      ele += `
        <div class = "archive__notes">
        <h1><span class="notes__title">Title:</span>${val.title}</h1>
        <h2>${val.notes}</h2>
        <button id= ${idx} class="btn unarchive" onClick="handleUnarchive(id)">UnArchive</button>
        </div>
        `;
    });
    archiveNotesContainer.innerHTML = ``;
    archiveNotesContainer.innerHTML = ele;
  }
}

displayArchive();

function handleUnarchive(id) {
  console.log(id);
  let allArchivedNotes = localStorage.getItem("archiveNotes");
  let allNotes = localStorage.getItem("notes");
  if (allNotes === null || allArchivedNotes === null) return;
  allArchivedNotes = JSON.parse(allArchivedNotes);
  allNotes = JSON.parse(allNotes);
  allNotes.push(allArchivedNotes[id]);
  localStorage.setItem("notes", JSON.stringify(allNotes));
  notesContainer.innerHTML = ``;
  addInContainer();
  archiveNotesContainer.innerHTML = "";
  let newArchive = allArchivedNotes.filter((ele, idx) => id != idx);
  localStorage.setItem("archiveNotes", JSON.stringify(newArchive));
  displayArchive();
}

function handleUndoDelete(id) {
  let allDeletedNotes = localStorage.getItem("deletedNotes");
  let allNotes = localStorage.getItem("notes");
  if (allNotes === null || allDeletedNotes === null) return;
  allDeletedNotes = JSON.parse(allDeletedNotes);
  allNotes = JSON.parse(allNotes);
  allNotes.push(allDeletedNotes[id]);
  localStorage.setItem("notes", JSON.stringify(allNotes));
  notesContainer.innerHTML = ``;
  addInContainer();
  delNotesContainer.innerHTML = "";
  let newDeleted = allDeletedNotes.filter((ele, idx) => id != idx);
  localStorage.setItem("deletedNotes", JSON.stringify(newDeleted));
  displayDeleteNotes();
}
