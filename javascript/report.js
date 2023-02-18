const users= JSON.parse(localStorage.getItem('users'))||[];
const user = JSON.parse(localStorage.getItem("userDetails"))||{};
const detail=users.find(el=>el.email===user.email)
const display=()=>{
detail.quizes.map(el=>displayCard(el));
}

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
        div.append(p1,p2,p3,p4,p5)
        const button= document.createElement('button');
        button.innerText="Details";
        button.addEventListener('click',()=>{
          showDetails(el);
        })
        document.querySelector(".container").append(div,button);
  }
//   answer
// : 
// "Tokyo"
// choices
// : 
// ["Osaka", "Kyoto", "Tokyo", "Hiroshima"]
// choosed
// : 
// "Kyoto"
// question
// : 
// "What is the capital of Japan?
const showData =(el)=>{
const card= document.createElement('div');
const h3=document.createElement('h3');
h3.innerText=`Q :- ${el.question}`;
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
  }
  else{
    p3.innerText=`Incorrect`
  }
}
else{
  p3.innerText=`Not Attempted`
}
div.append(p3);
}
  const showDetails=(el)=>{
    let allQuestions=[...el.attempted,...el.skipped];
    allQuestions.map((el)=>{
  showData(el)
    })
  }
// Get the preview button and preview container elements
// const mixedArray=[...]

display();