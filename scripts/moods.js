// Getting dom elements:
const ul = document.getElementById("mood-list");

auth.onAuthStateChanged((u) => {
  if (u == null) {
    return (window.location.href = "auth.html");
  }
  // Getting back the data from firestore:
  db.collection("users")
    .doc(u.uid)
    .collection("moods")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((mood) => {
        renderList(mood.id);
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
});

function renderList(moodId) {
  let link = document.createElement("a");
  let listItem = document.createElement("li");

  link.setAttribute("class", "collection-item");
  link.setAttribute("href", `update-mood.html?id=${moodId}`);
  link.innerText = moodId;

  listItem.appendChild(link);
  ul.appendChild(listItem);
}
