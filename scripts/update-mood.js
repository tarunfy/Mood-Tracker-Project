// Getting the id of the current mood document:
let parm = new URL(window.location).searchParams;
const id = parm.get("id");
console.log("this is the id" + id);
// Elements references:
let yourMood = document.getElementById("yourMood");
let note = document.getElementById("textarea1");
let dayPrediction = document.getElementById("dayPrediction");
let recentActivity = document.getElementById("recentActivity");
const imgInput = document.querySelector(".color");
let updateBtn = document.querySelector(".update-btn");
const moodImageEle = document.getElementById("mood-image");
let data;
const storage = firebase.storage();
const db = firebase.firestore();
let selectedFile = null;

db.settings({ timestampsInSnapshots: true });
// Verifying if user is present:
auth.onAuthStateChanged((user) => {
  if (user == null) {
    window.location.href = "auth.html";
    return;
  } else {
    getData(user.uid);
  }
});

// Functions:

function getData(userId) {
  db.collection("users")
    .doc(userId)
    .collection("moods")
    .doc(id)
    .get()
    .then((doc) => {
      data = doc.data();
      console.log(data);
      fillForm();
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function fillForm() {
  yourMood.value = data.yourMood;
  note.value = data.Note;
  dayPrediction.value = data.dayPrediction;
  recentActivity.value = data.recentActivity;
  if (data.photoUrl) {
    moodImageEle.setAttribute("src", data.photoUrl);
  }
  console.log(data.photoUrl);
}

function onFileSelected(event) {
  selectedFile = event.target.files[0];
  var reader = new FileReader();

  reader.onload = function (event) {
    moodImageEle.src = event.target.result;
  };

  reader.readAsDataURL(selectedFile);
}

imgInput.addEventListener("change", onFileSelected);

function updateData(e) {
  e.preventDefault();

  if (selectedFile != null) {
    let storageRef = storage.ref(
      `images/${auth.currentUser.uid}/${Date.now().toString()}_${
        selectedFile.name
      }`
    );

    // upload the file
    uploadTask = storageRef.put(selectedFile);

    uploadTask.on("state_changed", null, onUploadError, onUploadSuccess);

    return;
  }

  saveMoodToFirestore();
}

function onUploadError(error) {
  console.error(error);
}

function onUploadSuccess() {
  uploadTask.snapshot.ref
    .getDownloadURL()
    .then((downloadURL) => {
      saveMoodToFirestore(downloadURL);
    })
    .catch(console.error);
}

function saveMoodToFirestore(photoUrl) {
  const newMood = {
    Note: note.value,
    dayPrediction: dayPrediction.value,
    recentActivity: recentActivity.value,
    yourMood: yourMood.value,
  };

  if (photoUrl != null) {
    newMood.photoUrl = photoUrl;
  }

  db.collection("users")
    .doc(auth.currentUser.uid)
    .collection("moods")
    .doc(id)
    .update(newMood)
    .then(() => {
      window.location.href = "moods.html";
    });
}

// Event  Listeners:
updateBtn.addEventListener("click", updateData);
