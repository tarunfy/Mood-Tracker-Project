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
let selectInputValue;
let selectElement = document.getElementById("yourMood");
let valueSelected = selectElement.options[selectElement.selectedIndex].value; // get selected option value
let text = selectElement.options[selectElement.selectedIndex].text;

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

      switch (data.yourMood) {
        case "Happy":
          selectInputValue = "0";
          break;
        case "Sad":
          selectInputValue = "1";
          break;
        case "Cheerful":
          selectInputValue = "2";
          break;
        case "Angry":
          selectInputValue = "3";
          break;
        case "Nervous":
          selectInputValue = "4";
          break;
        case "Peaceful":
          selectInputValue = "5";
          break;
        case "Optimistic":
          selectInputValue = "6";
          break;
      }
      fillForm();
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function fillForm() {
  yourMood.value = selectInputValue;
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

function getSelectValue() {
  let val = selectElement.options[selectElement.selectedIndex].text;
  console.log(val);
  switch (val) {
    case "0":
      text = "Happy";
      break;
    case "1":
      text = "Sad";
      break;
    case "2":
      text = "Cheerful";
      break;
    case "3":
      text = "Angry";
      break;
    case "4":
      text = "Nervous";
      break;
    case "5":
      text = "Peaceful";
      break;
    case "6":
      text = "Optimistic";
      break;
  }
  return text;
}

function saveMoodToFirestore(photoUrl) {
  getSelectValue();
  const newMood = {
    Note: note.value,
    dayPrediction: dayPrediction.value,
    recentActivity: recentActivity.value,
    yourMood: text,
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
      // Resetting the input fields:
      yourMood.value = "";
      note.value = "";
      recentActivity.value = "";
      dayPrediction.value = "";
      imgInput.value = "";
      window.location.href = "moods.html";
    });
}

// Event  Listeners:
updateBtn.addEventListener("click", updateData);
