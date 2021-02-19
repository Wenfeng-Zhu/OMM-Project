const imageArea = document.getElementById('imageArea');
const displayImage = document.createElement('img');
// const modal = document.getElementById('myModal');// 获取弹窗
// const modalImg = document.getElementById("img01");
const preButton = document.getElementById('preButton');
const nextButton = document.getElementById('nextButton');
// const singleViewPreButton = document.getElementById('modalPreButton');
// const singleViewNextButton = document.getElementById('modalNextButton');
const dbmemesurl = [];
const memesList = [];
const areaWidth = imageArea.offsetWidth;
// const captionText = document.getElementById("caption");
let currentImageID = 0;
let numberOfImages = () => dbmemesurl.length;

function loadImageUrls() {
    fetch("http://localhost:3000/files")
        .then(response => response.json())
        .then(result => {
            for (let i  = 0; i < result.length; i++) {
                /**
                 * {
                 *  "_id":"600a9eec7478e046a6e4e58b",
                 *  "length":118935,
                 *  "chunkSize":261120,
                 *  "uploadDate":"2021-01-22T09:46:26.107Z",
                 *  "filename":"9a0f381a7c1ea0a306d12e96a8c560d6.jpg",
                 *  "md5":"20d17f3a522e029f0d53b781f750a52e",
                 *  "contentType":"image/jpeg"}
                 */
                titleThn.innerText = result[i].filename;
                titleThn.style.fontWeight = "bold";

                dbmemesurl[i] = "http://localhost:3000/image/" + result[i].filename;
            }
            showImage(0)
        })
        .catch(error => console.log('error', error));
}

function showImage(num) {
    let memeurl = dbmemesurl[num];
    displayImage.src = memeurl;
    displayImage.width = areaWidth;
    displayImage.height = 500;

    // displayImage.onclick = function(){
    //     modal.style.display = "block";
    //     modalImg.src = displayImage.src;
    //     captionText.innerHTML = meme.name;
    // }

    // displayImage.alt = meme.name;
    // titleThn.innerText = displayImage.alt;
    // titleThn.style.fontWeight = "bold";
    
    // // 获取 <span> 元素，设置关闭按钮
    // const span = document.getElementsByClassName("close")[0];
    // // 当点击 (x), 关闭弹窗
    // span.onclick = function() {
    //     modal.style.display = "none";
    // }
}
// function showSingleView(num){
//     // 获取图片插入到弹窗 - 使用 "alt" 属性作为文本部分的内容
//     let meme = memesList[num];
//     modal.style.display = "block";
//     modalImg.src = displayImage.src;
//     captionText.innerHTML = meme.name;
//     // 获取 <span> 元素，设置关闭按钮
//     var span = document.getElementsByClassName("close")[0];
//     // 当点击 (x), 关闭弹窗
//     span.onclick = function() {
//         modal.style.display = "none";
//     }
// }

preButton.addEventListener('click', function () {
    currentImageID = currentImageID === 0 ? numberOfImages() - 1 : currentImageID - 1;
    showImage(currentImageID);
});

nextButton.addEventListener('click', function () {
    currentImageID = currentImageID === numberOfImages() - 1 ? 0 : currentImageID + 1;
    showImage(currentImageID);
});

singleViewPreButton.addEventListener('click', function(){
    currentImageID = currentImageID === 0 ? numberOfImages() - 1 : currentImageID - 1;
    showImage(currentImageID);
    showSingleView(currentImageID);
});

singleViewNextButton.addEventListener('click', function(){
    currentImageID = currentImageID === numberOfImages() - 1 ? 0 : currentImageID + 1;
    showImage(currentImageID);
    showSingleView(currentImageID);
});
