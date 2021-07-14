// Getting dom elements:
let userId;
const mood = document.querySelector(".mood");
const fromDateInput = document.querySelector("#from");
const toDateInput = document.querySelector("#to");
const date = new Date();
const currentDate = moment(date).format("YYYY-MM-DD");
const a = moment().subtract(7, "days").calendar();
const previousDate = moment(a).format("YYYY-MM-DD");

let count = 0;
let sum = 0;
let avg;
let moods = {
  0: "Happy",
  1: "Sad",
  2: "Angry",
  3: "Cheerful",
  4: "Nervous",
  5: "Peaceful",
  6: "Optimistic",
};
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
    .get()
    .then((snapshot) => {
      updateDetails();
    })
    .catch((error) => {
      console.log(error.message);
    });
});

function updateDetails() {
  db.collection("users")
    .doc(userId)
    .collection("moods")
    .where("date", "<=", currentDate)
    .where("date", ">=", previousDate)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        sum += Number(doc.data().yourMood);
        count += 1;
      });
      avg = Math.round(sum / count);
      console.log(avg);
      console.log(sum);
      console.log(count);
      toDateInput.value = currentDate;
      fromDateInput.value = previousDate;
      const moodHeading = document.createElement("h3");
      moodHeading.innerText = moods[avg];
      mood.appendChild(moodHeading);
    })
    .catch((err) => {
      console.log(err);
    });
}
