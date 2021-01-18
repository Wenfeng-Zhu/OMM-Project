const thnImgs = document.getElementById('thnDiv');
const titleThn = document.getElementById('titleTmpl');

function showThumbnails() {
    //console.log(memesList.length);
    for (let i in memesList) {
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
            var id = parseInt(i);
            currentImageID = id;
        })

        thnImgs.appendChild(imgDiv);

        //console.log(memesList[i].name);
    }
     
    
}