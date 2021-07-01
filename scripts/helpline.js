// Getting reference to dom elements
const cardsContainer = document.getElementById("cards");

db.collection("helplines")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      renderCard(doc);
    });
  });
function renderCard(helplineDoc) {
  let cardDiv = document.createElement("div");
  let cardContentDiv = document.createElement("div");
  let topDiv = document.createElement("div");
  let midDiv = document.createElement("div");
  let bottomDiv = document.createElement("div");

  let organisation = document.createElement("h3");
  let contactEmail = document.createElement("p");
  let address = document.createElement("p");

  cardDiv.setAttribute("id", "card");
  cardDiv.setAttribute("data-id", helplineDoc.id);
  cardContentDiv.setAttribute("id", "card-content");
  topDiv.classList.add("top");
  midDiv.classList.add("mid");
  bottomDiv.classList.add("bottom");

  organisation.setAttribute("id", "org");
  contactEmail.setAttribute("id", "contactEmail");
  address.setAttribute("id", "address");

  organisation.innerText = helplineDoc.data().organisation;
  contactEmail.innerText = helplineDoc.data().contact_email;
  address.innerText = helplineDoc.data().address;

  bottomDiv.appendChild(contactEmail);
  midDiv.appendChild(address);
  topDiv.appendChild(organisation);

  cardContentDiv.appendChild(topDiv);
  cardContentDiv.appendChild(midDiv);
  cardContentDiv.appendChild(bottomDiv);
  cardDiv.appendChild(cardContentDiv);
  cardsContainer.appendChild(cardDiv);
}
