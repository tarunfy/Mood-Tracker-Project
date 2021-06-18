// Selecting dom elements:
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const loginBtn = document.querySelector("#login-btn");
const regBtn = document.querySelector("#register-btn");
const regLink = document.querySelector("#register-link");
const saveAndExitBtn = document.querySelector("#save-exit");
let regErrorToastHTML;
let loginErrorToastHTML;
let loginSuccessToastHTML =
  '<span class="toast-text-styling ">Logged In</span>';
let regSuccessToastHTML =
  '<span class="toast-text-styling ">User has been registered</span>';
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

// New Registration:
regBtn.addEventListener("click", () => {
  setState("loading");
  regBtn.innerText = "Loading...";

  const email = emailInput.value;
  const password = passwordInput.value;
  //PERFORM REGISTER
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((info) => {
      setState("success");
      regBtn.innerText = "Register";
      M.toast({
        html: regSuccessToastHTML,
        classes: "rounded toast",
      });
      emailInput.value = "";
      passwordInput.value = "";
    })
    .catch((error) => {
      setState("error");
      regBtn.innerText = "Register";
      regErrorToastHTML = `<span class="toast-text-styling ">${error.message}</span>`;
      M.toast({
        html: regErrorToastHTML,
        classes: "rounded toast",
      });
      emailInput.value = "";
      passwordInput.value = "";
    });
});

// User Login
loginBtn.addEventListener("click", () => {
  setState("loading");
  loginBtn.innerText = "Loading...";

  const email = emailInput.value;
  const password = passwordInput.value;

  //PERFORM LOGIN
  auth
    .signInWithEmailAndPassword(email, password)
    .then((info) => {
      setState("success");
      loginBtn.innerText = "Login";
      M.toast({
        html: loginSuccessToastHTML,
        classes: "rounded toast",
      });
      emailInput.value = "";
      passwordInput.value = "";
    })
    .catch((error) => {
      setState("error");
      loginBtn.innerText = "Login";
      loginErrorToastHTML = `<span class="toast-text-styling ">${error.message}</span>`;
      M.toast({
        html: loginErrorToastHTML,
        classes: "rounded toast",
      });
      emailInput.value = "";
      passwordInput.value = "";
    });
});

saveAndExitBtn.addEventListener("click", helplineToast);

regLink.addEventListener("click", () => {
  setState("loading");
  let elems = document.querySelector(".modal");
  let instances = M.Modal.init(elems, {
    endingTop: "20%",
  });
  instances.open();
});

// Functions:

function helplineToast() {
  setTimeout(() => {
    M.toast({
      html: '<span class="toast-text-styling ">Successfully resgitered as helpline</span>',
      classes: "rounded toast",
    });
    setState("success");
  }, 300);
}
