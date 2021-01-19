const inputTextsArea = document.getElementById('inputText');
const inputBoxes = [];
const inputColors = [];
const inputSizes = [];
const inputBolds = [];
const inputItalics =[];
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

function inputInit(numOfInput) {

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
    draggable();
    updateDisplay();
}

function createInputBoxes(i) {
    let inputUnit = document.createElement('div');
    inputUnit.style.display = 'grid';
    inputUnit.style.gridTemplateColumns = '68% 8% 8% 8% 8%';
    inputUnit.style.alignItems = 'center';
    //inputUnit.style.justifyContent = 'center';
    //inputUnit.style.height = 60+'px';

    let input = document.createElement('input');
    input.style.height = 60 + '%';
    input.id = 'inputText-' + (i + 1);
    input.type = 'text';
    input.value = 'inputText-' + (i + 1);
    input.style.width = 95+'%';
    input.style.justifyItems = 'center';

    let inputColor = document.createElement('input');
    inputColor.type = 'color';
    inputColor.value = '#000000';
    inputColor.style.alignItems = 'center';
    inputColor.style.width = 80+'%';

    let inputSize = document.createElement('input');
    inputSize.type = 'number';
    inputSize.value = '20';
    inputSize.style.width = 80+'%';

    let boldLabel = document.createElement('label');
    boldLabel.innerHTML ='B';
    boldLabel.style.fontWeight = 'bold';
    let inputBold = document.createElement('input');
    inputBold.type = 'checkbox';
    boldLabel.appendChild(inputBold);
    boldLabel.style.width = 80+'%';


    let italicLabel = document.createElement('label');
    italicLabel.innerHTML = 'I';
    italicLabel.style.fontStyle = 'italic';
    let inputItalic = document.createElement('input');
    inputItalic.type = 'checkbox';
    italicLabel.appendChild(inputItalic);
    italicLabel.style.width = 80+'%';

    inputUnit.append(input);
    inputUnit.append(inputColor);
    inputUnit.append(inputSize);
    inputUnit.append(boldLabel);
    inputUnit.append(italicLabel);
    inputTextsArea.append(inputUnit);

    inputBoxes[i] = input;
    inputSizes[i] = inputSize;
    inputColors[i] = inputColor;
    inputBolds[i] = inputBold;
    inputItalics[i] = inputItalic;
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
        displayTexts[i].innerText = inputBoxes[i].value;
        //alert('test'+inputColors[i].value);
        //displayTexts[i].innerText.style.fontSize = inputSizes[i].value;
        displayTexts[i].style.color = inputColors[i].value;
        displayTexts[i].style.fontSize = inputSizes[i].value + 'px';
        if (inputBolds[i].checked){
            displayTexts[i].style.fontWeight = 'bold';
        }
        else {
            displayTexts[i].style.fontWeight = 'normal';
        }
        if (inputItalics[i].checked){
            displayTexts[i].style.fontStyle = 'italic';
        }
        else {
            displayTexts[i].style.fontStyle = 'normal';
        }

    }
    //draggable();
}

function draggable() {
    let deltaLeft, deltaTop = 0;
    for (let i = 0; i < displayTexts.length; i++) {
        //displayTexts[i].cursor = 'move';
        let move = displayTexts[i].draggable;
        displayTexts[i].addEventListener('mouseover', function (e) {
            displayTexts[i].style.cursor = 'pointer';
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
                displayTexts[i].style.left = dx + 'px';
                leftDx[i] = dx;
                displayTexts[i].style.top = dy + 'px';
                topDy[i] = dy;
            }
        });
        imageArea.addEventListener('mouseup', function (e) {
            move = false;
        });
    }
}