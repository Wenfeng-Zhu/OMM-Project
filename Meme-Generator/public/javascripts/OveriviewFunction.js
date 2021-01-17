window.addEventListener('DOMContentLoaded', function () {
    const inDiv = document.getElementById('inDiv');

    function showAllMemes() {
        // from json file
        var url = "../../img-data.json"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
        var request = new XMLHttpRequest();
        
        request.open("get", url);/*设置请求方法与路径*/
        request.send(null);/*不发送数据到服务器*/
        request.onload = function () {/*XHR对象获取到返回信息后执行*/
            if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
                var json = JSON.parse(request.responseText);
                for(var i=0;i<json.length;i++){
                    var parentDiv = document.createElement('div');
                    parentDiv.className = "grid-container";

                    var imageDiv = document.createElement('div');
                    imageDiv.className = "image";
                    var imageContent = document.createElement('img');
                    imageContent.setAttribute("src", json[i].url);
                    imageDiv.appendChild(imageContent);

                    var titleDiv = document.createElement('div');
                    titleDiv.className = "title";
                    var title = document.createElement('h1');
                    title.innerText = json[i].name;
                    titleDiv.appendChild(title);

                    parentDiv.appendChild(imageDiv);
                    parentDiv.appendChild(titleDiv);

                    inDiv.appendChild(parentDiv);
                }
                console.log(json);
            }
        }
    }

    showAllMemes();
});