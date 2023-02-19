// getting the users array if  exist in localStorage else take an empty array
const users = JSON.parse(localStorage.getItem("users")) || [];

// this function store the userData in users array and after that this array stored in localStorage
const handleSubmit = () => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // obj is a user schema which is stored in users array
  const obj = {
    email: email,
    username: username,
    password: password,
    quizes: [],
  };

  users.push(obj);

  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("email").value = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  location.href = "./login.html";
};

document.getElementById("signup-form").addEventListener("submit", handleSubmit);
