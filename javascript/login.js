
// users is a array of all the signup users 
const users=JSON.parse(localStorage.getItem("users"))||[];


// handle login validate the email and pasword after successfull validation user will redirected to home page
const handleLogin = ()=>{
    event.preventDefault();
    const email= document.getElementById("email").value;
    const password=document.getElementById("password").value;
    
    const user= users.find(el=>el.email===email);
    console.log(user);
   if(user){
     if(user.password===password){
        localStorage.setItem("loggedIn",true);
        localStorage.setItem("userDetails",JSON.stringify(user));
        alert("Successfully Login");
        location.href="/index.html"
    }
    else{
        alert("email or passowrd is Incorrect")
     }
   }
   else{
    alert("user doesn't exist first signup");
   }
}
// form invoked handleLogin function on submit
document.getElementById("login-form").addEventListener("submit",handleLogin);