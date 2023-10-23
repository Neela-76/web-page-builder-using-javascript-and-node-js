const editor = document.getElementById("editor");
const designModeButton = document.getElementById("layout");
const addColumnButton = document.getElementById("addColumn");
const addRowButton = document.getElementById("addRow");
const mergeColumnsButton = document.getElementById("mergeColumns");
const mergeRowsButton = document.getElementById("mergeRows");
const gridContainer = document.querySelector(".grid-container");
const grid = document.getElementById("drop-zone");
const gridItems = document.querySelectorAll(".grid-item");
const saveLayoutButton = document.getElementById("saveLayout");
const exportLayoutButton = document.getElementById("exportLayout");
let savedLayout = null;


// Event listeners for the buttons
addColumnButton.addEventListener("click", addColumn);
addRowButton.addEventListener("click", addRow);
mergeColumnsButton.addEventListener("click", mergeColumns);
mergeRowsButton.addEventListener("click", mergeRows);

// Function to enable design mode
function enableDesignMode() {
    editor.contentEditable = true; // Allow content to be edited
    editor.style.border = "2px dashed #000"; // Add a visual indication that design mode is active
}

function disableDesignMode() {
    editor.contentEditable = false; // Allow content to be edited
    editor.style.border = "none"; // Add a visual indication that design mode is active
}

function dynamicComponent(a){
    console.log('dynamicComponent'+a);
    console.log(editor);
    if (editor.contentEditable === "true") {
        disableDesignMode();
        designModeButton.textContent = "Enable Design Mode";
        console.log('disabled');
    } else {
        enableDesignMode();
        designModeButton.textContent = "Disable Design Mode";
        console.log('enabled');
    }
}

// Function to add a column to the grid layout
function addColumn() {
    const gridContainer = document.querySelector(".grid-container");
    const newColumn = document.createElement("div");
    newColumn.className = "grid-item";
    newColumn.textContent = "New Column";
    gridContainer.appendChild(newColumn);
}

// // Function to add a row to the grid layout
// function addRow() {
//     const gridContainer = document.querySelector(".grid-container");
//     const gridItems = document.querySelectorAll(".grid-item");
//     const newRow = document.createElement("div");
//     newRow.className = "grid-item";
//     newRow.textContent = "New Row";
//     gridItems.forEach(item => {
//         gridContainer.insertBefore(newRow.cloneNode(true), item);
//     });
// }

// function mergeColumns() {
//     const gridItems = document.querySelectorAll(".grid-item");
    
//     if (gridItems.length >= 2) {
//         // Merge the first two grid items
//         gridItems[0].colSpan = 2;
//         gridItems[1].style.display = "none";
//     }
// }

// // Function to merge rows
// function mergeRows() {
//     const gridItems = document.querySelectorAll(".grid-item");
    
//     if (gridItems.length >= 2) {
//         // Merge the first two grid items
//         gridItems[0].rowSpan = 2;
//         gridItems[2].style.display = "none";
//     }
// }

let draggedItem = null;

// Drag event listeners
gridItems.forEach(item => {
    item.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", item.textContent);
        draggedItem = item;
    });

    item.addEventListener("dragend", () => {
        draggedItem = null;
    });
});

// Drop event listener
grid.addEventListener("dragover", (e) => {
    e.preventDefault(); // Allow drop
});

grid.addEventListener("drop", (event) => {
    event.preventDefault();
            var data = event.dataTransfer.getData("text");
            var draggableElement = document.getElementById(data);
            event.target.appendChild(copy);
            
            // Add an event listener to the new element for editing its name
            copy.addEventListener("click", editElementName);
});
function editElement(event) {

    var element = event.target;
    console.log(element);
    var newText = prompt("Edit element content:", element.innerText);
    if (newText !== null) {
        element.innerText = newText;
    }

    
}
// Listen for changes in content
grid.addEventListener("input", (e) => {
    const gridItem = e.target;
    // You can save or process the edited content here, e.g., to update a data structure
    console.log("Content changed:", gridItem.textContent);
});



// Save the current layout
saveLayoutButton.addEventListener("click", () => {
    savedLayout = grid.innerHTML;
    alert("Layout saved!");
});

// Export the saved layout as HTML and CSS
exportLayoutButton.addEventListener("click", () => {
    if (savedLayout) {
        const htmlContent = `<div class="grid-container">${savedLayout}</div>`;
        const cssStyles = `
            .grid-container {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
            }
            .grid-item {
                background-color: #f0f0f0;
                padding: 10px;
                border: 1px solid #ccc;
                text-align: center;
            }
            .grid-item:nth-child(odd) {
                background-color: #e0e0e0;
            }
        `;

        // Create a new HTML document and add the content and styles
        const exportDocument = document.implementation.createHTMLDocument("Exported Layout");
        exportDocument.body.innerHTML = htmlContent;

        // Create a style element for the CSS and append it to the export document
        const styleElement = exportDocument.createElement("style");
        styleElement.textContent = cssStyles;
        exportDocument.head.appendChild(styleElement);

        // Create a download link for the HTML file
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([exportDocument.documentElement.outerHTML], { type: "text/html" }));
        a.download = "exported_layout.html";
        a.click();
    } else {
        alert("No layout saved. Save the layout before exporting.");
    }
});
const layoutContainer = document.getElementById('layout-container');
const layoutItems = document.querySelectorAll('.layout-item');

// Function to resize layout items
function resizeLayoutItems() {
  layoutItems.forEach((item) => {
    const width = `${100 / layoutItems.length}%`;
    item.style.width = width;
  });
}

// Listen for window resize event
window.addEventListener('resize', resizeLayoutItems);

// Initial layout setup
resizeLayoutItems();











const draggableComponents = document.querySelectorAll('.draggable-component');
const dropZone = document.getElementById('drop-zone');

draggableComponents.forEach((component) => {
  component.draggable = true;

  component.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
  });
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const componentId = e.dataTransfer.getData('text/plain');
  const component = document.getElementById(componentId);
  const clone = component.cloneNode(true);
  clone.id = componentId + '-clone';
  dropZone.appendChild(clone);
});




function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    console.log(event);
    var data = event.dataTransfer.getData("text");
    var draggableLabel = document.getElementById(data);
    var labelContent = prompt("Edit label content:", draggableLabel.innerText);
    
    if (labelContent !== null) {
        draggableLabel.innerText = labelContent;
    }
    var x = event.clientX - event.target.getBoundingClientRect().left;
    var y = event.clientY - event.target.getBoundingClientRect().top;
    draggableLabel.style.left = x + "px";
    draggableLabel.style.top = y + "px";
}

document.getElementById("editable-container").addEventListener("click", function(event) {
    var selectedElement = event.target;
    if (selectedElement.classList.contains("editable")) {
        selectedElement.contentEditable = true;
        selectedElement.focus();

        selectedElement.addEventListener("blur", function() {
            selectedElement.contentEditable = false;
        });
    }
});

