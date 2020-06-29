var salt = CryptoJS.lib.WordArray.random(128/8);
var iv = CryptoJS.lib.WordArray.random(128/8);
var iterations = 500;
var keySize = 256;

$(document).ready(function () {
    $('#divMessage').hide();
    

    $("#ajax-upload-form").submit(function (e) {
        e.preventDefault();
        $('#divMessage').hide();
        var files = $("#txtFileUpload")[0].files;
        var password = $("#txtPassword").val();

        if(files.length > 0 && password != null && password != '' ) {
            let file = files[0];
            var size = file.size;
            const lastModifiedDate = new Date(file.lastModified);
            var uploadedDate = lastModifiedDate.getUTCDate() + '/' + lastModifiedDate.getUTCMonth() + '/' + lastModifiedDate.getUTCFullYear();
            console.log(size);

            this.progressId = "progress_" + Math.floor((Math.random() * 100000));



            var bar = '<div class="progress" id="' + this.progressId + '">' +
                    '<div class="progress-date" id="progress-date-' + this.progressId + '">'+ uploadedDate + '</div>' +
                    '<div class="progress-title" id="progress-title-' + this.progressId + '"></div>' +
                    '<div class="progress-bar-wrapper"><div class="progress-bar" id="progress-bar-' + this.progressId + '"></div></div>' +
                    '</div>';


            
            $(".progress-container").append(bar);
            
            if (file.size > 100000 && file.size < 20000000) {
                
                uploadFileWithEncription(this.progressId, file, password);

                $('#txtFileUpload').val('');
                $('#txtSelectedFile').val('');
            } else {
                setFormValidation('Oops!, Please select file between 0.1-20mb');
                setProgressErrorState(this.progressId, file, "File size should between 0.1-20mb");
            }

        } else {
            setFormValidation('Oops!, Please select a passowrd and file.');
        }
 
    });
    

    $('input[type=file]').change(function () {
        $('#txtSelectedFile').val(this.files[0].name);
    });

});



function uploadFileWithEncription(i, file, password) {
    var reader = new FileReader();
    var key = CryptoJS.PBKDF2(password, salt, {
        keySize: keySize/32,
        iterations: iterations
    });

    key = key.toString(CryptoJS.enc.Base64);

    reader.onload = function(e) {

        console.log('passkey', key);

        var encrypted = CryptoJS.AES.encrypt(e.target.result, key, { iv: iv, 
            mode: CryptoJS.mode.CBC, 
            padding: CryptoJS.pad.Pkcs7 
        });
      
        var encryptedFile = new File([encrypted], file.name + '.encrypted', {type: file.type, lastModified: file.lastModified});
        
        console.log('from timeout');
        var formData = new FormData();
        formData.append("upload_file", encryptedFile);
        uploadFile(formData, i, file);
        

    };

    reader.readAsText(file);
}

function uploadFile(formData, i, file) {
    var ajax = $.ajax({
        url: '/uploadfile',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        xhr: function () {
            var xhr = $.ajaxSettings.xhr();
            if (xhr.upload) {
                
                xhr.upload.addEventListener("progress", function (progress) {
                    calculateProgress(progress, i, file);
                }, false);
                
                xhr.addEventListener("abort", function () {
                    setProgressErrorState(i, file, "Upload aborted from XHR");
                }, false);
                
                xhr.addEventListener("error", function () {
                    setProgressErrorState(i, file, "Upload aborted");
                }, false);
                
                xhr.addEventListener("timeout", function (progress) {
                    setProgressErrorState(i, file, "Time out");
                }, false);
            }
            return xhr;
        },
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            let message = xhr.status + ' ' + thrownError;
            setProgressErrorState(i, message);
        }
        
    });

}

function calculateProgress(progress, i, file) {
    var total = Math.round((progress.loaded / progress.total) * 100);
    $("#progress-bar-" + i).css({"width": total + "%"});
    $("#progress-title-" + i).text(file.name);
}

function setProgressErrorState(i, file, message) {
    $("#progress-bar-" + i).closest(".progress").addClass("progress-error");
    $("#progress-title-" + i).text(file.name);
}

function setFormValidation(message) {
    $('#divMessage').text(message);
    $('#divMessage').show();
}