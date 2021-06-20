auth.onAuthStateChanged((u) => {
  if (u == null) {
    window.location.href = "auth.html";
  }
});
