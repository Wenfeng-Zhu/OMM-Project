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
    const exportButton = document.getElementById('export');
    const modal = document.getElementById('myModal');// 获取弹窗
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    const viewProductsButton = document.getElementById('products');
    const showThumbnail = document.getElementById('showThumbnail');
    const thnImgs = document.getElementById('thnDiv');
    const titleThn = document.getElementById('titleTmpl');

    const memesList = [];
    const areaWidth = imageArea.offsetWidth;
    const numberOfImages = () => memesList.length;
    const inputBoxes = [];
    const hotMemes = [];

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

        displayImage.alt = meme.name;
        titleThn.innerText = displayImage.alt;
        titleThn.style.fontWeight = "bold";
        console.log(displayImage.alt);
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
        console.log(currentImageID);
    });
    nextButton.addEventListener('click', function () {
        currentImageID = currentImageID == numberOfImages() - 1 ? 0 : currentImageID + 1;
        showImage(currentImageID);
        console.log(currentImageID);
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
    exportButton.addEventListener('click', function () {

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

                    var imgDiv = document.createElement('div');
                    imgDiv.className = "thnSingleDiv";
     
                    var imgContent = document.createElement('img');
                    imgContent.className = "thnSingleImg";
                    imgContent.setAttribute("src", memesList[i].url);
    
                    imgDiv.appendChild(imgContent);
    
                   
                    imgDiv.onmousemove = function() {
                        titleThn.innerText = memesList[i].name;
                        if (displayImage.alt != memesList[i].name)
                            titleThn.style.fontWeight = "normal";
                        else
                            titleThn.style.fontWeight = "bold";
                    } 
                    imgDiv.onmouseleave = function() {
                        titleThn.innerText = displayImage.alt;
                        titleThn.style.fontWeight = "bold";

                    } 

                    imgDiv.addEventListener('click', function(){
                        showImage(i);
                        console.log(i);
                        var id = parseInt(i);
                        currentImageID = id;
                    })

                    thnImgs.appendChild(imgDiv);

                }
                showImage(0)
                console.log(memesList);

               
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
/*
    function showFiveImages() {
        var url = "../../img-data.json"//json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径
        var request = new XMLHttpRequest();
        request.open("get", url);//设置请求方法与路径
        request.send(null);//不发送数据到服务器
        request.onload = function () {//XHR对象获取到返回信息后执行
            if (request.status == 200) {//返回状态为200，即为数据获取成功
                var json = JSON.parse(request.responseText);
                for(var i=0;i<json.length;i++){
                    console.log(json[i].name);
                    if (i<=4) {
                        var tag = "tn" + i;
                        console.log("tag:" + tag);
                        var obj = document.getElementById(tag);
                        obj.setAttribute("src", json[i].url);
                        
                    }
                }
                console.log(json);
            }
        }

    }
    
    showFiveImages();

*/




})
;
