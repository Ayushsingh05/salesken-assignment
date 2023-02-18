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
          document.getElementById("preview-popup").style.display="block";
        })
        document.querySelector(".container").append(div,button);
  }
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
  const showDetails=(el)=>{
    let allQuestions=[...el.attempted,...el.skipped];
    // console.log(allQuestions);
    document.getElementById("popup_data").innerHTML="";
    allQuestions.map((el,i)=>{
  showData(el,i)
    })
  }
document.getElementById("close_popup").addEventListener("click",()=>{
  document.getElementById("preview-popup").style.display="none";
})

display();