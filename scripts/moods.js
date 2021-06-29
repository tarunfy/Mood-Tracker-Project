// Getting dom elements:
const cardsContainer = document.getElementById("cards");
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
  let date = document.createElement("h6");
  let time = document.createElement("h5");
  let mood = document.createElement("h5");
  let note = document.createElement("p");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  let editlink = document.createElement("a");
  let deletelink = document.createElement("a");

  cardDiv.setAttribute("id", "card");
  cardDiv.setAttribute("data-id", Mood.id);
  cardContentDiv.setAttribute("id", "card-content");
  date.setAttribute("id", "date");
  time.setAttribute("id", "time");
  mood.setAttribute("id", "mood");
  note.setAttribute("id", "note");
  editButton.setAttribute("id", "edit-btn");
  editButton.classList.add("button");
  deleteButton.classList.add("button");
  deleteButton.setAttribute("id", "delete-btn");
  editlink.setAttribute("href", `update-mood.html?id=${Mood.id}`);

  date.innerText = Mood.data().date;
  time.innerText = Mood.data().time;
  mood.innerText = appMoods[Mood.data().yourMood];
  note.innerText = Mood.data().Note;
  editlink.innerText = "Edit";
  deletelink.innerText = "Delete";

  editButton.appendChild(editlink);
  deleteButton.appendChild(deletelink);
  cardContentDiv.appendChild(date);
  cardContentDiv.appendChild(time);
  cardContentDiv.appendChild(mood);
  cardContentDiv.appendChild(note);
  cardContentDiv.appendChild(editButton);
  cardContentDiv.appendChild(deleteButton);
  cardDiv.appendChild(cardContentDiv);
  cardsContainer.appendChild(cardDiv);

  editButton.addEventListener("click", () => {
    window.location.href = `update-mood.html?id=${Mood.id}`;
  });

  deleteButton.addEventListener("click", async (e) => {
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
