// Getting dom elements:
let userId;
const mood = document.querySelector(".mood");
const number = document.querySelector(".number");
const fromDateInput = document.querySelector("#from");
const toDateInput = document.querySelector("#to");
const numFromInput = document.querySelector("#Numfrom");
const numToInput = document.querySelector("#Numto");
const chartFromInput = document.querySelector("#chartFrom");
const chartToInput = document.querySelector("#chartTo");
const date = new Date();
const currentDate = moment(date).format("YYYY-MM-DD");
const a = moment().subtract(7, "days").calendar();
const previousDate = moment(a).format("YYYY-MM-DD");
const card1 = document.getElementById("avg-mood-card");
const card2 = document.getElementById("mood-count-card");
const card3 = document.getElementById("chart-container");

// Animation:
window.addEventListener("load", () => {
  card1.style.transform = "translateX(0)";
  card2.style.transform = "translateX(0)";
  card3.style.opacity = 1;
});

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
chartFromInput.addEventListener("change", (e) => {
  console.log(e.target.value);
  chartDetails();
});
chartToInput.addEventListener("change", (e) => {
  console.log(e.target.value);
  chartDetails();
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

function chartDetails() {
  happyMood.innerText = 0;
  sadMood.innerText = 0;
  angryMood.innerText = 0;
  cheerfulMood.innerText = 0;
  nervousMood.innerText = 0;
  peacefulMood.innerText = 0;
  optimisticMood.innerText = 0;
  let d = Date.parse(chartFromInput.value);
  let e = Date.parse(chartToInput.value);
  db.collection("users")
    .doc(userId)
    .collection("moods")
    .where("date", ">=", d)
    .where("date", "<=", e)
    .get()
    .then((snapshot) => {
      let moodCounter = 0;
      let moodCounter1 = 0;
      let moodCounter2 = 0;
      let moodCounter3 = 0;
      let moodCounter4 = 0;
      let moodCounter5 = 0;
      let moodCounter6 = 0;
      let happyMood = document.getElementById("happyMood");
      let sadMood = document.getElementById("sadMood");
      let angryMood = document.getElementById("angryMood");
      let cheerfulMood = document.getElementById("cheerfulMood");
      let nervousMood = document.getElementById("nervousMood");
      let peacefulMood = document.getElementById("peacefulMood");
      let optimisticMood = document.getElementById("optimisticMood");
      snapshot.docs.forEach((doc) => {
        console.log(doc.data().yourMood);
        switch (doc.data().yourMood) {
          case "0":
            moodCounter += 1;
            happyMood.innerText = moodCounter;
            break;
          case "1":
            moodCounter1 += 1;
            sadMood.innerText = moodCounter1;
            break;
          case "2":
            moodCounter2 += 1;
            angryMood.innerText = moodCounter2;
            break;
          case "3":
            moodCounter3 += 1;
            cheerfulMood.innerText = moodCounter3;
            break;
          case "4":
            moodCounter4 += 1;
            nervousMood.innerText = moodCounter4;
            break;
          case "5":
            moodCounter5 += 1;
            peacefulMood.innerText = moodCounter5;
            break;
          case "6":
            moodCounter6 += 1;
            optimisticMood.innerText = moodCounter6;
            break;
          default:
            console.log("Mood dont exists");
            break;
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
