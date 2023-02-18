import {data} from '../quizData/data.js'
import navbar from "../components/Navbar/navbar.js";

document.getElementById("navbar").innerHTML=navbar();
const report=document.getElementById("home_or_report");
report.innerText="Report"
report.addEventListener("click",()=>{
  location.href="./report.html"
})
const users =JSON.parse(localStorage.getItem("users"))||[];
const loggedIn=localStorage.getItem('loggedIn')|| false;
const user= JSON.parse(localStorage.getItem("userDetails"))||{};
const quantity=localStorage.getItem("quantity")||5;
const obj={
attempted:[],
skipped:[],
}
const arr=data.splice(0,quantity);
let index=1;
if(loggedIn){
document.getElementById("login_logout_button").innerText="Logout";
document.getElementById("nav-username").innerText=user.username.split(" ")[0];
}
else{
    document.getElementById("login_logout_button").innerText="Login";
    document.getElementById("quiz_start_button").disabled=true; 
    location.href="../Pages/login.html"
}
const handleLogout=()=>{
  localStorage.setItem('loggedIn',false);
  location.href="../Pages/login.html"
}
document.getElementById("login_logout_button").addEventListener('click',handleLogout)
document.getElementById("question_select_tag").addEventListener('change',(e)=>{
localStorage.setItem("quantity",Number(e.target.value));
})
// document.getElementById("quiz-container").style.display="none";
const finshTest=()=>{
 const newUsers = users.map((el)=>{
    if(el.email===user.email){
  el.quizes.push(obj);
    }
 })
 localStorage.setItem("users",JSON.stringify(users))
 location.href="./report.html"
}


const  handleStartQuiz= (e)=>{
    document.getElementById("quiz-container").style.display="block";
    document.getElementById("quiz_start_button").style.display="none";
    document.getElementById("select_questions").style.display="none";
}
document.getElementById("quiz_start_button").addEventListener("click",handleStartQuiz);

function checkAnswer() {
    let answer = "";
    let radios = document.getElementsByName("answer");
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        answer = radios[i].value;
        break;
      }
     
    }
    return answer;
   
  }
const nextQuestion=()=>{ 
obj.attempted.push({...arr[index-1],choosed:checkAnswer()});
    if(index===arr.length-1){
        document.getElementById("submit-button").innerText="Finish";
        showQuestion(index);
        index++;
    }
   else if(index===arr.length){
       finshTest();
    }
    else{
    showQuestion(index);
    index++;
    }
   
}

  const skipQuestion=()=>{
    obj.skipped.push(arr[index-1]);
    if(index===arr.length-1){
        document.getElementById("submit-button").innerText="Finish";
        showQuestion(index);
        index++;
    }
   else if(index===arr.length){
       finshTest();
   
    }
    else{   
        showQuestion(index);
        index++;
    }
  }

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
const showQuestion=(i)=>{
    document.getElementById('quiz-question').innerHTML=""
    const qustionDetails = arr[i];
    const p = document.createElement('p');
    p.innerText = qustionDetails.question;
    p.setAttribute("class", "question-text");
    
    const labels = [];
    
    const shuffledChoices = shuffleArray(qustionDetails.choices);
    
    for (let j = 0; j < 4; j++) {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = "radio";
        input.value = shuffledChoices[j];
        input.name = "answer";
        
        label.appendChild(input);
        label.appendChild(document.createTextNode(shuffledChoices[j]));
      
        labels.push(label);
      }
      
    
    const quizContainer = document.getElementById('quiz-question');
    quizContainer.append(p);
    
    for (let j = 0; j < 4; j++) {
      quizContainer.append(labels[j]);
    }
    
}

showQuestion(0);
document.getElementById("submit-button").addEventListener("click",nextQuestion);
document.getElementById("next-button").addEventListener("click",skipQuestion);

