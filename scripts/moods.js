// Getting dom elements:
const ul = document.getElementById("mood-list");
let userId;
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
  let cross = document.createElement("div");

  listItem.setAttribute("data-id", moodId);
  link.setAttribute("class", "collection-item");
  link.setAttribute("href", `update-mood.html?id=${moodId}`);
  link.innerText = moodId;
  cross.innerText = "x";

  listItem.appendChild(link);
  listItem.appendChild(cross);
  ul.appendChild(listItem);

  cross.addEventListener("click", async (e) => {
    let id = link.innerText;
    await db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("moods")
      .doc(id)
      .delete();
    window.location.reload();
  });
}
