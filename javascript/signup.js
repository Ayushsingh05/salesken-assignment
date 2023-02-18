

const users= JSON.parse(localStorage.getItem("users"))||[];



const handleSubmit=()=>{
event.preventDefault();
const email=document.getElementById("email").value;
const username=document.getElementById("username").value;
const password=document.getElementById("password").value;

const obj={
    email:email,
    username:username,
    password:password,
    quizes:[]
}

users.push(obj);

localStorage.setItem("users",JSON.stringify(users));

document.getElementById("email").value="";
document.getElementById("username").value="";
document.getElementById("password").value="";
location.href="./login.html";
}
document.getElementById("signup-form").addEventListener('submit',handleSubmit);
