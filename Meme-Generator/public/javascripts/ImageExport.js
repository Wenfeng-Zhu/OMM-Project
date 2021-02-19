const { post } = require("../../app");

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
    html2canvas(element, {useCORS: true}).then((canvas) => {
        //将canvas转为base64格式
        var imgUrl = canvas.toDataURL("image/png");
        const data = new FormData();
        data.append('file', imgUrl);

        fetch('localhost:3000/upload', {
            method: 'POST',
            body: data
        });
    });
}


generateButton.addEventListener('click', function () {
    let element = imageArea;
    let name = document.getElementById('inputText-title').value;
    upload2mongodb(element, name);

});


exportButton.addEventListener('click', function () {
    let element = imageArea;
    let name = document.getElementById('inputText-title').value;
    imageExport(element, name);
});

