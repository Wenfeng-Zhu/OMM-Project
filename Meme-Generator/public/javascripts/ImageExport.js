const exportButton = document.getElementById('export');

//此处必须强调 html2canvas 在读取html element时候img的跨域问题
function imageExport(element, name) {
    html2canvas(element, {useCORS: true}).then(canvas => {
        canvas.toBlob(function (blob) {
            saveAs(blob, name);
        })
    });
}


exportButton.addEventListener('click', function () {
    let element = imageArea;
    let name = document.getElementById('inputText-title').value;
    imageExport(element, name);
});

