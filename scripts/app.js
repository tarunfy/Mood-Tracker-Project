// Selecting dom elements:
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const loginBtn = document.querySelector("#login-btn");
const regBtn = document.querySelector("#register-btn");
const regLink = document.querySelector("#register-link");
let regToastHTML =
  '<span class="toast-text-styling ">Unable to register user. Please try again</span>';
let loginToastHTML =
  '<span class="toast-text-styling ">User does not exist</span>';
const elements = [emailInput, passwordInput, loginBtn, regBtn, regLink];

let state = "idle";

function setState(newState) {
  state = newState;
  let disabled = false;

  switch (state) {
    case "loading":
      disabled = true;
      break;
    case "success":
      break;
    case "error":
      break;
    default:
      break;
  }

  elements.forEach((e) => {
    e.disabled = disabled;
  });
  console.log("Current State: " + state);
}

// Event listners:
regBtn.addEventListener("click", () => {
  setState("loading");
  regBtn.innerText = "Loading...";

  //PERFORM REGISTR

  setTimeout(() => {
    setState("error");
    regBtn.innerText = "Register";
    M.toast({
      html: regToastHTML,
      classes: "rounded toast",
    });
  }, 5000);
});

// Event listners:
loginBtn.addEventListener("click", () => {
  setState("loading");
  loginBtn.innerText = "Loading...";

  const email = emailInput.value;
  const password = passwordInput.value;

  console.log(email, password);

  //PERFORM REGISTR

  setTimeout(() => {
    setState("error");
    loginBtn.innerText = "Login";
    M.toast({
      html: loginToastHTML,
      classes: "rounded toast",
    });
  }, 5000);
});
