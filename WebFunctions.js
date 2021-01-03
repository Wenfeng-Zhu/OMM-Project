window.addEventListener('DOMContentLoaded', function () {
    const imageArea = document.getElementById('imageArea');
    const texts = document.getElementById('inputText')
    const preButton = document.getElementById('preButton');
    const nextButton = document.getElementById('nextButton');
    const addNewText = document.getElementById('addNewText');
    const applyButton = document.getElementById('apply');
    const displayImage = document.createElement('img');
    const memesList = [];
    const areaWidth = imageArea.offsetWidth;
    const numberOfImages = () => memesList.length;
    const inputBoxes = [];
    let displayTexts = [];
    let currentImageID = 1;

    function showImage(num) {
        let meme = memesList[num];
        displayImage.src = meme.url;
        displayImage.width = areaWidth;
        displayImage.height = meme.height * areaWidth / meme.width;
    }

    // function renderImage(url, width, height) {
    //     displayImage.src = url;
    //     displayImage.width = areaWidth;
    //     displayImage.height = height * areaWidth / width;
    // }

    preButton.addEventListener('click', function () {
        currentImageID = currentImageID == 0 ? numberOfImages() - 1 : currentImageID - 1;
        showImage(currentImageID);
    });
    nextButton.addEventListener('click', function () {
        currentImageID = currentImageID == numberOfImages() - 1 ? 0 : currentImageID + 1;
        showImage(currentImageID);
    });
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

        //alert('test'+ ' '+ displayTexts[0].innerHTML);
    })


    function loadImageUrls() {
        // TODO load meme template images from the Imgflip API
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(result => {
                for (let i in result['data']['memes']) {
                    memesList[i] = result['data']['memes'][i];
                }
                showImage(0)
            })
            .catch(error => console.log('error', error));
    }

    function textInputTitle() {
        let input = document.createElement('input');
        input.height = 50;
        input.id = 'inputText-title';
        input.type = 'text';
        input.value = 'inputText-title';
        texts.append(input);
    }

    function createInputBoxes(i) {
        let input = document.createElement('input');
        input.height = 50;
        input.id = 'inputText-' + (i+1);
        input.type = 'text';
        input.value = 'inputText-' + (i+1);
        texts.append(input);
        inputBoxes[i] = input;

    }

    function createDisplayText(i) {
        let displayText = document.createElement('text');
        displayText.id = 'displayText-' + (i+1);
        displayTexts[i]=displayText;
        imageArea.append(displayTexts[i]);
    }

    function updateDisplay() {
        for (let i = 0; i < displayTexts.length; i++) {
            displayTexts[i].innerHTML = inputBoxes[i].value;
        }
    }

    imageArea.append(displayImage);
    loadImageUrls();
    textInputTitle();
    createInputBoxes(0);
    createInputBoxes(1);
    createDisplayText(0);
    createDisplayText(1);


})
;
