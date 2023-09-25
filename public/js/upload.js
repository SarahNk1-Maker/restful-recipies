var myWidget = cloudinary.createUploadWidget({
    cloudName: 'hzxyensd5',
    uploadPreset: 'aoh4fpwm',
    folder: 'upload',
    theme: "orange"
},
    (error, result) => {
        if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            document
                .getElementById("uploadedimage")
                .setAttribute("src", result.info.secure_url);
        }
    }
);

document.getElementById("upload_widget").addEventListener("click", function () {
    myWidget.open();
},
    false
);
