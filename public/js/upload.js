var myWidget = cloudinary.createUploadWidget({
    cloudName: 'cloud',
    uploadPreset: 'upload',
    folder: 'upload'
},
    (error, result) => {
        if (!error && result && result.event === "success") {
            console.log('Done! Here is the image info: ', result.info);
        }
    }
)

cloudinary.openUploadWidget({
    cloudName: "cloud", uploadPreset: "upload",
    showCompletedButton: true,  
    }, (error, result) => {
         if (!error && result.event === "show-completed") {
       result.info.items.forEach((item) => {
         console.log(`show completed for item with id:
        ${item.uploadInfo.public_id}`); //uploadInfo is the data returned in the upload response
      });
    }
  });


document.getElementById("upload_widget").addEventListener("click", function () {
    myWidget.open();
},
    false
);
