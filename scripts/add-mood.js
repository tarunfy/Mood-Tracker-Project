const fileUploadBtn = document.querySelector(".btn");
const submitBtn = document.querySelector(".submit-btn");
const removePhotoBtn = document.querySelector(".remove-photo");
let file;
let storageRef;

fileUploadBtn.addEventListener("change", (e) => {
  // Getting the file
  file = e.target.files[0];

  // Create a storage ref
  storageRef = storage.ref(`test/${file.name}`);

  // upload the file
  storageRef.put(file).then(() => {
    console.log("file uploaded");
  });
});

removePhotoBtn.addEventListener("click", () => {
  storageRef
    .delete()
    .then(() => {
      console.log("file got deleted");
    })
    .catch((err) => {
      console.log(err.message);
    });
});
