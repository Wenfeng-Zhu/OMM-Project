const inputTextsArea = document.getElementById('inputText');
const inputBoxes = [];
const leftDx = [];
const topDy = [];
const displayTexts = [];
const addNewText = document.getElementById('addNewText');
const applyButton = document.getElementById('apply');

addNewText.addEventListener('click', function () {
    createInputBoxes(inputBoxes.length);
});
applyButton.addEventListener('click', function () {
    if (inputBoxes.length > displayTexts.length) {
        let temper = inputBoxes.length - displayTexts.length;
        for (let i = 0; i < temper; i++) {
            createDisplayText(displayTexts.length);
        }
    }
    updateDisplay();
});

function inputInit(numOfInput){

    let input = document.createElement('input');
    input.height = 50;
    input.id = 'inputText-title';
    input.type = 'text';
    input.value = 'inputText-title';
    inputTextsArea.append(input);
    for (let i = 0; i < numOfInput; i++) {
        createInputBoxes(i);
        createDisplayText(i);
    }
    updateDisplay();
}

function createInputBoxes(i) {
    let inputUnit = document.createElement('div');
    inputUnit.style.display = 'grid';
    inputUnit.style.gridTemplateColumns = '80% 10% 10%';
    inputUnit.style.alignItems = 'center';
    inputUnit.offsetHeight = 50;

    let inputColor = document.createElement('input');
    inputColor.type = 'color';
    // inputColor.style.alignItems = 'center';

    let inputSize = document.createElement('input');
    inputSize.type = 'number';
    inputSize.value = '20';


    let input = document.createElement('input');
    input.height = 40;
    input.id = 'inputText-' + (i + 1);
    input.type = 'text';
    input.value = 'inputText-' + (i + 1);
    //input.style.fontSize = inputSize.value+'px';

    inputUnit.append(input);
    inputUnit.append(inputColor);
    inputUnit.append(inputSize);
    inputTextsArea.append(inputUnit);
    inputBoxes[i] = input;
}

function createDisplayText(i) {
    let displayText = document.createElement('text');
    displayText.id = 'displayText-' + (i + 1);
    displayText.style.position = 'absolute';
    displayText.style.zIndex = '2';
    displayText.style.top = (40 + 40 * i) + 'px';
    topDy[i] = 40 + 40 * i;
    displayText.style.left = 40 + 'px';
    leftDx[i] = 40;
    displayTexts[i] = displayText;
    imageArea.append(displayTexts[i]);
}

function updateDisplay() {
    for (let i = 0; i < displayTexts.length; i++) {
        displayTexts[i].innerHTML = inputBoxes[i].value;
    }
    draggable();
}

function draggable(){
    let deltaLeft, deltaTop = 0;
    for (let i = 0; i < displayTexts.length; i++) {
        //displayTexts[i].cursor = 'move';
        let move = displayTexts[i].draggable;
        displayTexts[i].addEventListener('mouseover', function (e) {
            displayTexts[i].style.cursor ='pointer';
        });
        displayTexts[i].addEventListener('mousedown', function (e) {
            deltaLeft = e.clientX - e.target.offsetLeft;
            deltaTop = e.clientY - e.target.offsetTop;
            move = true;
        });
        imageArea.addEventListener('mousemove', function (e) {
            if (move) {
                const cx = e.clientX;
                const cy = e.clientY;
                let dx = cx - deltaLeft;
                let dy = cy - deltaTop;
                if (dx < 0)
                    dx = 0;
                if (dy < 0)
                    dy = 0;
                if (dx > (displayImage.offsetWidth - displayTexts[i].offsetWidth))
                    dx = displayImage.offsetWidth - displayTexts[i].offsetWidth;
                if (dy > (displayImage.offsetHeight - displayTexts[i].offsetHeight))
                    dy = displayImage.offsetHeight - displayTexts[i].offsetHeight;
                displayTexts[i].style.left = dx+'px';
                leftDx[i] = dx;
                displayTexts[i].style.top =dy+'px';
                topDy[i] = dy;
            }
        });
        imageArea.addEventListener('mouseup',function (e) {
            move = false;
        });
    }
}