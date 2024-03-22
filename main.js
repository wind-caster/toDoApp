console.log("Hello World! This app was created by Kvothe The Arcane as a pet project. The aim of this project was to practice and hone skills in web fundamental techonolgies such as HTML, CSS, and vanilla Javascript. No frameworks were used.");

class Board {

    static idCount = 0

    constructor(title){
        this.id = ++Board.idCount,
        this.title  = title,
        this.notes = [],
        this.theme = {
            id: 1,
            name: "default",
            headerColor: "pink",
            borderColor: "pink",
            checkboxColor: "pink",
            noteHighlightColor: "pink"
        },
        this.htmlComp = `
                        <div id="${this.id} "class="board">
                            <nav class="board-header">
                                    <button type="button" class="hide-or-show-notes-btn trans-btn" title="Show/hide notes" onclick="toggleNotesContainer(this)">
                                        <svg class="toggle-btn-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                        </svg>
                                    </button>
                                <h4 contenteditable="true">${this.title}</h4>
                                <span class="board-btns">
                                    <button onclick="renderNewNote(this.parentElement.parentElement.parentElement)" class="new-note-btn" title="New Note">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                        </svg>
                                        Note
                                    </button>
                                    <button class="board-delete-btn trans-btn" title="Delete board" onclick="deleteBoard(this)">
                                        <svg class="header-icons" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                        </svg>
                                    </button>
                                </span>
                            </nav>
                            <div class="board-notes-container hidden">
                            </div>
                        </div>`
    }//dashboardConstructor

    /* createNewNote(this){


    }//createNewNote

    delete(){

    }//deleteDashboard */



}//Board

class Note {

    static noteIdCount = 0

    constructor(boardId){
        this.id = `note-${++Note.noteIdCount}`,
        this.text = "Edit me...",
        this.isComplete = false,
        this.boardId = boardId,
        this.htmlComp = `
                            <div id="${this.id}" class="note-container">
                                <span class="checkbox-container">
                                    <input type="checkbox" title="Mark as complete" onchange="markAsChecked(this.parentElement.nextElementSibling)">
                                </span>
                                <span class="note-textbox" contenteditable="true" oninput="editNote(this)">${this.text}</span>
                                <span class="delete-btn-container">
                                    <button class="delete-note-btn" title="Delete note" onclick="deleteNote(this)">
                                        <svg class="board-delete-btn-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16"  fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                                        </svg>
                                    </button>
                                </span>
                            </div>`
    }//noteConstructor

    editNoteTextContent(textBoxValue){
        this.text = textBoxValue;
    }
    /* markAsComplete(){

    }//markAsComplete

    delete(){

    }//deleteNote */

}//Note

const boardsContainerArr = [];

const newBoardBtn = document.getElementById("new-board-btn");
const newBoardDialog = document.getElementById("new-board-dialog");
const boardsContainer = document.getElementById("boards-container")
const createBoardBtn = document.getElementById("create-board-btn");
const boardTitleInput = document.getElementById("board-title-input");
const noteTextBoxes = document.querySelectorAll(".note-textbox");


//TODO Create a function that renders a new Board into the screen when a click newDashboardBtn event is triggered
const renderNewBoard = () => {
    const board = new Board(boardTitleInput.value);
    const boardBluePrint = board.htmlComp;
    boardsContainer.insertAdjacentHTML("beforeend", boardBluePrint);
    boardsContainerArr.push(board);
};

const renderNewNote = (boardEl) => {
    const board = boardEl;
    const note = new Note(board.id);
    board.lastElementChild.classList.remove("hidden");
    if(board.firstElementChild.firstElementChild.firstElementChild.classList.contains("rotate")){
        board.firstElementChild.firstElementChild.firstElementChild.classList.remove("rotate")
    }
    board.lastElementChild.insertAdjacentHTML("beforeend", note.htmlComp);
    const boardInstance = boardsContainerArr.find(({id})=> id == board.id);
    if (boardInstance) {
        boardInstance.notes.push(note);
    }
    //Modify the corresponding board instance to be able to hold this note in its notes property array.
};

function deleteBoard(boardEl){
    const board = boardEl.parentElement.parentElement.parentElement 
    const boardExistsInArr = Boolean(boardsContainerArr.find(({id})=>id == board.id)); 
    if(boardExistsInArr){
        boardsContainerArr.splice(
            boardsContainerArr.indexOf(boardsContainerArr.find(({id})=>id == board.id)
            ),
        1);
    }//deletes the board object from the boardContainerArray if it exists

    board.remove();
};//deleteBoard

function deleteNote(noteEl) {
    const noteBoardId = noteEl.parentElement.parentElement.parentElement.parentElement.id;
    const boardObjectIndex = boardsContainerArr.indexOf(boardsContainerArr.find(({id})=>id == noteBoardId));
    const notesArr = boardsContainerArr[boardObjectIndex].notes;
    const noteId =  noteEl.parentElement.parentElement.id;
    const note = notesArr.find((item)=>item.id == noteId)
    if(note){
        notesArr.splice(notesArr.indexOf(note), 1)
        console.log("Note deleted succesfully!");
    }
    if (notesArr.length === 0) {
        noteEl.parentElement.parentElement.parentElement.classList.add("hidden");
    }
    noteEl.parentElement.parentElement.remove()
}

function editNote(textBox) {
    const noteBoardId = textBox.parentElement.parentElement.parentElement.id;
    const boardObjectIndex = boardsContainerArr.indexOf(boardsContainerArr.find(({id})=>id == noteBoardId));
    const notesArr = boardsContainerArr[boardObjectIndex].notes;
    const noteId =  textBox.parentElement.id;
    const note = notesArr.find((item)=>item.id == noteId)
    if(note){
        note.editNoteTextContent(textBox.textContent)
    }
    
}

const toggleNotesContainer = (boardEl)=>{
    console.log("Event triggered!");
    const boardId =  boardEl.parentElement.parentElement.id;
    const board = boardsContainerArr.find(({id})=>id == boardId);
    if (board.notes.length > 0) {
        boardEl.firstElementChild.classList.toggle("rotate");
        setTimeout(()=>{boardEl.parentElement.parentElement.lastElementChild.classList.toggle("hidden")}, 50);
    } else{
        console.log("No notes on this board");
    }
}

function markAsChecked(noteTextBox) {
    noteTextBox.classList.toggle("checked-box");
    noteTextBox.removeAttribute("contenteditable");
}

newBoardBtn.addEventListener("click", ()=>{
    boardTitleInput.value="";
    newBoardDialog.showModal();
});
createBoardBtn.addEventListener("click", ()=>{
    const myBoard = renderNewBoard();
});




/* ()=>{
    dashboardContainer.insertAdjacentHTML("beforeend", `
    <div class="Board">
        <h5>${}</h5>
    </div>
    `)
} */