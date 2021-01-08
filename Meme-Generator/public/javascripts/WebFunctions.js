window.addEventListener('DOMContentLoaded', function () {
    const imageArea = document.getElementById('imageArea');
    const texts = document.getElementById('inputText')
    const preButton = document.getElementById('preButton');
    const nextButton = document.getElementById('nextButton');
    const singleviewpreButton = document.getElementById('modalpreButton');
    const singleviewnextButton = document.getElementById('modalnextButton');
    const addNewText = document.getElementById('addNewText');
    const applyButton = document.getElementById('apply');
    const displayImage = document.createElement('img');
    const showImageID = document.getElementById('currentImageID');
    const saveButton = document.getElementById('save');
    const modal = document.getElementById('myModal');// 获取弹窗
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    const viewProductsButton = document.getElementById('products');
    const memesList = [];
    const areaWidth = imageArea.offsetWidth;
    const numberOfImages = () => memesList.length;
    const inputBoxes = [];
    let numOfInput = 2;
    let displayTexts = [];
    let currentImageID = 1;


    function showImage(num) {
        let meme = memesList[num];
        displayImage.src = meme.url;
        displayImage.width = areaWidth;
        displayImage.height = meme.height * areaWidth / meme.width;
        displayImage.onclick = function(){
            modal.style.display = "block";
            modalImg.src = displayImage.src;
            captionText.innerHTML = meme.name;
        }
         // 获取 <span> 元素，设置关闭按钮
         var span = document.getElementsByClassName("close")[0];

         // 当点击 (x), 关闭弹窗
         span.onclick = function() {
         modal.style.display = "none";
        }
    }

    function showsingleview(num){
         // 获取图片插入到弹窗 - 使用 "alt" 属性作为文本部分的内容

        let meme = memesList[num];
        modal.style.display = "block";
        modalImg.src = displayImage.src;
        captionText.innerHTML = meme.name;


         // 获取 <span> 元素，设置关闭按钮
         var span = document.getElementsByClassName("close")[0];

         // 当点击 (x), 关闭弹窗
         span.onclick = function() {
         modal.style.display = "none";
        }
    }

    singleviewpreButton.addEventListener('click', function(){
        currentImageID = currentImageID == 0 ? numberOfImages() - 1 : currentImageID - 1;
        showImage(currentImageID);
        showsingleview(currentImageID);
    });

    singleviewnextButton.addEventListener('click', function(){
        currentImageID = currentImageID == numberOfImages() - 1 ? 0 : currentImageID + 1;
        showImage(currentImageID);
        showsingleview(currentImageID);
    });

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
    });
    saveButton.addEventListener('click', function () {

    });

    viewProductsButton.addEventListener('click', function(){
        window.location.href='../public/test_overview.html';
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
                // showImageID.innerHTML = "1/" + memesList.length;
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
        input.id = 'inputText-' + (i + 1);
        input.type = 'text';
        input.value = 'inputText-' + (i + 1);
        texts.append(input);
        inputBoxes[i] = input;
    }

    function createDisplayText(i) {
        let displayText = document.createElement('text');
        displayText.id = 'displayText-' + (i + 1);
        displayText.style.position = 'absolute';
        displayText.style.zIndex = '2';
        displayText.style.top = (40 + 40 * i) + 'px';
        displayText.style.left = 40 + 'px';
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
                    displayTexts[i].style.top =dy+'px';
                }
            });
            imageArea.addEventListener('mouseup',function (e) {
                move = false;
            });
        }
    }


    imageArea.append(displayImage);
    loadImageUrls();
    textInputTitle();
    for (let i = 0; i < numOfInput; i++) {
        createInputBoxes(i);
        createDisplayText(i);
    }
    updateDisplay();

    const importFile = document.getElementById('importFile');
    importFile.addEventListener('change',function (event){
        let files = event.target.files;
        if (files[0].type !== 'image/png' && files[0].type !== 'image/jpeg' && files[0].type !== 'image/gif'){
            alert('Incorrect file format, please select PNG, JPEG or GIF format!!');
        }
        else {
            displayImage.src = window.URL.createObjectURL(files[0]);
        }
    })








})
;
