const geneImgs = document.getElementById('thnDivGene');
const titleGene = document.getElementById('titleGene');

function showThumbnails() {
    for (let i in dbMemes) {
        var imgDiv = document.createElement('div');
        imgDiv.className = "thnSingleDiv";

        var imgContent = document.createElement('img');
        imgContent.className = "thnSingleImg";
        imgContent.setAttribute("src", "http://localhost:3000/image/"+dbMemes[i].filename);
    
        imgDiv.appendChild(imgContent);

        imgDiv.onmousemove = function() {
            titleGene.innerText = dbMemes[i].filename;
            if (displayImage.alt != dbMemes[i].filename)
            titleGene.style.fontWeight = "normal";
            else
            titleGene.style.fontWeight = "bold";
        } 
        imgDiv.onmouseleave = function() {
            titleGene.innerText = displayImage.alt;
            titleGene.style.fontWeight = "bold";
        } 

        imgDiv.addEventListener('click', function(){
            showImage(i);
            var id = parseInt(i);
            currentImageID = id;
        })

        geneImgs.appendChild(imgDiv);

    }
     
    
}