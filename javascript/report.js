// importing navbar from component
import navbar from "../components/Navbar/navbar.js";
document.getElementById("navbar").innerHTML=navbar();
const initialCall=()=>{
  const user= JSON.parse(localStorage.getItem("userDetails"))||{};
  
  if (user.username) {
    document.getElementById("nav-username").innerText=user.username.split(" ")[0];
    document.getElementById("login_logout_button").innerText="Logout";
   
  } else {
    location.href="../Pages/login.html"
  }
}
initialCall();
// // targetting the button with id:-home_or_report and change the inner text to Home onclick it will be redirected to Home Page
const home=document.getElementById("home_or_report");
home.innerText="Home"
home.addEventListener("click",()=>{
  location.href="./index.html"
})
// getting users ,user and loggedIn from localStorage
const users= JSON.parse(localStorage.getItem('users'))||[];
const user = JSON.parse(localStorage.getItem("userDetails"))||{};
const loggedIn=localStorage.getItem('loggedIn')|| false;
// if user is loggedIn only then he can take quiz else he will redirected to login Page

  // handleLogout will set loggedIn as a false and will redirected to Login Page
  const handleLogout=()=>{
    localStorage.removeItem("userDetails");
    localStorage.setItem('loggedIn',false);
    location.href="../Pages/login.html"
  }
document.getElementById("login_logout_button").addEventListener('click',handleLogout);

// fiding user from a users Array
const detail=users.find(el=>el.email===user.email)

// checking if user doesn't have any Quiz then Some message will shown
if(detail.quizes.length===0){
  const h4=document.createElement('h4');
  h4.innerText="Report is Empty ,Please Take a Quiz";
  document.querySelector(".container").append(h4);
}

// calculate no. of correct Questions
const correctQuestions=(arr)=>{
  let a=0;
  arr.map((el)=>{
    if(el.choosed){
      if(el.choosed===el.answer){
        a++;
      }

    }
  })
  return a;
}

// card of the quiz
const displayCard=(el)=>{
  const div=document.createElement('div');
  div.setAttribute("id","card");
      const p1 = document.createElement('p');
      
      p1.innerText=`Total Questions : ${el.attempted.length + el.skipped.length}`

      const p2 = document.createElement('p');

      p2.innerText=`Attempted Questions : ${el.attempted.length}`
      
      const p3 = document.createElement('p');

      p3.innerText=`Skipped Qusetions : ${el.skipped.length}`

      const p4 = document.createElement('p');
      
      p4.innerText=`Correct Questions : ${correctQuestions(el.attempted)}`

      const p5 = document.createElement('p');
      
      p5.innerText=`Incorrect Questions : ${Math.abs(correctQuestions(el.attempted)-el.attempted.length)}`
      const button= document.createElement('button');
      button.innerText="Details";
      button.addEventListener('click',()=>{
        showDetails(el);
        document.getElementById("preview-popup").style.display="block";
      })
      div.append(p1,p2,p3,p4,p5,button)
      document.querySelector(".container").append(div);
}
// display the report of the Quiz
const display=()=>{
detail.quizes.map(el=>displayCard(el));
}

  // single Card of the details
const showData =(el,i)=>{
const card= document.createElement('div');
const h3=document.createElement('h3');
h3.innerText=`Q ${i+1} :- ${el.question}`;
const div= document.createElement('div');
const p1=document.createElement('p');
p1.innerText=`Correct option :- ${el.answer}`
div.append(p1);
if(el.choosed){
  const p2=document.createElement('p');
  p2.innerText= `Choosed option :- ${el.choosed}`;
  div.append(p2);
}
const p3=document.createElement('p');
if(el.choosed){
  if(el.choosed==el.answer){
    p3.innerText=`Correct`
    p3.style.color="green"
  }
  else{
    p3.innerText=`Incorrect`
    p3.style.color="red"
  }
}
else{
  p3.innerText=`Not Attempted`
  p3.style.color="orange"
}
p3.style.fontWeight="900"
div.append(p3);
card.append(h3,div);
document.getElementById("popup_data").append(card);
}

// display the details of the Quiz
  const showDetails=(el)=>{
    let allQuestions=[...el.attempted,...el.skipped];
    document.getElementById("popup_data").innerHTML="";
    allQuestions.map((el,i)=>{
  showData(el,i)
    })
  }
  // close the pop_up
document.getElementById("close_popup").addEventListener("click",()=>{
  document.getElementById("preview-popup").style.display="none";
})

// handle Take Quiz 
document.getElementById("takeQuiz").addEventListener("click",()=>{
  location.href="../index.html"
})
display();
