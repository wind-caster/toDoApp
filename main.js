//TODO change the id system to a date base to provide truly unique ids, refactor de renderBoards and renderNotes to be truly independent from the createBoards and createNotes events
//TODO work a toggle function with the isVisible property of a board instance

console.log("Hello World! This app was created by Kvothe The Arcane as a pet project. The aim of this project was to practice and hone skills in web fundamental technologies such as HTML, CSS, and vanilla Javascript. No frameworks were used.");

class Board {

    static idCount = 0

    constructor(id, title, notes = [], completedNotes, theme = "cherryBlossomPink",isVisible, created, modified){
        const date = new Date();
        this.id = id !== undefined ? id : `board-${++Board.idCount}-${date.getFullYear()}${date.getMonth()}${date.getDay()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`, //string
        this.title  = title, //string
        this.notes = notes !== undefined ? notes : [], //array
        this.completedNotes = completedNotes !== undefined ? completedNotes : [], //array
        this.theme = theme !== undefined ? theme : "cherryBlossomPink",//object
        this.isVisible = isVisible !== undefined ? isVisible : false, //isVisible
        this.created = created !== undefined ? created : `${date.toLocaleDateString}-${date.toLocaleTimeString}`,//creation date,
        this.modified = modified !== undefined ? modified : `${date.toLocaleDateString}-${date.toLocaleTimeString}`//modified date
    }//boardConstructor

    getId(){
        return this.id;
    }//getId

    getTitle(){
        return this.title;
    }//getTitle

    setTitle(newTitle){
         this.title = newTitle;
         console.log(`Successfully set ${this.title} as ${this.id} new title`);
    }//setTitle

    createNote(id, text, isComplete, boardId, created, modified){
        const note = new Note(id, text, isComplete, boardId, created, modified);
        this.notes.push(note);
        console.log(`Successfully created ${note.getId()} at ${this.id}`);
        return note;    
    };//createNote()

    getNote(noteId){
        const noteIndex = this.notes.findIndex((item)=>item.id === noteId);
        return this.notes[noteIndex];
    }//getNote

    setNote(note){
        this.notes.push(note);
        console.log(`Successfully set ${note.getId()} in ${this.id}`);
    }//setNote

    deleteNote(noteId){
        const noteIndex = this.notes.findIndex((item)=>item.id === noteId);
        const removed = this.notes.splice(noteIndex, 1);
        console.log(`Successfully deleted: ${removed} from ${this.id}`);
    }//deleteNote

    getCompletedNote(completedNoteId){
        const completedNoteIndex = this.completedNotes.findIndex((item)=>item.id === completedNoteId);
        return this.completedNotes[completedNoteIndex];
    }//getCompletedNote

    setCompletedNote(completedNote){
        this.completedNotes.push(completedNote);
        console.log(`Successfully set ${completedNote.getId()} in ${this.id}`);
    }//setNote

    deleteCompletedNote(completedNoteId){
        const noteIndex = this.completedNotes.findIndex((item)=>item.id === completedNoteId);
        const removed = this.completedNotes.splice(noteIndex, 1);
        console.log(`Successfully deleted: ${removed} from ${this.id}`);
    }//deleteNote

    moveToComplete(noteId){
        let noteToComplete = this.getNote(noteId);
        noteToComplete.markAsComplete();
        this.deleteNote(noteId);
        this.setCompletedNote(noteToComplete);
    }

    moveToIncomplete(noteId){
        let noteToIncomplete = this.getCompletedNote(noteId);
        noteToIncomplete.markAsIncomplete();
        this.deleteCompletedNote(noteId);
        this.setNote(noteToIncomplete);
    }

    toggleIsVisible(){
        this.isVisible ? this.isVisible = false : this.isVisible =  true;
    }//toggleIsVisible


    setModified(){
        const date = new Date();
        this.modified = `${date.toLocaleDateString}-${date.toLocaleTimeString}`;
    }//setModified

}//Board

class Note {

    static noteIdCount = 0

    constructor(id, text = "Edit me...", isComplete = false, boardId, created, modified){
        const date = new Date();
        this.id = id !== undefined ? id : `note-${++Note.noteIdCount}-${date.getFullYear()}${date.getMonth()}${date.getDay()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`,
        this.text = text !== undefined ? text : "Edit me...",
        this.isComplete = isComplete !== undefined ? isComplete : false,
        this.boardId = boardId,
        this.created = created !== undefined ? created : `${date.toLocaleDateString}-${date.toLocaleTimeString}`,//creation date,
        this.modified = modified !== undefined ? modified : `${date.toLocaleDateString}-${date.toLocaleTimeString}`//modified date 
    }//noteConstructor

    getId(){
        return this.id;
    }

    updateText(text){
        this.text = text;
        this.setModified();
        console.log(`${this.id} text updated successfully`);
    }//updateText

    markAsComplete(){
        this.isComplete = true;
        console.log(`${this.id} isComplete!`)
    }//markAsComplete

    markAsIncomplete(){
        this.isComplete = false;
        console.log(`${this.id} isIncomplete!`);
    }//markAsIncomplete

    setModified(){
        const date = new Date();
        this.modified = `${date.toLocaleDateString}-${date.toLocaleTimeString}`;
    }//setModified

}//Note

const newBoardBtn = document.getElementById("new-board-btn");
const newBoardDialog = document.getElementById("new-board-dialog");
let boardsContainer = document.getElementById("boards-container")
const createBoardBtn = document.getElementById("create-board-btn");
const boardTitleInput = document.getElementById("board-title-input");
const clearDataBtn = document.getElementById("clear-data-btn");

let localStorageRetrievedData = []
let boardsContainerArr = [];
let boardsContainerModified = "";

const themes= [
    {name: "nyanza", borderColor: "EEFFDB", headerBackground: "EEFFDB", noteBoxShadow: "EEFFDB"},
    {name: "columbiaBlue", borderColor: "BFDBF7", headerBackground: "BFDBF7", noteBoxShadow: "BFDBF7"},
    {name: "timberWolf", borderColor: "CFD2CD", headerBackground: "CFD2CD", noteBoxShadow: "CFD2CD"},
    {name: "cherryBlossomPink", borderColor: "FBB7C0", headerBackground: "FBB7C0", noteBoxShadow: "FBB7C0"},
    {name: "palePurple", borderColor: "E8D7FF", headerBackground: "E8D7FF", noteBoxShadow: "E8D7FF"}
];

//getAndRenderLocalStorage
function retrieveAndRenderData() {
    if (localStorage.data) {
        const data = JSON.parse(localStorage.getItem("data"));
        localStorageRetrievedData = data;
        console.log(`Board Array data is: ${localStorageRetrievedData}`);
        localStorageRetrievedData.forEach((item)=>{
            const initObject = new Board(item.id, item.title, item.notes, item.completedNotes, item.theme, item.isVisible, item.created, item.modified);
            initObject.notes.forEach((note)=>{
                const initNote = new Note(note.id, note.text, note.isComplete, note.boardId, note.created, note.modified);
                initObject.notes.splice(initObject.notes.indexOf(note), 1, initNote);
            });//for each note
            initObject.completedNotes.forEach((note)=>{
                const initNote = new Note(note.id, note.text, note.isComplete, note.boardId, note.created, note.modified);
                initObject.completedNotes.splice(initObject.completedNotes.indexOf(note), 1, initNote);
            });//for each completed note
            boardsContainerArr.push(initObject);
        })//retrive data and initialize objects
        for(let i = 0; i < boardsContainerArr.length; i++){
            renderBoard(boardsContainerArr[i]);
            for (let j = 0; j < boardsContainerArr[i].notes.length; j++) {
                renderNote(boardsContainerArr[i].notes[j], document.getElementById(boardsContainerArr[i].id));
            }
            for (let j = 0; j < boardsContainerArr[i].completedNotes.length; j++) {
                renderNote(boardsContainerArr[i].completedNotes[j], document.getElementById(boardsContainerArr[i].id));
                const newCheckedNote = document.getElementById(boardsContainerArr[i].completedNotes[j].id);
                newCheckedNote.classList.add("checked-box");
                newCheckedNote.firstElementChild.firstElementChild.checked = "true";
                newCheckedNote.firstElementChild.nextElementSibling.removeAttribute("contenteditable");
            }
            autoShowOrHidde(document.getElementById(boardsContainerArr[i].id));
        }
    } else {
        console.log("Fresh start!")
    }
    
}//retrieveAndRenderData

function renderBoard(board) {
    const boardBluePrint = `
    <div id="${board.id}" class="board ${board.theme}-board">
        <nav class="board-header ${board.theme}-header">
                <button type="button" class="hide-or-show-notes-btn trans-btn" title="Show/hide notes" onclick="toggleNotesContainer(this.parentElement.parentElement)">
                    <svg class="toggle-btn-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                </button>
            <h3 contenteditable="true" oninput="editBoardTitle(this.parentElement.parentElement, this.textContent)">${board.title}</h3>
            <span class="board-btns">
                <button onclick="createNote(this.parentElement.parentElement.parentElement)" class="new-note-btn" title="New Note">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                    Note
                </button>
                <button class="board-delete-btn trans-btn" title="Delete board" onclick="deleteAndRemoveBoard(this.parentElement.parentElement.parentElement)">
                    <svg class="header-icons" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </button>
            </span>
        </nav>
        <div class="board-notes-container hidden">
            <div class="not-completed-notes"></div>
            <div class="completed-notes"></div>
        </div>
    </div>`;
    boardsContainer.insertAdjacentHTML("beforeend", boardBluePrint);
}

function updateLocalStorage() {
    localStorage.setItem("data", JSON.stringify(boardsContainerArr));
}//updateLocalStorage

function createBoard(title, theme){
    const newBoard = new Board(undefined,title, undefined, undefined, theme, undefined, undefined, undefined);
    boardsContainerArr.push(newBoard);
    updateLocalStorage();
    renderBoard(newBoard);
    console.log(`New board ${newBoard.id} created successfully`);
};//createBoard


function deleteAndRemoveBoard(boardEl){
    const board = boardEl;
    const removed = boardsContainerArr.splice(boardsContainerArr.indexOf(boardsContainerArr.find(({id})=>id === board.id)),1);
    board.remove();
    updateLocalStorage();//updates the local storage
    console.log(`Removed ${removed} from ${boardsContainerArr}`);
};//deleteBoard

function editBoardTitle(boardEl, newTitle){
    const board = boardsContainerArr.find((item)=>item.id === boardEl.id);
    board.setTitle(newTitle);
    updateLocalStorage();
}//editBoardTitle

function autoShowOrHidde(boardEl) {
    const board = boardsContainerArr.find((item)=>item.id === boardEl.id);
    if(board.notes.length > 0 || board.completedNotes.length > 0){
        boardEl.lastElementChild.classList.remove("hidden");
        boardEl.firstElementChild.firstElementChild.classList.contains("rotate") ? boardEl.firstElementChild.firstElementChild.classList.remove("rotate") : null;//hide-or-show-notes-btn functionality
        board.isVisible = true;
    } else {
        boardEl.lastElementChild.classList.add("hidden");
        board.isVisible = false;
    }
    updateLocalStorage();
}//

//toggleIsVisible
function toggleNotesContainer(boardEl){
    const board = boardsContainerArr.find((item)=>item.id == boardEl.id);
    if (board.notes.length > 0 || board.completedNotes.length > 0) {
        boardEl.firstElementChild.firstElementChild.classList.toggle("rotate");
        setTimeout(()=>{boardEl.lastElementChild.classList.toggle("hidden")}, 50);
        board.toggleIsVisible();
        console.log("Toggled!");
    } else{
        console.log("No notes on this board");
    }
    updateLocalStorage();
}//toggleNotesContainer

function createNote(boardEl) {
    const board = boardsContainerArr.find((item)=>item.id === boardEl.id);
    const note = board.createNote(undefined, undefined, undefined, board.id, undefined, undefined);
    renderNote(note, boardEl);
    autoShowOrHidde(boardEl);
    updateLocalStorage();
}//createNote

function renderNote(note, boardEl){
    const noteBluePrint = `
                            <div id="${note.id}" class="note-container">
                                <span class="checkbox-container">
                                    <input type="checkbox" title="Mark as complete" onchange="toggleAsChecked(this.parentElement.parentElement, this.parentElement.parentElement.parentElement.parentElement.parentElement)">
                                </span>
                                <span class="note-textbox" contenteditable="true" oninput="editNote(this.parentElement, this.textContent)">${note.text}</span>
                                <span class="delete-btn-container">
                                    <button class="delete-note-btn" title="Delete note" onclick="removeAndDeleteNote(this.parentElement.parentElement, this.parentElement.parentElement.parentElement.parentElement.parentElement)">
                                        <svg class="board-delete-btn-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16"  fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                                        </svg>
                                    </button>
                                </span>
                            </div>`;
    if(!note.isComplete){
        boardEl.lastElementChild.firstElementChild.insertAdjacentHTML("beforeend", noteBluePrint);
    }else{
        boardEl.lastElementChild.lastElementChild.insertAdjacentHTML("beforeend", noteBluePrint);
    }//ifelse
    
};//renderNote

function removeAndDeleteNote(noteEl, boardEl){
    const board = boardsContainerArr.find((item)=>item.id === boardEl.id);
    const note = board.getNote(noteEl.id) ? board.getNote(noteEl.id) : board.getCompletedNote(noteEl.id);
    if(note.isComplete){
        board.deleteCompletedNote(note.id)
    } else {
        board.deleteNote(note.id)
    }
    noteEl.remove();
    autoShowOrHidde(boardEl);
    updateLocalStorage();
}//removeNote

function editNote(noteEl, textBoxContent) {
    const board = boardsContainerArr.find((item)=> item.id === noteEl.parentElement.parentElement.parentElement.id);
    const note = board.getNote(noteEl.id) || board.getCompletedNote(noteEl.id);
    const text = textBoxContent;
    note.updateText(text);
    updateLocalStorage();
}//updateText

function toggleAsChecked(noteEl, boardEl) {
    const board = boardsContainerArr.find((item)=> item.id === boardEl.id);
    const note = board.getNote(noteEl.id) || board.getCompletedNote(noteEl.id);
    if (!note.isComplete) {        
        board.moveToComplete(note.id);
        noteEl.remove();
        renderNote(note, boardEl);
        const newCheckedNote = document.getElementById(note.id);
        newCheckedNote.classList.add("checked-box");
        newCheckedNote.firstElementChild.firstElementChild.checked = "true";
        newCheckedNote.firstElementChild.nextElementSibling.removeAttribute("contenteditable");
    } else{
        board.moveToIncomplete(note.id);
        noteEl.remove();
        renderNote(note, boardEl);
    }
    updateLocalStorage();
}//toggleAsChecked

function wipeContainerEl() {
    const toDoApp = document.getElementById("todo-app");
    document.getElementById("boards-container").remove();
    toDoApp.insertAdjacentHTML("beforeend", `<div id="boards-container"></div>`);
    boardsContainer = document.getElementById("boards-container");
}//wipeContainerEl

/*Event listeners*/
newBoardBtn.addEventListener("click", ()=>{
    boardTitleInput.value="";
    newBoardDialog.showModal();
});//shows board creation modal

createBoardBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    if(boardTitleInput.value){
        const selectedTheme = document.querySelector(".selected");
        createBoard(boardTitleInput.value, selectedTheme.dataset.value);
        newBoardDialog.close();
    } else alert("Enter a valid title")
});

window.addEventListener("load", retrieveAndRenderData);

clearDataBtn.addEventListener("click", ()=>{

    localStorage.clear();
    boardsContainerArr = [];
    localStorageRetrievedData = [];
    boardsContainerModified = "";
    wipeContainerEl();
});

//Define some themes 4 or 5 to begin (objects);
function pickTheme(element){
    const themePickers = document.querySelectorAll(".theme-picker")
    themePickers.forEach((div)=>{
        div.classList.remove("selected");
    });
    element.classList.add("selected");    
}
//Style the dialog (modal)