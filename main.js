class Dashboard {

    static idCount = 0

    constructor(title){
        this.id = ++Dashboard.idCount,
        this.title  = title,
        this.notes = []
    }//dashboardConstructor

}//Dashboard

class Note {

    static noteIdCount = 0

    constructor(text){
        this.id = ++Note.noteIdCount,
        this.text = text,
        this.isComplete = false
    }//noteConstructor

}//Note

const newDashboardBtn = document.getElementById("new-dashboard-btn");
const newDashboardDialog = document.getElementById("new-dashboard-dialog");
const dashboardContainer = document.getElementById("dashboard-container")
const createDashboardBtn = document.getElementById("create-dashboard-btn");
const dashboardTitleInput = document.getElementById("dashboard-title-input");
const noteTextBoxes = document.querySelectorAll(".note-textbox");

const renderNewDashboard = (object) => {

};

const renderNewNote = (dashboardEl) => {
    dashboardEl.insertAdjacentHTML("beforeend",`<div id="dashboard${dashboardEl.id}-notes-container" class="note-container"><span class="checkbox-container"><input type="checkbox"></span><div class="note-textbox" contenteditable="true">Text example...</div><span class="note-btns-container"><button type="button">Delete</button></span></div>`)
};
/* //function that puts placeholders in all empty text-boxes
function createPlaceHolder(element) {
    console.log("Reading the event!");
    if (element.innerText == "") {
        element.innerText = "Escribe algo.."
    } else {
        console.log("Did not enter if")
    }
}//createPlaceHolder */




newDashboardBtn.addEventListener("click", ()=>{
    newDashboardDialog.showModal();
});
createDashboardBtn.addEventListener("click", ()=>{
    const dashboard = new Dashboard(dashboardTitleInput.value);
    dashboardContainer.insertAdjacentHTML("beforeend", `
    <div class="dashboard">
        <nav>
            <button>Toggle open</button>
            <h5>${dashboard.title}</h5>
            <button>New Note</button>
            <button>Delete</button>
        </nav>
        <div id="dashboard${dashboard.id}-notes-container" class="notes container">Nota 1</div>
    </div>
    `)
});



/* ()=>{
    dashboardContainer.insertAdjacentHTML("beforeend", `
    <div class="dashboard">
        <h5>${}</h5>
    </div>
    `)
} */