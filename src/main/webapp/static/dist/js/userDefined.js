//window.URL = window.URL || window.webkitURL;
    function addDNDListeners() {
        var container = document.getElementById("container");
        var fileInput = document.getElementById("fileInput");

        window.addEventListener("dragenter", function(event) {
            var event = event || window.event;
            event.preventDefault();
            event.stopPropagation();
            container.style.display = "block";
        }, false);
        window.addEventListener("dragover", function(event) {
            var event = event || window.event;
            event.preventDefault();
            event.stopPropagation();
            container.style.display = "block";
        }, false);
        window.addEventListener("drop", function(event) {
            var event = event || window.event;
            event.preventDefault();
            event.stopPropagation();
            container.style.display = "none";
        });
        window.addEventListener("dragleave", function(event) {
            var event = event || window.event;
            event.preventDefault();
            event.stopPropagation();
        }, false);
        container.addEventListener("click", function() {
            if (container.style.display == "block") {
                container.style.display = "none";
            }
        }, false);
        container.addEventListener("dragenter", function(event) {
            var event = event || window.event;
            event.preventDefault();
            event.stopPropagation();
        }, false);
        container.addEventListener("dragover", function(event) {
            var event = event || window.event;
            event.preventDefault();
            event.stopPropagation();
        }, false);
        container.addEventListener("drop", function(event) {
            event.preventDefault();
            event.stopPropagation();
            var files = event.dataTransfer.files;
            handleDrop(files);
            inspectName();
            container.style.display = "none";
        }, false);
        container.addEventListener("dragleave", function(event) {
            var event = event || window.event;
            event.preventDefault();
            event.stopPropagation();
        }, false);
        fileInput.addEventListener("change", function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            var files = this.files;
            handleDrop(files);
            inspectName();
            this.value = ''; //解决同一文件无法重复上传问题
        }, false);
    }

    function inspectName() {
        var elementSpanAll = document.querySelectorAll("ol#fileList li a");
        //console.log(elementSpanAll);
        var arrayFirstName = [];
        for (var i = 0; i < elementSpanAll.length; i++) {
            var spanName = elementSpanAll[i].innerHTML;
            arrayFirstName.push(spanName);
        };
        var arrayInspectName = unique(arrayFirstName);
        if (arrayInspectName[1].length > 0) {
            dialog(arrayInspectName[1]);
        }
    }

    function dialog(arr) {
        var dialogId = document.getElementById("dialog");
        dialogId.style.display = "block";
        var dialogIdP = dialogId.getElementsByTagName('p')[0];
        //console.log(dialogIdP);
        dialogIdP.innerHTML = "有" + arr.length + "个文件,与已或将要上传文件重名";
        document.getElementById('cancel1Button').addEventListener("click", cancelFile, false);
        document.getElementById('newButton').addEventListener("click", newFile, false);
        document.getElementById('coverButton').addEventListener("click", coverFile, false);
    }

    function cancelFile(event) {
        event.stopPropagation();
        var dialogId = document.getElementById("dialog");
        dialogId.style.display = "none";
        var elementSpanAll = document.querySelectorAll("ol#fileList li a");
        var arrayFirstName = [];
        for (var i = 0; i < elementSpanAll.length; i++) {
            var spanName = elementSpanAll[i].innerHTML;
            arrayFirstName.push(spanName);
        };
        var arrayInspectName = unique(arrayFirstName);
        var indexName = [];
        for (var i = 0; i < elementSpanAll.length; i++) {
            for (var j = 0; j < arrayInspectName[1].length; j++) {
                if (elementSpanAll[i].innerHTML == arrayInspectName[1][j]) {
                    indexName.push(i);
                }
            }
        }
        for (var i = indexName.length / 2; i < indexName.length; i++) {
            elementSpanAll[indexName[i]].parentNode.parentNode.removeChild(elementSpanAll[indexName[i]].parentNode);
        }
    }

    function newFile(event) {
        event.stopPropagation();
        var indexName = identicalIndexName();
        for (var i = indexName.length / 2; i < indexName.length; i++) {
            var elementSpanAll = document.querySelectorAll("ol#fileList li a");
            var otiginalName = elementSpanAll[indexName[i]].innerHTML;
            var otiginalNameFirst = otiginalName.substring(0, otiginalName.lastIndexOf('.'));
            var otiginalNameLast = otiginalName.substring(otiginalName.lastIndexOf('.') + 1);
            elementSpanAll[indexName[i]].innerHTML = otiginalNameFirst + "-副本." + otiginalNameLast;
        }
        var indexName2 = identicalIndexName();
        while (indexName2.length) {
            for (var i = indexName.length / 2; i < indexName.length; i++) {
                var elementSpanAll = document.querySelectorAll("ol#fileList li a");
                var otiginalName = elementSpanAll[indexName[i]].innerHTML;
                var otiginalNameFirst1 = otiginalName.substring(0, otiginalName.lastIndexOf('.'));
                var otiginalNameLast1 = otiginalName.substring(otiginalName.lastIndexOf('.') + 1);
                var otiginalNameFirst1L = otiginalNameFirst1.substring(otiginalNameFirst1.lastIndexOf('-'));
                var versionNum = parseInt(otiginalNameFirst1L.replace(/[^0-9]/ig, ""));
                if (!versionNum) {
                    elementSpanAll[indexName[i]].innerHTML = otiginalNameFirst1 + 1 + "." + otiginalNameLast1;
                } else {
                    var otiginalNameFirst2 = otiginalNameFirst1.substring(0, otiginalName.lastIndexOf('-'));
                    elementSpanAll[indexName[i]].innerHTML = otiginalNameFirst2 + "-副本" + (versionNum + 1) + "." + otiginalNameLast1;
                }
            }
            indexName2 = identicalIndexName();
        }
        //ellipsisName();
    }

    function coverFile(event) {
        event.stopPropagation();
        var elementSpanAll = document.querySelectorAll("ol#fileList li a");
        var indexName = identicalIndexName();
        for (var i = 0; i < indexName.length / 2; i++) {   
            elementSpanAll[indexName[i]].parentNode.parentNode.removeChild(elementSpanAll[indexName[i]].parentNode);
        }
    }

    function identicalIndexName() {
        var dialogId = document.getElementById("dialog");
        dialogId.style.display = "none";
        var elementSpanAll = document.querySelectorAll("ol#fileList li a");
        var arrayFirstName = [];
        for (var i = 0; i < elementSpanAll.length; i++) {
            var spanName = elementSpanAll[i].innerHTML;
            arrayFirstName.push(spanName);
        };
        var arrayInspectName = unique(arrayFirstName);
        var indexName = [];
        for (var i = 0; i < elementSpanAll.length; i++) {
            for (var j = 0; j < arrayInspectName[1].length; j++) {
                if (elementSpanAll[i].innerHTML == arrayInspectName[1][j]) {
                    indexName.push(i);
                }
            }
        }
        return indexName;
    }

    function unique(arr) {
        var arrayInspectName = [];
        var ret = [];
        var unret = [];
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (ret.indexOf(item) === -1) {
                ret.push(item);
            } else {
                unret.push(item);
            }
        }
        arrayInspectName.push(ret);
        arrayInspectName.push(unret);
        return arrayInspectName;
    }

    function handleDrop(files) {
        var fileList = document.getElementById("fileList");
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var li = document.createElement('li');
            var progressbar = document.createElement('div');
            var img = document.createElement('img');
            var nameA = document.createElement('a');
            var uploadButton = document.createElement('button');
            var cancelButton = document.createElement('button');
            uploadButton.className="btn btn-default btn-xs";
            cancelButton.className="btn btn-default btn-xs";
            progressbar.className = "progressBar";
            img.src = window.URL.createObjectURL(file);
            img.width = 20;
            img.height = 26;
            img.onload = function() {
                window.URL.revokeObjectURL(this.src);
            }
            nameA.innerHTML = file.name;
            nameA.title = file.name;
            uploadButton.innerHTML = "上传文件";
            cancelButton.innerHTML = '取消上传';
            li.appendChild(img);
            li.appendChild(nameA);
            li.appendChild(progressbar);
            li.appendChild(uploadButton);
            li.appendChild(cancelButton);
            fileList.appendChild(li);
            overVar(uploadButton, cancelButton, file, progressbar);
            // ellipsisName();
            nameTitleChange(nameA);
        }
    }

    function nameTitleChange(nameA) {
        nameA.addEventListener("click",function(event){
            event.stopPropagation();
            
            // var inputA=this.nextSibling.nextSibling;
            // inputA.style.display="inline-block";
            // this.style.display="none";

            // inputA.addEventListener("click",function(event){
            //     event.stopPropagation();
            // },false);

            // var that=this;
            // inputA.addEventListener("keydown",function(event){
            //     var e = event || window.event || arguments.callee.caller.arguments[0];
            //     if(e && e.keyCode==13){ 
            //           that.innerHTML=this.value;
            //           this.style.display="none";
            //           that.style.display="inline-block";
            //     }
            // },false);

            // inputA.addEventListener("blur",function(event){
            //     event.stopPropagation();  
            //     that.innerHTML=this.value;
            //     this.style.display="none";
            //     that.style.display="inline-block";
            // },false);
        },false);
        nameA.addEventListener("mouseover", function() {
            this.title = this.textContent;
        }, false);
    }

    function ellipsisName() {
        var fileList = document.getElementById("fileList");
        var ellipsisArray = fileList.getElementsByTagName("a");
        var len = ellipsisArray.length;
        //console.log(len);
        for (var i = 0; i < len; i++) {
            var aWidth = parseFloat(window.getComputedStyle(ellipsisArray[i]).getPropertyValue("width"));
            //console.log(aWidth);
            if (aWidth > 350) {
                // console.log(ellipsisArray[i].innerHTML.length);
                // console.log(ellipsisArray[i]);
                // console.log(ellipsisArray[i].offsetWidth);
                // console.log(ellipsisArray[i].clientWidth);
                // console.log(window.getComputedStyle(ellipsisArray[i]).getPropertyValue("width"));
                ellipsisArray[i].nextSibling.style.display = "inline-block";
                ellipsisArray[i].style.width = "346px";
            } else {
                // console.log(ellipsisArray[i].innerHTML.length);
            }

        }
    }

    function overVar(uploadButton, cancelButton, file, progressbar) {
        uploadButton.addEventListener("click", function(event) {
            event.stopPropagation();
            this.setAttribute("disabled", "disabled");
            //---------------------------------------
            //console.log(file.name);
            var that=this.parentNode;
            
            uploadFile(that, file, progressbar);
            var times = setInterval(function() {
                var p = this.previousSibling.children[0].innerHTML;
                if (p == "100%") {
                    clearInterval(times);
                    var li = this.parentNode;
                    console.log(li);
                    console.log(li.className);
                    
                    this.nextSibling.parentNode.removeChild(this.nextSibling);
                    this.previousSibling.parentNode.removeChild(this.previousSibling);
                    
                    var input1=document.createElement('input');
                    input1.setAttribute("type","hidden");
                    input1.setAttribute("value",li.querySelector('a').innerHTML);
                    var input2=document.createElement('input');
                    input2.setAttribute("type","hidden");
                    input2.setAttribute("value",li.className);


                    var deleteButton = document.createElement('button');
                    var downloadButton = document.createElement('button');
                    deleteButton.innerHTML = "删除文件";
                    deleteButton.className="btn btn-default btn-xs deleteButton";
                    downloadButton.innerHTML = "下载文件";
                    downloadButton.className="btn btn-default btn-xs downLoadButton";
                    li.appendChild(input1);
                    li.appendChild(deleteButton);
                    li.appendChild(input2);
                    li.appendChild(downloadButton);
                    li.removeAttribute("class");

                    deleteDownload(deleteButton);

                    var names = this.previousSibling.innerHTML;
                    downloadButton.onclick = function(event) {
                        event.stopPropagation();
                        /*fetch('uploads/' + names + '').then(res => res.blob().then(blob => {
                            var a = document.createElement('a');
                            var url = window.URL.createObjectURL(blob);
                            var filename = '' + names + '';
                            a.href = url;
                            a.download = filename;
                            a.click();
                            window.URL.revokeObjectURL(url);
                        }))*/
                        
                        var id = $(this).prev(":hidden").val();
        				var url = "/1_Cmoa_UI/downLoad/" + id;
        				$("#hiddenForm").attr("action",url);
        				$("#_method").val("POST");
        				$("#hiddenForm").submit();
        				return false;
                        
                    };

                    this.parentNode.removeChild(this);
                }
            }.bind(this), 100);
        }, false);
        cancelButton.addEventListener("click", function(event) {
            event.stopPropagation();
            this.parentNode.parentNode.removeChild(this.parentNode);
        }, false);
    }

    function deleteDownload(deleteButton) {
        deleteButton.addEventListener("click", function(event) {
            event.stopPropagation();
            
            var label = $(this).prev(":hidden").val();
			var flag = confirm("确定要删除   " + label + "  的信息吗?");
			if(!flag){
				return false;
			}
			var id = $(this).next(":hidden").val();
			var url = "/1_Cmoa_UI/deleteFile/" + id;
			console.log(id);
			$("#hiddenForm").attr("action",url);
			$("#_method").val("DELETE");
			$("#hiddenForm").submit();
            
            this.parentNode.parentNode.removeChild(this.parentNode);
            
            return false;
            
        }, false);
    }

    function uploadFile(that,file, progressbar) {
        var xhr = new XMLHttpRequest();
        var upload = xhr.upload;

        var p = document.createElement('p');
        p.textContent = "0%";
        progressbar.appendChild(p);

        upload.progressbar = progressbar;
        upload.addEventListener("progress", uploadProgress, false);
        upload.addEventListener("load", uploadSucceed, false);
        upload.addEventListener("error", uploadError, false);
        
        var fd = new FormData();
        
        fd.append("Myfile", file);
        fd.append("filename", "haha");
       
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText);
                console.log(that);
                
            	that.className=xhr.responseText;
            	
            	
            }
        }
        
        var url = "fileUpload";
        xhr.open("POST", url, true);
        
        xhr.send(fd);
    }

    function uploadProgress(event) {
        if (event.lengthComputable) {
            var percentage = Math.round((event.loaded * 100) / event.total);
            //console.log("percentage:" + percentage);
            if (percentage < 100) {
                event.target.progressbar.firstChild.style.width = (percentage * 2) + "px";
                event.target.progressbar.firstChild.textContent = percentage + "%";
            }
        }
    }

    function uploadSucceed(event) {
        event.target.progressbar.firstChild.style.width = "200px";
        event.target.progressbar.firstChild.textContent = "100%";
    }

    function uploadError(error) {
        alert("error: " + error);
    }
    window.addEventListener("load", addDNDListeners, false);