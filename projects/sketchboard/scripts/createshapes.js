// By Yuval Lerner r //
window.onload = function () {
    addButtonsEvent();
}

// * Calling add event listeners to all buttons * //
function addButtonsEvent() {
    addEventRectangleBtn();
    addEventOvalBtn();
    addEventColorBtns();
    addEventColorBtn();
    addEventSaveLoadBtns();
    addEventCloseWindow();
    addEventDeleteBtn();
}

// * Add event listeners to rectangle button to create a rectangle * //
function addEventRectangleBtn() {
    var btn = document.getElementById("rectanglebtn");
    btn.addEventListener("click", createRectangle);
}

// * Add event listeners to oval button to create an oval * //
function addEventOvalBtn() {
    var btn = document.getElementById("ovalbtn");
    btn.addEventListener("click", createOval);
}

// * Add event listeners to color button to open color palet * //
function addEventColorBtn() {
    var btn = document.getElementById("colorbtn");
    btn.addEventListener("click", function () {
        var palet = document.getElementById("colors");
        palet.classList.toggle("showcolors");
    });
}

// * Add event listeners to each color button * //
function addEventColorBtns() {
    var colors = document.getElementsByClassName("colorselection");
    for (var i = 0; i < colors.length; ++i) {
        colors[i].addEventListener("click", function (event) {
            var colorDiv = event.target;
            var toColor = colorDiv.style.backgroundColor;
            changeColorToSelectedShapes(toColor);
        });
    }
}

// * Add event listeners to delete button - deleting all selected shapes * //
function addEventDeleteBtn() {
    var btn = document.getElementById("deletebtn");
    btn.addEventListener("click", deleteSelectedShapes);
}

// * Deleting all selected shapes * //
function deleteSelectedShapes() {
    var selected = document.getElementsByClassName("selected");
    var canvas = document.getElementById("canvas");
    while (selected[0]) {
        canvas.removeChild(selected[0]);
    }
}

// * Add event listener to save button * //
function addEventSaveLoadBtns() {
    var darkBackground = document.getElementById("darkbackground");
    var saveBtn = document.getElementById("savebtn");
    var window = document.getElementById("savewindow");
    saveBtn.addEventListener("click", function () {
        window.classList.toggle("showwindow");
        darkBackground.classList.toggle("showbackground");
        saveCanvasShapes();
    });
    var loadBtn = document.getElementById("loadbtn");
    loadBtn.addEventListener("click", function () {
        var window = document.getElementById("loadwindow");
        window.classList.toggle("showwindow");
        darkBackground.classList.toggle("showbackground");
        loadCanvasShapes();

        var filesInStorage = document.getElementById("filesinstorage");

        while (filesInStorage.firstChild) {
            filesInStorage.removeChild(filesInStorage.firstChild);
        }

        for (var key in localStorage) {
            var option = document.createElement("option");
            var fileName = document.createTextNode(key);
            option.appendChild(fileName);
            filesInStorage.appendChild(option);
        }
    });
}

// * Add event listener to close window buttons * //
function addEventCloseWindow() {
    var darkBackground = document.getElementById("darkbackground");
    var btns = document.getElementsByClassName("closewindow");
    btns[0].addEventListener("click", function () {
        var window = document.getElementById("savewindow");
        window.classList.toggle("showwindow");
        darkBackground.classList.toggle("showbackground");
    });
    btns[1].addEventListener("click", function () {
        var window = document.getElementById("loadwindow");
        window.classList.toggle("showwindow");
        darkBackground.classList.toggle("showbackground");
    });
}

// * Save funcionality gets the shape on the canvas and saves them to localstorage under user suplied name * //
// Objec saved is an array of all the shape
function saveCanvasShapes() {
    cancelSelections();

    var btn = document.getElementById("execsave");
    btn.addEventListener("click", function () {
        var inputName = document.getElementById("inputsavename").value;
        var cunvasShapes = getCanvasShapes();
        localStorage[inputName] = JSON.stringify(cunvasShapes);
    });
}

// * Load functionality
function loadCanvasShapes() {
    var filesInStorage = document.getElementById("filesinstorage");
    var btnLoad = document.getElementById("execload");

    btnLoad.addEventListener("click", function () {
        var currentOption = filesInStorage.options[filesInStorage.selectedIndex];
        var currentOptionText = currentOption.value;
        var canvasShapes = JSON.parse(localStorage[currentOptionText]);
        clearCanvas();
        for (var shapeId = 0; shapeId < canvasShapes.length; ++shapeId) {
            var shapeKind = (canvasShapes[shapeId].kind);
            canvasShapes[shapeId].kind = shapeKind;
            createShape(canvasShapes[shapeId]);
            loadSuccessfull();
        }
    });

    var btnDelete = document.getElementById("execdelete");
    btnDelete.addEventListener("click", function () {

        var currentOption = filesInStorage.options[filesInStorage.selectedIndex];
        var currentOptionText = currentOption.value;
        localStorage.removeItem(currentOptionText);
    });
}

// * Clears all shapes from the canvas * //
function clearCanvas() {
    var canvas = document.getElementById("canvas");
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
}

// * Returns an object with all the shape on the canvas and their core properties * //
function getCanvasShapes() {
    var canvas = document.getElementById("canvas");
    var shapes = document.getElementsByClassName("shape");
    var shapesOnCanvas = [];
    for (var shapeIndex = 0; shapeIndex < shapes.length; ++shapeIndex) {
        var shapeClass = shapes[shapeIndex].className;
        var kind = shapeClass.substring(6);

        var shape = {};
        shape["width"] = shapes[shapeIndex].style.width;
        shape["height"] = shapes[shapeIndex].style.height;
        shape["left"] = shapes[shapeIndex].style.left;
        shape["top"] = shapes[shapeIndex].style.top;
        shape["backgroundColor"] = shapes[shapeIndex].style.backgroundColor;
        shape["kind"] = kind;

        shapesOnCanvas.push(shape);
    }
    saveSuccessfull();
    return shapesOnCanvas;
}

// * Promt that the save was successfull and returns to the canvas * //
function saveSuccessfull() {

    var saveWindow = document.getElementById("savewindow");
    var darkBackground = document.getElementById("darkbackground");
    var saveSuccessfull = document.getElementById("savesuccessfull");

    darkBackground.classList.remove("showbackground");
    saveWindow.classList.remove("showwindow");
    saveSuccessfull.classList.add("showwindow");
    setTimeout(saveSuccessfullRemove, 1500);
}

// * Removes save successfull from the screen * //
function saveSuccessfullRemove() {
    var saveSuccessfull = document.getElementById("savesuccessfull");
    saveSuccessfull.classList.remove("showwindow");
}

// * Promt that the load was successfull and returns to the canvas * //
function loadSuccessfull() {
    var loadWindow = document.getElementById("loadwindow");
    var darkBackground = document.getElementById("darkbackground");
    var loadSuccessfull = document.getElementById("loadsuccessfull");

    darkBackground.classList.remove("showbackground");
    loadWindow.classList.remove("showwindow");
    loadSuccessfull.classList.add("showwindow");
    setTimeout(loadSuccessfullRemove, 1500);
}

// * Removes load successfull from the screen * //
function loadSuccessfullRemove() {
    var loadSuccessfull = document.getElementById("loadsuccessfull");
    loadSuccessfull.classList.remove("showwindow");
}

// * Changes color to selected shapes
function changeColorToSelectedShapes(color) {
    var selected = document.getElementsByClassName("selected");
    for (var i = 0; i < selected.length; ++i) {
        selected[i].style.backgroundColor = color;
    }
    // close color palet after changin color to selected shapes
    var palet = document.getElementById("colors");
    palet.classList.toggle("showcolors");
}

// * Cancel toggle of all selected shapes * //
function cancelSelections() {
    var selected = document.getElementsByClassName("selected");
    while (selected[0]) {
        selected[0].classList.remove("selected");
    }
}

// * Adds 4 selectore (1 for each corner) to a given shape * //
function addSelectors(shape) {

    // Creat new divs to act as shape side selectors
    var shapeSelectorTopLeft = document.createElement("div");
    var shapeSelectorTopRight = document.createElement("div");
    var shapeSelectorBottomLeft = document.createElement("div");
    var shapeSelectorBottomRight = document.createElement("div");

    // Adding discriptive class to each corner
    shapeSelectorTopLeft.classList.add("shapeselector", "topleft");
    shapeSelectorTopRight.classList.add("shapeselector", "topright");
    shapeSelectorBottomLeft.classList.add("shapeselector", "bottomleft");
    shapeSelectorBottomRight.classList.add("shapeselector", "bottomright");

    // Assign each one of them even mouse down to respecred resize function
    shapeSelectorBottomRight.addEventListener("mousedown", resizeBottomRight);
    shapeSelectorTopRight.addEventListener("mousedown", resizeTopRight);
    shapeSelectorBottomLeft.addEventListener("mousedown", resizeBottomLeft);
    shapeSelectorTopLeft.addEventListener("mousedown", resizeTopLeft);

    // Add the corner divs ro the shape
    shape.appendChild(shapeSelectorTopLeft);
    shape.appendChild(shapeSelectorTopRight);
    shape.appendChild(shapeSelectorBottomLeft);
    shape.appendChild(shapeSelectorBottomRight);

}

// * Starting the drag functionality of an element * //
//   Called by mouse down event created when the shape is born 
function startDrag(event) {
    this.addEventListener("mouseup", stopDrag);
    this.addEventListener("mousemove", move);

    this.style.border = "1px solid #4c4c4c";
    this.style.opacity = "0.96";
    var offsetX = event.clientX - this.offsetLeft;
    var offsetY = event.clientY - this.offsetTop;

    function move(evn) {
        var x = parseInt(evn.clientX - offsetX);
        var y = parseInt(evn.clientY - offsetY);
        var shapeWidth = parseInt(this.style.width);
        if (y < 0) {
            y = 0;
        }
        if (x < 0) {
            x = 0;
        }
        if (x > (document.body.clientWidth - shapeWidth - 2)) {
            x = (document.body.clientWidth - shapeWidth - 2);
        }
        this.style.left = x + "px";
        this.style.top = y + "px";
    }

    function stopDrag() {
        this.removeEventListener("mousemove", move);
        this.removeEventListener("mouseup", stopDrag);
        this.style.border = "none";
        this.style.opacity = "1";
    }
}

// * Starting the resize functionality for bottom right corner of an element * //
function resizeBottomRight(event) {
    event.stopPropagation();
    var headerHight = document.getElementById("header").offsetHeight;
    var shape = this.parentNode;

    this.addEventListener("mousemove", resize);

    function resize(event) {
        var clientX = event.clientX;
        var clientY = event.clientY;
        var distanceFromTop = parseInt(shape.style.top);
        var distanceFromLeft = parseInt(shape.style.left);

        shape.style.height = clientY - distanceFromTop - headerHight + "px";
        shape.style.width = clientX - distanceFromLeft + "px";
    }
    this.addEventListener("mouseup", stopResize);

    function stopResize() {
        this.removeEventListener("mousemove", resize);
    }
}

// * Starting the resize functionality for top right corner of an element * //
function resizeTopRight(event) {
    event.stopPropagation();
    var headerHight = document.getElementById("header").offsetHeight;
    var shape = this.parentNode;

    this.addEventListener("mousemove", resize);

    function resize(event) {
        var clientX = event.clientX;
        var clientY = event.clientY;
        var distanceFromTop = parseInt(shape.style.top);
        var distanceFromLeft = parseInt(shape.style.left);
        var shapeHeight = parseInt(shape.style.height);

        // check if trying to enlarge heigher then header
        if (clientY < headerHight) {
            clientY = headerHight;
        }

        shape.style.top = clientY - headerHight + "px";
        shape.style.height = shapeHeight - clientY + distanceFromTop + headerHight + "px";
        shape.style.width = clientX - distanceFromLeft + "px";
    }
    this.addEventListener("mouseup", stopResize);

    function stopResize() {
        this.removeEventListener("mousemove", resize);
    }
}

// * Starting the resize functionality for bottom left corner of an element * //
function resizeBottomLeft(event) {
    event.stopPropagation();
    var headerHight = document.getElementById("header").offsetHeight;
    var shape = this.parentNode;

    this.addEventListener("mousemove", resize);

    function resize(event) {
        var clientX = event.clientX;
        var clientY = event.clientY;
        var distanceFromTop = parseInt(shape.style.top);
        var distanceFromLeft = parseInt(shape.style.left);
        var shapeWidth = parseInt(shape.style.width);

        shape.style.height = clientY - distanceFromTop - headerHight + "px";
        shape.style.width = shapeWidth + distanceFromLeft - event.clientX + "px";
        shape.style.left = clientX + "px";
    }
    this.addEventListener("mouseup", stopResize);

    function stopResize() {
        this.removeEventListener("mousemove", resize);
    }
}

// * Starting the resize functionality for top left corner of an element * //
function resizeTopLeft(event) {
    event.stopPropagation();
    var headerHight = document.getElementById("header").offsetHeight;
    var shape = this.parentNode;

    this.addEventListener("mousemove", resize);

    function resize(event) {
        var clientX = event.clientX;
        var clientY = event.clientY;
        var distanceFromTop = parseInt(shape.style.top);
        var distanceFromLeft = parseInt(shape.style.left);
        var shapeWidth = parseInt(shape.style.width);
        var shapeHeight = parseInt(shape.style.height);

        // check if trying to enlarge heigher then header
        if (clientY < headerHight) {
            clientY = headerHight;
        }

        shape.style.height = shapeHeight - clientY + distanceFromTop + headerHight + "px";
        shape.style.width = shapeWidth + distanceFromLeft - event.clientX + "px";
        shape.style.left = event.clientX + "px";
        shape.style.top = clientY - headerHight + "px";
    }
    this.addEventListener("mouseup", stopResize);

    function stopResize() {
        this.removeEventListener("mousemove", resize);
    }
}

// Returns a random dimention between 50 and 200 * //
function generateRandomDimensions() {
    return dimension = (Math.round((Math.random() * 150) + 50)) + "px";
}

// * Returns random X position between 0 and 210 (window width - max shape size - 10px for scrolbar)
function generateRandomX() {
    return x = ((Math.round(Math.random() * (window.innerWidth - 210))) + "px");
}

// * Returns random Y position
function generateRandomY() {
    return y = ((Math.round(Math.random() * (window.innerHeight - 300))) + "px");
}

// Returns a random color * //
function getRandomColor() {
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += (Math.random() * 16 | 0).toString(16);
    }
    return color;
}

// * Create an object with random universal shape properties * //
function createPropertiesObject(kind) {
    propertiesObject = {};
    propertiesObject["width"] = generateRandomDimensions();
    propertiesObject["height"] = generateRandomDimensions();
    propertiesObject["left"] = generateRandomX();
    propertiesObject["top"] = generateRandomY();
    propertiesObject["backgroundColor"] = getRandomColor();
    propertiesObject["kind"] = kind;

    return propertiesObject;
}

// * Creates a general shape and adds it to the canvas * //
//   Returns the shape
function createShape(propertiesObject) {
    var newShape = document.createElement("div");
    var origZIndex = newShape.style.zIndex;
    newShape.addEventListener("mousedown", function () {
        this.style.zIndex = 700;
    });
    newShape.addEventListener("mouseup", function () {
        this.style.zIndex = origZIndex;
    });

    newShape.classList.add("shape");

    newShape.style.width = propertiesObject["width"];
    newShape.style.height = propertiesObject["height"];
    newShape.style.top = propertiesObject["top"];
    newShape.style.left = propertiesObject["left"];
    newShape.style.backgroundColor = propertiesObject["backgroundColor"];
    newShape.classList.add(propertiesObject["kind"]);

    var canvas = document.getElementById("canvas");

    addSelectors(newShape);

    newShape.addEventListener("click", function (event) {
        if (!event.ctrlKey) {
            cancelSelections();
            this.classList.toggle("selected");
        } else {
            this.classList.toggle("selected");
        }
    });

    newShape.addEventListener("mousedown", startDrag);
    canvas.appendChild(newShape);
    cancelSelections();
    return newShape;
}

// * Creates a shape and assign it class rectangle * //
function createRectangle() {
    var propertiesObject = createPropertiesObject("rectangle");
    var rectangle = createShape(propertiesObject);
}

// * Creates a shape and assign it class oval to be delt with in the css * //
function createOval() {
    var propertiesObject = createPropertiesObject("oval");
    var oval = createShape(propertiesObject);
}
