console.log("Hello World! This app was created by Kvothe The Arcane as a pet project. The aim of this project was to practice and hone skills in web fundamental techonolgies such as HTML, CSS, and vanilla Javascript. No frameworks were used.");

class Dashboard {

    static idCount = 0

    constructor(title){
        this.id = ++Dashboard.idCount,
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
                        <div id="${this.id} "class="dashboard">
                            <nav class="dashboard-header">
                                    <button type="button" class="hide-or-show-notes-btn trans-btn" title="Show/hide notes">
                                        <svg class="toggle-btn-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                        </svg>
                                    </button>
                                <h4 contenteditable="true">${this.title}</h4>
                                <span class="dashboard-btns">
                                    <button onclick="renderNewNote(this.parentElement.parentElement.parentElement)" class="new-note-btn" title="New Note">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                        </svg>
                                        Note
                                    </button>
                                    <button class="dashboard-delete-btn trans-btn" title="Delete dashboard">
                                        <svg class="header-icons" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                        </svg>
                                    </button>
                                </span>
                            </nav>
                        </div>`
    }//dashboardConstructor

    /* createNewNote(this){


    }//createNewNote

    delete(){

    }//deleteDashboard */



}//Dashboard

class Note {

    static noteIdCount = 0

    constructor(dashboardId){
        this.id = ++Note.noteIdCount,
        this.text = "To do",
        this.isComplete = false,
        this.dashboardId = dashboardId,
        this.htmlComp = `
                        <div class="dashboard-notes-container">
                            <div id="db${this.dashboardId}-note${this.id}" class="note-container">
                                <span class="checkbox-container">
                                    <input type="checkbox" title="Mark as complete">
                                </span>
                                <span class="note-textbox" contenteditable="true">${this.text}</span>
                                <span class="delete-btn-container">
                                    <button class="delete-note-btn" title="Delete note">
                                        <svg class="dashboard-delete-btn-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16"  fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                                        </svg>
                                    </button>
                                </span>
                            </div>
                        </div>`
    }//noteConstructor

    /* markAsComplete(){

    }//markAsComplete

    delete(){

    }//deleteNote */

}//Note


const newDashboardBtn = document.getElementById("new-dashboard-btn");
const newDashboardDialog = document.getElementById("new-dashboard-dialog");
const dashboardContainer = document.getElementById("dashboard-container")
const createDashboardBtn = document.getElementById("create-dashboard-btn");
const dashboardTitleInput = document.getElementById("dashboard-title-input");
const noteTextBoxes = document.querySelectorAll(".note-textbox");


//TODO Create a function that renders a new dashboard into the screen when a click newDashboardBtn event is triggered
const renderNewDashboard = (object) => {

};

const renderNewNote = (dashboardEl) => {
    const dashboard = dashboardEl;
    const note = new Note(dashboard.id);
    dashboardEl.insertAdjacentHTML("beforeend", note.htmlComp);
};





newDashboardBtn.addEventListener("click", ()=>{
    dashboardTitleInput.value="";
    newDashboardDialog.showModal();
});
createDashboardBtn.addEventListener("click", ()=>{
    const dashboard = new Dashboard(dashboardTitleInput.value);
    const dashboardBluePrint = dashboard.htmlComp;
    dashboardContainer.insertAdjacentHTML("beforeend", dashboardBluePrint);
});



/* ()=>{
    dashboardContainer.insertAdjacentHTML("beforeend", `
    <div class="dashboard">
        <h5>${}</h5>
    </div>
    `)
} */