const imageArea = document.getElementById('imageArea');
const displayImage = document.createElement('img');
const title = document.getElementById('generatedTitle');
// const modal = document.getElementById('myModal');// 获取弹窗
// const modalImg = document.getElementById("img01");
const preButton = document.getElementById('preButton');
const nextButton = document.getElementById('nextButton');
const backButton = document.getElementById('back');
// const singleViewPreButton = document.getElementById('modalPreButton');
// const singleViewNextButton = document.getElementById('modalNextButton');
const dbMemes = [];
const memesList = [];
const areaWidth = imageArea.offsetWidth;
// const captionText = document.getElementById("caption");
let currentImageID = 0;
let numberOfImages = () => dbMemes.length;

function loadImageUrls() {
    fetch("http://localhost:3000/files")
        .then(response => response.json())
        .then(result => {
            for (let i  = 0; i < result.length; i++) {
                // titleThn.innerText = result[i].filename;
                // titleThn.style.fontWeight = "bold";
                dbMemes[i] = result[i];
            }
            showImage(0)
        })
        .catch(error => console.log('error', error));
}

function showImage(num) {
    let memeurl = "http://localhost:3000/image/"+dbMemes[num].filename;
    displayImage.src = memeurl;
    displayImage.width = areaWidth;
    //displayImage.height = dbMemes[num].height * areaWidth / dbMemes[num].width;
    title.innerHTML = dbMemes[num].filename.toString();
    //alert(dbMemes[num].filename.toString())
}

preButton.addEventListener('click', function () {
    currentImageID = currentImageID === 0 ? numberOfImages() - 1 : currentImageID - 1;
    showImage(currentImageID);
});

nextButton.addEventListener('click', function () {
    currentImageID = currentImageID === numberOfImages() - 1 ? 0 : currentImageID + 1;
    showImage(currentImageID);
});

backButton.addEventListener('click', function () {
    location.href = '/';
});

