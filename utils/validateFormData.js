function toProperCase(str) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

function isValidName(name) {
  // Allow letters, hyphens, and apostrophes
  const nameRegex = /^[A-Za-zÀ-ÿ '-]+$/;
  return nameRegex.test(name);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = { toProperCase, isValidName, isValidEmail };
