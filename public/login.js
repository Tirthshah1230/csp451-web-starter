const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const message = document.getElementById("message");
const loginButton = document.getElementById("loginButton");

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function clearErrors() {
  emailError.textContent = "";
  passwordError.textContent = "";
  message.textContent = "";
}

function validateForm(email, password) {
  let valid = true;

  if (!email) {
    emailError.textContent = "Email is required.";
    valid = false;
  } else if (!isValidEmail(email)) {
    emailError.textContent = "Enter a valid email address.";
    valid = false;
  } else if (email.length > 150) {
    emailError.textContent = "Email must be 150 characters or fewer.";
    valid = false;
  }

  if (!password) {
    passwordError.textContent = "Password is required.";
    valid = false;
  } else if (password.length < 6) {
    passwordError.textContent =
      "Password must contain at least 6 characters.";
    valid = false;
  } else if (password.length > 128) {
    passwordError.textContent =
      "Password must contain no more than 128 characters.";
    valid = false;
  }

  return valid;
}

async function submitLogin(email, password) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Login failed.");
  }

  return result;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearErrors();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!validateForm(email, password)) {
    message.textContent = "Please correct the highlighted fields.";
    return;
  }

  loginButton.disabled = true;
  loginButton.textContent = "Signing in...";
  message.textContent = "Checking your credentials...";

  try {
    const result = await submitLogin(email, password);
    message.textContent = result.message;
    form.reset();
  } catch (error) {
    message.textContent = error.message;
  } finally {
    loginButton.disabled = false;
    loginButton.textContent = "Sign in";
  }
});