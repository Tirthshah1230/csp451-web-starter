const DEMO_USER = {
  email: "student@example.com",
  password: "Password123",
  displayName: "CSP-451 Student",
};

function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

function validateCredentials(email, password) {
  const errors = [];

  const normalizedEmail = normalizeEmail(email);
  const suppliedPassword = String(password || "");

  if (!normalizedEmail) {
    errors.push("Email is required.");
  }

  if (normalizedEmail.length > 150) {
    errors.push("Email must be 150 characters or fewer.");
  }

  if (!normalizedEmail.includes("@")) {
    errors.push("A valid email address is required.");
  }

  if (!suppliedPassword) {
    errors.push("Password is required.");
  }

  if (suppliedPassword.length < 6) {
    errors.push("Password must contain at least 6 characters.");
  }

  if (suppliedPassword.length > 128) {
    errors.push("Password must contain no more than 128 characters.");
  }

  return {
    valid: errors.length === 0,
    errors,
    email: normalizedEmail,
    password: suppliedPassword,
  };
}

function authenticate(email, password) {
  const validation = validateCredentials(email, password);

  if (!validation.valid) {
    return {
      success: false,
      status: 400,
      error: validation.errors[0],
    };
  }

  const emailMatches = validation.email === DEMO_USER.email;
  const passwordMatches = validation.password === DEMO_USER.password;

  if (!emailMatches || !passwordMatches) {
    return {
      success: false,
      status: 401,
      error: "Invalid email or password.",
    };
  }

  return {
    success: true,
    status: 200,
    user: {
      email: DEMO_USER.email,
      displayName: DEMO_USER.displayName,
    },
    message: `Welcome, ${DEMO_USER.displayName}.`,
  };
}

module.exports = {
  authenticate,
  normalizeEmail,
  validateCredentials,
};