window.addEventListener('DOMContentLoaded', function () {
    const img = document.getElementById('imageArea');
    const preButton = document.getElementById('preButton');
    const nextButton = document.getElementById('nextButton');
    const numOfText = 0;
    const memesList = [];
    const areaWidth = img.offsetWidth;


    const numberOfImages = () => memesList.length;
    let currentImageID = 1;

    function showImage(num) {
        let meme = memesList[num];
        img.innerHTML = '';
        img.append(renderImage(meme.url, meme.width, meme.height))

    }

    function renderImage(url, width, height) {
        const newImage = document.createElement('img');
        newImage.src = url;
        newImage.width = areaWidth;
        newImage.height = height * areaWidth / width;


        return newImage
    }

    preButton.addEventListener('click', function () {
        currentImageID = currentImageID == 0 ? numberOfImages() - 1 : currentImageID - 1;
        showImage(currentImageID);
    });
    nextButton.addEventListener('click', function () {
        currentImageID = currentImageID == numberOfImages() - 1 ? 0 : currentImageID + 1;
        showImage(currentImageID);
    });

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

    loadImageUrls();
    console.log(currentImageID);


});
