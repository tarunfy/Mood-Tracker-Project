const fileUploadBtn = document.querySelector(".btn");
const submitBtn = document.querySelector(".submit-btn");
const removePhotoBtn = document.querySelector(".remove-photo");
let file = null;
let storageRef;
let toastHtml;
const yourMood = document.querySelector("#yourMood");
const note = document.querySelector("#textarea1");
const dayPrediction = document.querySelector("#dayPrediction");
const recentActivity = document.querySelector("#recentActivity");
const form = document.querySelector("form");
let uploadTask;

auth.onAuthStateChanged((user) => {
  if (user == null) {
    window.location.href = "auth.html";
    return;
  }
  console.log(user.uid);
});

// funtions
const switchPage = () => {
  setTimeout(() => {
    window.location.href = "moods.html";
  }, 4400);
};

// Event Listeners
fileUploadBtn.addEventListener("change", (e) => {
  // Getting the file
  file = e.target.files[0];
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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    file !== null &&
    form.yourMood.value !== "" &&
    note.value !== "" &&
    form.dayPrediction.value !== "" &&
    form.recentActivity.value !== ""
  ) {
    // Create a storage ref
    storageRef = storage.ref(
      `images/${auth.currentUser.uid}/${Date.now().toString()}_${file.name}`
    );

    // upload the file
    uploadTask = storageRef.put(file);

    uploadTask.on("state_changed", null, onUploadError, onUploadSuccess);
  } else {
    if (
      form.yourMood.value == "" &&
      note.value == "" &&
      form.dayPrediction.value == "" &&
      form.recentActivity.value == "" &&
      file == null
    ) {
      toastHtml = `<span class="toast-text-styling "> Fillup the form first</span>`;
      M.toast({
        html: toastHtml,
        classes: "rounded toast",
      });
    } else if (
      form.yourMood.value == "" ||
      note.value == "" ||
      form.dayPrediction.value == "" ||
      form.recentActivity.value == ""
    ) {
      toastHtml = `<span class="toast-text-styling ">Fill all the entries</span>`;
      M.toast({
        html: toastHtml,
        classes: "rounded toast ",
      });
    } else if (file == null) {
      toastHtml = `<span class="toast-text-styling ">
      Please select a photo</span>`;
      M.toast({
        html: toastHtml,
        classes: "rounded toast",
      });
    } else {
      toastHtml = `<span class="toast-text-styling ">Something went wrong</span>`;
      M.toast({
        html: toastHtml,
        classes: "rounded toast",
      });
    }
  }
});

function onUploadError(error) {
  console.error(error);
}

function onUploadSuccess() {
  uploadTask.snapshot.ref
    .getDownloadURL()
    .then((downloadURL) => {
      db.collection("users").doc(auth.currentUser.uid).collection("moods").add({
        yourMood: yourMood.value,
        Note: note.value,
        dayPrediction: form.dayPrediction.value,
        recentActivity: form.recentActivity.value,
        photoUrl: downloadURL,
      });
      form.yourMood.value = "";
      form.recentActivity.value = "";
      note.value = "";
      form.dayPrediction.value = "";
      toastHtml = `<span class="toast-text-styling ">Mood Added</span>`;
      M.toast({
        html: toastHtml,
        classes: "rounded toast ",
        options: { completeCallback: switchPage() },
      });
    })
    .catch(console.error);
}
