// Getting dom elements:
let userId;
const mood = document.querySelector(".mood");
const number = document.querySelector(".number");
const fromDateInput = document.querySelector("#from");
const toDateInput = document.querySelector("#to");
let numFromInput = document.querySelector("#Numfrom");
let numToInput = document.querySelector("#Numto");
const date = new Date();
const currentDate = moment(date).format("YYYY-MM-DD");
const a = moment().subtract(7, "days").calendar();
const previousDate = moment(a).format("YYYY-MM-DD");

// Mood object:
let moods = {
  0: "Happy",
  1: "Sad",
  2: "Angry",
  3: "Cheerful",
  4: "Nervous",
  5: "Peaceful",
  6: "Optimistic",
};

// Setting the default date input values:
fromDateInput.value = previousDate;
toDateInput.value = currentDate;
let avg;

// Event Listeners:
fromDateInput.addEventListener("change", (e) => {
  updateDetails();
});

toDateInput.addEventListener("change", (e) => {
  updateDetails();
});
numFromInput.addEventListener("change", (e) => {
  updateNumMoods();
});
numToInput.addEventListener("change", (e) => {
  updateNumMoods();
});

// Checking if user is present:
auth.onAuthStateChanged((u) => {
  if (u == null) {
    return (window.location.href = "auth.html");
  }
  userId = u.uid;
  updateDetails();
});

function updateDetails() {
  let z = Date.parse(fromDateInput.value);
  let x = Date.parse(toDateInput.value);
  db.collection("users")
    .doc(userId)
    .collection("moods")
    .where("date", ">=", z)
    .where("date", "<=", x)
    .get()
    .then((snapshot) => {
      let sum = 0;
      snapshot.docs.forEach((doc) => {
        sum += Number(doc.data().yourMood);
      });
      avg = Math.round(sum / snapshot.docs.length);
      const moodHeading = document.getElementById("avg-mood");
      moodHeading.innerText = moods[avg];
      mood.appendChild(moodHeading);
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateNumMoods() {
  let k = Date.parse(numFromInput.value);
  let m = Date.parse(numToInput.value);
  db.collection("users")
    .doc(userId)
    .collection("moods")
    .where("date", "<=", m)
    .where("date", ">=", k)
    .get()
    .then((snapshot) => {
      const numOfMoods = document.getElementById("moodsNumber");
      numOfMoods.innerText = snapshot.docs.length;
    })
    .catch((err) => {
      console.log(err);
    });
}
