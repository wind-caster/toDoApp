//TODO change the id system to a date base to provide truly unique ids, refactor de renderBoards and renderNotes to be truly independent from the createBoards and createNotes events
//TODO work a toggle function with the btnIsOpen property of a board instance

console.log("Hello World! This app was created by Kvothe The Arcane as a pet project. The aim of this project was to practice and hone skills in web fundamental technologies such as HTML, CSS, and vanilla Javascript. No frameworks were used.");

class Board {

    static idCount = 0

    constructor(id, title, notes = [], theme = "pink", ){
        const date = new Date();
        this.id = id !== undefined ? id : `board-${++Board.idCount}-${date.getFullYear()}${date.getMonth()}${date.getDay()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`, //string
        this.title  = title, //string
        this.notes = notes !== undefined ? notes : [], //array
        this.theme = theme !== undefined ? theme : "pink",//object
        this.btnIsOpen = false
    }//boardConstructor

    setNewTitle(newTitle){
         this.title = newTitle;
    }

    getNote(noteId){
        const noteIndex = this.notes.findIndex((item)=>item.id === noteId);
        return this.notes[noteIndex];
    }//getNote

    setNote(note){
        this.notes.push(note);
    }//setNote

    deleteNote(noteId){
        const noteIndex = this.notes.findIndex((item)=>item.id === noteId);
        const removed = this.notes.splice(noteIndex, 1);
        return console.log(`Successfully deleted: ${removed}`);
    }//deleteNote

    dragNoteToEndOfArray(noteId){
        const noteIndex = this.notes.findIndex((item)=>item.id === noteId);
        const removedArr = this.notes.splice(noteIndex, 1);
        const removed = removedArr[0];
        this.notes.push(removed);
        console.log(`${noteId} was succesfully dragged!`);
    }//dragNoteToEnOfArray

}//Board

class Note {

    static noteIdCount = 0

    constructor(id, text = "Edit me...", isComplete = false, boardId){
        const date = new Date();
        this.id = id !== undefined ? id : `note-${++Note.noteIdCount}-${date.getFullYear()}${date.getMonth()}${date.getDay()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`,
        this.text = text !== undefined ? text : "Edit me...",
        this.isComplete = isComplete !== undefined ? isComplete : false,
        this.boardId = boardId
    }//noteConstructor

    editNoteTextContent(textBoxValue){
        this.text = textBoxValue;
        return console.log(`${this.id} text edited successfully`);
    }//editNoteTextContent

    markAsComplete(){
        this.isComplete = true;
        return console.log(`${this.id} isComplete!`)
    }//markAsComplete

}//Note

let localStorageRetrievedData = []
let boardsContainerArr = [];
const newBoardBtn = document.getElementById("new-board-btn");
const newBoardDialog = document.getElementById("new-board-dialog");
const boardsContainer = document.getElementById("boards-container")
const createBoardBtn = document.getElementById("create-board-btn");
const boardTitleInput = document.getElementById("board-title-input");

function retrieveAndRenderData() {
    if (localStorage.getItem("data") !== null ) {
        const data = JSON.parse(localStorage.getItem("data"));
        console.log(data);
        localStorageRetrievedData = [...data];
        console.log(`Board Array data is: ${localStorageRetrievedData}`);
        let tempDataArr = []
        for (const board of localStorageRetrievedData){
            const persistantBoard = new Board(board.id, board.title, [], board.theme);
            renderBoard(persistantBoard.id, persistantBoard.title);
            for (let i = 0; i < board.notes.length; i++) {
                const note = board.notes[i];
                const persistantNote  = new Note(note.id, note.text, note.isComplete, note.boardId);
                renderNote(persistantNote.id, persistantNote.text, persistantNote.boardId);
                persistantBoard.notes.push(persistantNote);
                persistantNote.isComplete === true ? formatAsComplete(note.id): null;
                console.log(`Note ${persistantNote.id} rendered into ${persistantNote.boardId}`); 
              }// for note in board.notes  
            tempDataArr.push(persistantBoard);
            console.log("Board rendered successfully!");
            toggleBtnOpen(board.id);
        }//for board in boardsContainerArr
        boardsContainerArr = [...tempDataArr];
    }// if data exists in the local storage
    
}

function formatAsComplete(noteId) {
    const newCheckedNote = document.getElementById(noteId);
    newCheckedNote.classList.toggle("checked-box");
    newCheckedNote.firstElementChild.firstElementChild.checked = "true";
    newCheckedNote.firstElementChild.nextElementSibling.removeAttribute("contenteditable");
}

function renderBoard(boardId, boardTitle) {
    const boardBluePrint = `
    <div id="${boardId}" class="board">
        <nav class="board-header">
                <button type="button" class="hide-or-show-notes-btn trans-btn" title="Show/hide notes" onclick="toggleNotesContainer(this)">
                    <svg class="toggle-btn-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                </button>
            <h3 contenteditable="true" oninput="editBoardTitle(this.parentElement.parentElement.id, this.textContent)">${boardTitle}</h3>
            <span class="board-btns">
                <button onclick="createNewNote(this.parentElement.parentElement.parentElement)" class="new-note-btn" title="New Note">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                    Note
                </button>
                <button class="board-delete-btn trans-btn" title="Delete board" onclick="deleteBoard(this.parentElement.parentElement.parentElement)">
                    <svg class="header-icons" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </button>
            </span>
        </nav>
        <div class="board-notes-container hidden">
        </div>
    </div>`;
    boardsContainer.insertAdjacentHTML("beforeend", boardBluePrint);
}

function updateLocalStorage() {
    localStorage.setItem("data", JSON.stringify(boardsContainerArr));
}

/*Board functions (create, delete, editTitle)*/
function createNewBoard(){
    const newBoard = new Board(undefined,boardTitleInput.value, undefined, undefined);
    boardsContainerArr.push(newBoard);
    updateLocalStorage();
    renderBoard(newBoard.id, newBoard.title);
    console.log(`New board ${newBoard.id} created successfully`);
};//createNewBoard

function deleteBoard(boardEl){
    const board = boardEl;
    const removed = boardsContainerArr.splice(boardsContainerArr.indexOf(boardsContainerArr.find(({id})=>id === board.id)),1);
    updateLocalStorage();//updates the local storage
    board.remove();
    return console.log(`Removed ${removed} from ${boardsContainerArr}`);
};//deleteBoard

function editBoardTitle(boardId, newTitle){
    console.log("editBoardTitle event triggered!");
    console.log(`The board id is: ${boardId}, its data type is: ${typeof(boardId)}`);
    const boardIndex = boardsContainerArr.findIndex((object)=>object.id == boardId);
    console.log(boardIndex);
    boardsContainerArr[boardIndex].setNewTitle(newTitle);
    updateLocalStorage();
    console.log(`New title is: ${boardsContainerArr[boardIndex].title}`);
}//editBoardTitle

//Render functions

function renderNote(noteId, noteText, boardId){
    const noteBluePrint = `
                            <div id="${noteId}" class="note-container">
                                <span class="checkbox-container">
                                    <input type="checkbox" title="Mark as complete" onchange="markAsChecked(this.parentElement.parentElement)">
                                </span>
                                <span class="note-textbox" contenteditable="true" oninput="editNote(this.parentElement, this.textContent)">${noteText}</span>
                                <span class="delete-btn-container">
                                    <button class="delete-note-btn" title="Delete note" onclick="removeNote(this.parentElement.parentElement.parentElement.parentElement, this.parentElement.parentElement)">
                                        <svg class="board-delete-btn-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16"  fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                                        </svg>
                                    </button>
                                </span>
                            </div>`;
    const board = document.getElementById(boardId);
    board.lastElementChild.insertAdjacentHTML("beforeend", noteBluePrint);
};

function toggleBtnOpen(boardId) {
    const board = document.getElementById(boardId);
    board.lastElementChild.classList.remove("hidden");
    board.firstElementChild.firstElementChild.firstElementChild.classList.contains("rotate") ? board.firstElementChild.firstElementChild.firstElementChild.classList.remove("rotate") : null;//hide-or-show-notes-btn functionality
}

//Note functions (create, delete, edit)

const createNewNote = (boardEl) => {
    const board = boardEl;
    const note = new Note(undefined, undefined, undefined, board.id);
    toggleBtnOpen(board.id);
    //board.lastElementChild.classList.remove("hidden");
    //board.firstElementChild.firstElementChild.firstElementChild.classList.contains("rotate") ? board.firstElementChild.firstElementChild.firstElementChild.classList.remove("rotate") : null;//hide-or-show-notes-btn functionality
    renderNote(note.id, note.text, board.id)
    const boardInstance = boardsContainerArr.find(({id})=> id === board.id);
    boardInstance.setNote(note);
    updateLocalStorage();
    return console.log(`New note: ${note.id} created and stored in: ${boardInstance.notes}`);
};//createNewNote()

function removeNote(boardEl, noteEl) {
    const boardId = boardEl.id.trim();
    const noteId = noteEl.id.trim();
    const board = boardsContainerArr.find((item)=>item.id === boardId);
    board.deleteNote(noteId);
    (board.notes.length === 0) ? noteEl.parentElement.classList.add("hidden") : null;
    updateLocalStorage();
    noteEl.remove();
}//removeNote

function editNote(noteEl, textBoxContent) {
    const board = boardsContainerArr.find((item)=> item.id === noteEl.parentElement.parentElement.id);
    const note = board.getNote(noteEl.id);
    const text = textBoxContent;
    note.editNoteTextContent(text);
    updateLocalStorage();
}//editNote

const toggleNotesContainer = (boardEl)=>{
    const boardId =  boardEl.parentElement.parentElement.id;
    const board = boardsContainerArr.find(({id})=>id == boardId);
    if (board.notes.length > 0) {
        boardEl.firstElementChild.classList.toggle("rotate");
        setTimeout(()=>{boardEl.parentElement.parentElement.lastElementChild.classList.toggle("hidden")}, 50);
        console.log("Toggled!");
    } else{
        console.log("No notes on this board");
    }
}//toggleNotesContainer

function markAsChecked(noteEl) {
    const board = boardsContainerArr.find((item)=> item.id === noteEl.parentElement.parentElement.id);
    const noteId = noteEl.id;
    const note = board.notes.find((item)=> item.id === noteId);
    note.markAsComplete();
    board.dragNoteToEndOfArray(noteId);
    noteEl.remove();
    renderNote(noteId, note.text, board.id);
    const newCheckedNote = document.getElementById(noteId);
    newCheckedNote.classList.toggle("checked-box");
    newCheckedNote.firstElementChild.firstElementChild.checked = "true";
    newCheckedNote.firstElementChild.nextElementSibling.removeAttribute("contenteditable");
    updateLocalStorage();
}//markAsChecked

/*Event listeners*/

newBoardBtn.addEventListener("click", ()=>{
    boardTitleInput.value="";
    newBoardDialog.showModal();
});//shows board creation modal

createBoardBtn.addEventListener("click", createNewBoard);

window.addEventListener("load", retrieveAndRenderData);

//Define some themes 4 or 5 to begin (objects);
//Style the dialog (modal) and include the option to choose color
//Create a reset button for when you want to clear the local storage;

//Refactorizar el codigo para arreglar el problema de inicializar los objetos con la data obtenida del local storage jaja