const exportButton = document.getElementById('export');
const generateButton = document.getElementById('generate');

//此处必须强调 html2canvas 在读取html element时候img的跨域问题
function imageExport(element, name) {
    html2canvas(element, {useCORS: true}).then(canvas => {
        canvas.toBlob(function (blob) {
            saveAs(blob, name);
        })
    });
}


function upload2mongodb(element, name){

    html2canvas(element, {useCORS: true}).then(canvas => {
        canvas.toBlob(function (blob) {
            let formData = new FormData();
            formData.set('file',blob,name);
            //formData.delete('file');
            // for(var pair of formData.entries()) {
            //     alert(pair[0]+ ', '+ pair[1].type);
            // }
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:3000/upload', true);
            xhr.send(formData);
            // alert(blob.type);
            // myForm.;
            // myForm.;
            // myForm.";
            //myForm.submit();

        })
    });
}


generateButton.addEventListener('click', function () {
    let element = imageArea;
    let name = document.getElementById('inputText-title').value;
    const r = confirm("Are you sure to save Meme to the database?!");
    if (r===true){
        upload2mongodb(element, name);
    }
    else{
    }

});


exportButton.addEventListener('click', function () {
    let element = imageArea;
    let name = document.getElementById('inputText-title').value;
    imageExport(element, name);
});

