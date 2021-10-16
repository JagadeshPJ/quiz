//Start of the document

//Function to fetch data from api
async function fetchData()
{
  let url='https://opentdb.com/api.php?amount=10&type=multiple';
  try 
  {
    let res = await fetch(url);
    return await res.json();
  } 
  catch (error) 
  {
    console.log(error);
  }
}
//Main logic
async function quizzer()
{
    let data= await fetchData();
    //console.log(data);
    let bodyDiv=document.getElementById("body");
    var oriRes=[];
    let source=data["results"];
    var i=0;
    source.forEach( (ele) => {
    var content=document.createElement("div");
    content.setAttribute("id","content");
    content.innerHTML=`<b id="category">${ele["category"]}</b><br>`;
    content.innerHTML+=`<b>Question : <br></b>${ele["question"]}`;
    var arr=[];
    arr.push(ele["correct_answer"]);
    oriRes.push(ele["correct_answer"]);
    ele["incorrect_answers"].forEach( (ele) =>{
    arr.push(ele);}
    );
    //Shuffle the order of values inside the array
    shuffle(arr);
      //Form to option the choices
    let form=document.createElement("div");
    
    let op1=document.createElement("input");
    op1.setAttribute("id","op1");
    op1.setAttribute("type","radio");
    op1.setAttribute("name",`choice+${i}`);
    op1.setAttribute("value",`${arr[0]}`);
    let l1=document.createElement("label");
    l1.innerHTML=` `+arr[0]+`<br>`;
    l1.setAttribute("class","block");

    let op2=document.createElement("input");
    op2.setAttribute("id","op2");
    op2.setAttribute("type","radio");
    op2.setAttribute("name",`choice+${i}`);
    op2.setAttribute("value",`${arr[1]}`);
    let l2=document.createElement("label");
    l2.innerHTML=` `+arr[1]+`<br>`;
    l2.setAttribute("class","block");

    let op3=document.createElement("input");
    op3.setAttribute("id","op3");
    op3.setAttribute("type","radio");
    op3.setAttribute("name",`choice+${i}`);
    op3.setAttribute("value",`${arr[2]}`);
    let l3=document.createElement("label");
    l3.innerHTML=` `+arr[2]+`<br>`;
    l3.setAttribute("class","block");

    let op4=document.createElement("input");
    op4.setAttribute("id","op4");
    op4.setAttribute("type","radio");
    op4.setAttribute("name",`choice+${i}`);
    op4.setAttribute("value",`${arr[3]}`);
    let l4=document.createElement("label");
    l4.innerHTML=` `+arr[3]+`<br>`;
    l4.setAttribute("class","block");
    i++;

    form.appendChild(op1);
    form.appendChild(l1);
    form.appendChild(op2);
    form.appendChild(l2);
    form.appendChild(op3);
    form.appendChild(l3);
    form.appendChild(op4);
    form.appendChild(l4);

    content.appendChild(form);

    bodyDiv.appendChild(content);
    
    });
    //Submit button creation
    let btn=document.createElement("button");
    btn.setAttribute("class","btn btn-primary");
    btn.setAttribute("id","btn1");
    btn.innerHTML=`Submit`;

    btn.setAttribute("onclick",`calculateScore("${oriRes}")`);

    bodyDiv.appendChild(btn);
    

}
//Function to shuffle array elements
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

//Function to calculate the score
function calculateScore(oriRes)
{
    oriRes=oriRes.split(",");
    let temp=document.getElementById("body");
    temp.parentNode.removeChild(temp);
    var score=0;
    for (var k = 0; k < oriRes.length; k++)
    {
        let r="choice+"+k;
    var radios = document.getElementsByName(`${r}`);
    var val= "";
    for (var i = 0, length = radios.length; i < length; i++)
    {
        if (radios[i].checked)
        {
         val = radios[i].value; 
         break;
        }
    }
    //console.log("Val : "+val);
    //console.log("Res : "+oriRes[k]);
    if (val == oriRes[k] ) 
    {
        score=score+1;
    } 
    
    }
    console.log(oriRes);
    console.log(score);

    let sol=document.createElement("div");
    sol.setAttribute("id","sol");
    sol.setAttribute("class","container");
    sol.innerHTML=`Congrats!<br>`;
    sol.innerHTML+=`You have scored : <h1 id="sol1"><b>${score}</b></h1>`;

    let pp=document.getElementById("grand");
    pp.appendChild(sol);

}
//Parent function 
function getData() 
{
  //Grandparent element
  let grandDiv=document.createElement("container-fluid");
  grandDiv.setAttribute("class","bg-secondary");
  grandDiv.setAttribute("id","grand");

  //Header section
  let headerDiv=document.createElement("div");
  headerDiv.setAttribute("class","container-fluid row p-4 text-center");
  headerDiv.innerHTML=`Trivia game`;
  headerDiv.setAttribute("id","head");

  //Body section
  let bodyDiv=document.createElement("div");
  bodyDiv.setAttribute("id","body");

  let initial=document.createElement("div");
  initial.setAttribute("class","container-fluid row align-items-center");
  initial.setAttribute("id","initial");

  bodyDiv.appendChild(initial);
//Quiz button
  let btn=document.createElement("button");
  btn.setAttribute("class","btn btn-primary");
  btn.setAttribute("id","btn");
  btn.innerHTML=`Start Quiz!`;
  btn.setAttribute("onclick","startQuiz()");

  initial.appendChild(btn);
  
  grandDiv.appendChild(headerDiv);
  grandDiv.appendChild(bodyDiv);
  
  document.body.appendChild(grandDiv);
}
//Function to overwrite to start the quiz
function startQuiz()
{
    let temp=document.getElementById("initial");
    temp.parentNode.removeChild(temp);
    quizzer();

}

//Master function call
getData();

//End of the document