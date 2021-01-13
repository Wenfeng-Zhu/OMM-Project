const html2canvas = require("html2canvas");
const FileSave =require('filesaver') ;
function imageExport(element, name) {
    alert('test-4');

    html2canvas(element).then(canvas =>{
        canvas.toBlob(function (blob){
            alert('test-3');
            FileSave.saveAs(blob,name);
        })
    });
}