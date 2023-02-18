
const loggedIn=localStorage.getItem('loggedIn')|| false;
const user= JSON.parse(localStorage.getItem("userDetails"))||{};
console.log(loggedIn);
if(loggedIn){
document.getElementById("login_logout_button").innerText="Logout";
document.getElementById("nav-username").innerText=user.username.split(" ")[0];
}
else{
    document.getElementById("login_logout_button").innerText="Login";
    document.getElementById("quiz_start_button").disabled=true; 
}

const  handleStartQuiz= (e)=>{
    console.log(e.target);
}
document.getElementById("quiz_start_button").addEventListener("click",handleStartQuiz)