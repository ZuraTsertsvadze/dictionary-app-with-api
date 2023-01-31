"use strict"

const searchInput = document.querySelector(".search-input");
const searchBut = document.querySelector(".search");
const wordCont = document.querySelector(".words-cont");




const render=(data)=>{




    for (let i = 0; i < data.length; i++) {



        const div = document.createElement("div");

        wordCont.appendChild(div);

        //here rendering object on screen

        div.insertAdjacentHTML("afterbegin",
            `  <div class='word'>
         <div class='dictionary'>
            <div class=caunter-cont> 
            
            <span class='real-word'></span> 
            <span class="counter">
            <span class="part">1</span>of
            <span class="total">2</span>
            </span>
            
            </div>
           <span class='transcription'></span>
 
         </div>

         <div class='audio'>

             <div class='play'></div>


     </div>

     </div>

     `);

        //here you can display words from api 
        const word = document.querySelectorAll(".real-word");
        const transcription = document.querySelectorAll(".transcription");




        if (data[i].word) {
 
            word[i].innerHTML = data[i].word


        } else {
            return
        };




        if (data[i].phonetic) {

            transcription[i].innerHTML = data[i].phonetic


        } else {
   transcription[i].innerHTML = " ";
        };






    }



    const total = document.querySelectorAll(".total");
    const part = document.querySelectorAll(".part");
    
    console.log(total.length)
    
    const counterDict = () => {
    
    
    
        total.forEach((el)=>{
    
         el.innerHTML =total.length
    
        })
    
    
        part.forEach((el,i)=>{
    
          el.innerHTML=i+1
    
        })
    
        
    }
    
    counterDict()
    







  




}



























searchBut.addEventListener("click", (e) => {
    e.stopPropagation();
    render;

    

    const request = new XMLHttpRequest();
   

    request.addEventListener("readystatechange", () => {


        if (request.readyState === 4 && request.status === 200) {

           
            const data = JSON.parse(request.responseText);

            render(data);
            const total = document.querySelectorAll(".total");
            console.log(total.length)

console.log(total.length)
        } else if (request.readyState === 4) {

            console.log("fail");

        }
    })

    request.open("GET", `https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput.value}`);

    request.send();





    //reseter
    const sectiionCont = document.querySelectorAll(".word");



    sectiionCont.forEach((el) => {

        el.parentNode.removeChild(el);



    })




})






console.log(total.length)