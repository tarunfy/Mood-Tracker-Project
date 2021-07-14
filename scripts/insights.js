// Getting dom elements:
let userId;
const mood = document.querySelector(".mood");
const fromDateInput = document.querySelector("#from");
const toDateInput = document.querySelector("#to");
const date = new Date();
const currentDate = moment(date).format("YYYY-MM-DD");
const a = moment().subtract(7, "days").calendar();
const previousDate = moment(a).format("YYYY-MM-DD");

// Checking if user is present:
auth.onAuthStateChanged((u) => {
  if (u == null) {
    return (window.location.href = "auth.html");
  }
  userId = u.uid;
  // Getting back the data from firestore:
  db.collection("users")
    .doc(u.uid)
    .collection("moods")
    .orderBy("date")
    .orderBy("time")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((mood) => {
        updateDetails(mood.data());
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
});

function updateDetails(details) {
  toDateInput.value = currentDate;
  fromDateInput.value = previousDate;
  const moodHeading = document.createElement("h3");
  moodHeading.innerText = "Sad";
  mood.appendChild(moodHeading);
}
