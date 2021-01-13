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