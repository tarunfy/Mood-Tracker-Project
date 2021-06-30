// Getting dom elements:
const signoutBtn = document.querySelector(".signout-btn");
const cardsContainer = document.getElementById("cards");
const floatBtn = document.getElementById("floating-btn");
let userId;
const appMoods = {
  0: "Happy",
  1: "Sad",
  2: "Angry",
  3: "Cheerful",
  4: "Nervous",
  5: "Peaceful",
  6: "Optimistic",
};
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
        renderCard(mood);
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
});

function renderCard(Mood) {
  let cardDiv = document.createElement("div");
  let cardContentDiv = document.createElement("div");
  let topDiv = document.createElement("div");
  let midDiv = document.createElement("div");
  let bottomDiv = document.createElement("div");
  let buttonsDiv = document.createElement("div");
  let date = document.createElement("p");
  let time = document.createElement("p");
  let mood = document.createElement("p");
  let note = document.createElement("p");
  let editlink = document.createElement("a");
  let deletelink = document.createElement("a");

  cardDiv.setAttribute("id", "card");
  cardDiv.setAttribute("data-id", Mood.id);
  cardContentDiv.setAttribute("id", "card-content");
  topDiv.classList.add("top");
  midDiv.classList.add("mid");
  bottomDiv.classList.add("bottom");
  buttonsDiv.classList.add("buttons");
  date.setAttribute("id", "date");
  time.setAttribute("id", "time");
  mood.setAttribute("id", "mood");
  note.setAttribute("id", "note");
  editlink.setAttribute("href", `update-mood.html?id=${Mood.id}`);

  date.innerText = Mood.data().date;
  time.innerText = Mood.data().time;
  mood.innerText = appMoods[Mood.data().yourMood];
  note.innerText = Mood.data().Note;
  // editlink.innerText = "Edit";
  editlink.innerHTML = `<i class="material-icons small">create</i>`;
  deletelink.innerHTML = `<i class="material-icons small">clear</i>`;
  // deletelink.innerText = "Delete";

  buttonsDiv.appendChild(editlink);
  buttonsDiv.appendChild(deletelink);
  bottomDiv.appendChild(time);
  bottomDiv.appendChild(buttonsDiv);
  midDiv.appendChild(note);
  topDiv.appendChild(date);
  topDiv.appendChild(mood);
  cardContentDiv.appendChild(topDiv);
  cardContentDiv.appendChild(midDiv);
  cardContentDiv.appendChild(bottomDiv);
  cardDiv.appendChild(cardContentDiv);
  cardsContainer.appendChild(cardDiv);

  editlink.addEventListener("click", () => {
    window.location.href = `update-mood.html?id=${Mood.id}`;
  });

  deletelink.addEventListener("click", async (e) => {
    let id = cardDiv.getAttribute("data-id");
    await db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("moods")
      .doc(id)
      .delete();
    window.location.reload();
  });
}

floatBtn.addEventListener("click", (e) => {
  window.location.href = "add-mood.html";
});

function logout() {
  auth.signOut();
}

signoutBtn.addEventListener("click", logout);
