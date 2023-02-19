"use strict"

const searchInput = document.querySelector(".search-input");
const searchBut = document.querySelector(".search");
const inputCont = document.querySelector(".input-cont");

const wordCont = document.querySelector(".words-cont");
const arrowDown = document.querySelector(".arrow-down")
const dropDownCont = document.querySelector(".drop-down-cont")
const sansSerif = document.querySelector(".one")

const serif = document.querySelector(".two")
const mono = document.querySelector(".three")
const all = document.querySelectorAll("*")
const circle = document.querySelector(".circle")

const switchCont = document.querySelector(".swicher-cont")
const darkCont = document.querySelector(".dark-cont")
const body = document.querySelector(".body")
const navText = document.querySelector(".nav-text")


const render = (data) => {




    for (let i = 0; i < data.length; i++) {



        const div = document.createElement("div");

        div.classList.add("empty")

        wordCont.appendChild(div);

        //here rendering object on screen

        div.insertAdjacentHTML("afterbegin",
            `  <div class='word'>
         <div class='dictionary'>
            <div class=caunter-cont> 
            
            <span class='real-word'></span> 
            <span class="counter">
            <span class="part">1</span> of
            <span class="total">2</span>
            </span>
            
            </div>
           <span class='transcription'></span>
 
         </div>

         <div class='audio'>

             <div class='play'> </div>


        </div>

     </div>


     <div class="meaning-cont">

     
     </div>

     `);



        const word = document.querySelectorAll(".real-word");
        const transcription = document.querySelectorAll(".transcription");

        //here you can display words from api 
        const wordRender = () => {

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


        wordRender();


    }



    const total = document.querySelectorAll(".total");
    const part = document.querySelectorAll(".part");

    // function to count meaning numbers 
    const counterDict = () => {


        total.forEach((el) => {

            el.innerHTML = total.length

        })


        part.forEach((el, i) => {

            el.innerHTML = i + 1

        })


    };


    counterDict();




    //function to get  audio of words from api
    const audioRender = () => {

        const playButton = document.querySelectorAll(".audio")


        const arrayphonetic = [];

        const arraySound = [];




        data.forEach((el) => {

            if (el.phonetics.length !== 0) {

                arrayphonetic.push(el.phonetics)

            }


        })



        arrayphonetic.forEach((el) => {


            el.forEach((el) => {


                if (el.audio.length !== 0) (

                    arraySound.push(el.audio)

                )


            })



        })



        for (let i = 0; i < data.length; i++) {





            if (data[i].phonetics?.[i] !== undefined) {




                const audioError = new Audio(`${arraySound[0]}`)


                playButton[i].onclick = () => {

                    audioError.play();

                }




            } else {

                const audio = new Audio(`${arraySound[0]}`);


                playButton[i].addEventListener("click", () => {


                    audio.play();



                })
            }





        }


    }


    audioRender();




    const meaningCont = document.querySelectorAll(".meaning-cont")

    /* get grammar types from api*/
    const grammar = () => {

        for (let i = 0; i < data.length; i++) {

            const meaning = data[i].meanings;


            meaning.forEach((el) => {

                meaningCont[i].innerHTML += `<div class="gram-cont">

             <div class="grammar">${el.partOfSpeech} </div>

            

                <div class="line"></div>
               
                </div>
 
                <div class="lable">Meaning</div>

                <div class="definition-cont"> </div>
                
                
            <div class="flex-box">

           

            <div class="synonyms"></div>

            </div>


            <div class="flex-box">

           

            <div class="antonyms"></div>

            </div>

                `

            })



        }



    }


    grammar();

    /*get definition and explain from api */

    const renderDefintionExplain = () => {

        const definitionElement = document.querySelectorAll(".definition-cont")
        const grammarAll = document.querySelectorAll(".grammar")

        //definition and explain

        data.forEach((dataEl, dataIndex) => {

            grammarAll.forEach((grammarAllElement, grammarAllIndex) => {


                data[dataIndex].meanings?.forEach((meaningElement, meaningIndex) => {

                    if (grammarAll[grammarAllIndex].textContent.trim() === data[dataIndex].meanings[meaningIndex].partOfSpeech) {


                        const definitionApi = data[dataIndex].meanings[meaningIndex].definitions

                        definitionApi?.forEach((definitionApiElement, definitionApiIndex) => {

                            if (definitionApiElement.example) {

                                definitionElement[grammarAllIndex].innerHTML += `
                            <div class="definition">  <div class="circle-text"></div>${definitionApiElement.definition}</div>
                            <div class="example"> "${definitionApiElement.example}"</div>
                            
                            `

                            } else {

                                definitionElement[grammarAllIndex].innerHTML += ` <div class="definition"><div class="circle-text"></div>${definitionApiElement.definition}</div> `

                            }




                        })


                    }




                })



            })




        })

    }

    renderDefintionExplain();

    /*function to get synonyms and antonyms from api*/

    const renderSynoAntoApi = () => {
        const synonimElement = document.querySelectorAll(".synonyms")

        data.forEach((el, dataIndex) => {


            data[dataIndex]?.meanings.forEach((el, meaningIndex) => {


                const synonimsApi = data[dataIndex].meanings[meaningIndex].synonyms;

                if (synonimsApi.length !== 0) {


                    synonimsApi.forEach((synonims, synonimsIndex) => {

                        synonimElement[meaningIndex].innerHTML += `<span class="synonims-one"> ${synonims}</span>`


                    })


                    synonimElement[meaningIndex].parentElement.innerHTML += `<span class="synonyms-lable">Synonims</span> `;




                }

                const antonymsApi = data[dataIndex].meanings[meaningIndex].antonyms;
                const antonymsElement = document.querySelectorAll(".antonyms")

                if (antonymsApi.length !== 0) {


                    antonymsApi.forEach((antonyms, antonimsIndex) => {

                        antonymsElement[meaningIndex].innerHTML += `<span class="antonyms-one"> ${antonyms}</span>`


                    })

                    antonymsElement[meaningIndex].parentElement.innerHTML += `<span class="synonyms-lable">Antonyms</span> `




                }





            })



        })


    }

    renderSynoAntoApi();


    /* function to render synonyms and antonyms meanings on click*/
    const toRenderSynonimAndAntonimMeaning = () => {

        const synonymsNodeList = document.querySelectorAll(".synonims-one");

        const antonymsNodeList = document.querySelectorAll(".antonyms-one");


        for (const synonym of synonymsNodeList) {

            synonym.addEventListener("click", () => {

                request(synonym.textContent.trim())


            })

        }


        for (const antonym of antonymsNodeList) {

            antonym.addEventListener("click", () => {

                request(antonym.textContent.trim())


            })

        }
    }

    toRenderSynonimAndAntonimMeaning();


    /* to get dark style on unrendered elements*/
    const darkThemeUnrendered = () => {

        const realWord = document.querySelectorAll(".real-word")
        const definition = document.querySelectorAll(".definition");
        const audio = document.querySelectorAll(".audio");
        const counter = document.querySelectorAll(".counter");
        const grammarAll = document.querySelectorAll(".grammar")



        if (darkCont.classList.contains("active")) {


            for (const gram of grammarAll) {

                gram.style.color = "white"
            }

            for (const definitionOne of definition) {

                definitionOne.style.color = "white"
            }

            for (const el of counter) {

                el.style.color = "white"
            }

            for (const el of part) {

                el.style.color = "white"
            }


            for (const el of total) {

                el.style.color = "white"
            }


            for (const word of realWord) {

                word.style.color = "white"
            }



            for (const sound of audio) {

                sound.style.backgroundColor = "rgb(41,16,58)"

            }


            searchInput.style.color = "white"




        } else {

            searchInput.style.color = "black"



            for (const gram of grammarAll) {

                gram.style.color = "black"
            }

            for (const word of realWord) {

                word.style.color = "black"
            }


            for (const definitionOne of definition) {

                definitionOne.style.color = "black"
            }



            for (const sound of audio) {

                sound.style.backgroundColor = "rgb(233,209,251)";

            }



            for (const el of counter) {

                el.style.color = "black"
            }


            for (const el of part) {

                el.style.color = "black"
            }


            for (const el of total) {

                el.style.color = "black"
            }











        }


    }


    darkThemeUnrendered();




}




//this function is hosted in render  function and are making request
function request(value) {


    const request = new XMLHttpRequest();

    request.open("GET", `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`);

    request.send();



    request.addEventListener("readystatechange", () => {


        if (request.readyState === 4 && request.status === 200) {


            const data = JSON.parse(request.responseText);
            render(data);

            searchValueCatche = value;

        } else if (request.readyState === 4) {

            wordCont.innerHTML=" no"
            wordCont.style.fontSize=" 200px"
            wordCont.style.color=" red"
            wordCont.style.textAlign=" center"

       

        }


    })


    //to  reseter page
    const sectiionCont = document.querySelectorAll(".word");
    const meaningCont = document.querySelectorAll(".meaning-cont")
    const empty = document.querySelectorAll(".empty")

    empty.forEach((el) => {


        el.parentNode.removeChild(el)

    })

    sectiionCont.forEach((el) => {

        el.parentNode.removeChild(el);

    })



    meaningCont.forEach((el) => {

        el.parentNode.removeChild(el);

    })




}







let searchValueCatche;
//request on click
searchBut.addEventListener("click", (e) => {
    e.stopPropagation();
    const searchValue = searchInput.value;



    if (searchValue === searchValueCatche) return

    request(searchValue)




})





//request on Ender key
searchInput.addEventListener("keypress", (e) => {

    e.stopPropagation();
   

    const searchValue = searchInput.value;



    if (searchValue === searchValueCatche) return

    if (e.key === "Enter"){
        e.preventDefault();

        request(searchValue)
    }



})








arrowDown.addEventListener("click", () => {

    // dropDownCont.style.display="block"

    dropDownCont.classList.toggle("display")


})






/* function to make dark theme on rendred elements*/
const darkStyle = (font) => {

    const definition = document.querySelectorAll(".definition");
    const example = document.querySelectorAll(".example");
    const synonyms = document.querySelectorAll(".synonims-one");
    const antonyms = document.querySelectorAll(".antonyms-one");
    const grammar = document.querySelectorAll(".grammar")
    const lable = document.querySelectorAll(".lable")
    const realWord = document.querySelectorAll(".real-word")
    const transcription = document.querySelectorAll(".transcription")
    const synonymsLable = document.querySelectorAll(".synonyms-lable")
    const counter = document.querySelectorAll(".counter");
    const total = document.querySelectorAll(".total");
    const part = document.querySelectorAll(".part");



    for (const el of counter) {

        el.style.fontFamily = font;


    }

    for (const el of total) {

        el.style.fontFamily = font;


    }

    for (const el of part) {

        el.style.fontFamily = font;


    }





    for (const el of all) {

        el.style.fontFamily = font;


    }


    for (const el of definition) {

        el.style.fontFamily = font;


    }

    for (const el of example) {

        el.style.fontFamily = font;


    }

    for (const el of synonyms) {

        el.style.fontFamily = font;


    }

    for (const el of antonyms) {

        el.style.fontFamily = font;


    }

    for (const el of grammar) {

        el.style.fontFamily = font;


    }

    for (const el of lable) {

        el.style.fontFamily = font;


    }

    for (const el of transcription) {

        el.style.fontFamily = font;


    }


    for (const el of realWord) {

        el.style.fontFamily = font;


    }


    for (const el of antonyms) {

        el.style.fontFamily = font;


    }

    for (const el of synonymsLable) {

        el.style.fontFamily = font;


    }






}




mono.addEventListener("click", (e) => {

    darkStyle(" 'Space Mono', monospace ");


})



serif.addEventListener("click", (e) => {

    darkStyle(" 'PT Serif', serif ")

})


sansSerif.addEventListener("click", (e) => {

    darkStyle(" 'sans-serif', serif ")

})



/* function to make swich on dark moede and render dark theme on rendered elements*/

darkCont.addEventListener("click", () => {

    darkCont.classList.toggle("active")
    const definition = document.querySelectorAll(".definition");
    const realWord = document.querySelectorAll(".real-word")
    const audio = document.querySelectorAll(".audio");
    const grammar = document.querySelectorAll(".grammar")
    const counter = document.querySelectorAll(".counter");
    const total = document.querySelectorAll(".total");
    const part = document.querySelectorAll(".part");


    if (darkCont.classList.contains("active")) {

        switchCont.style.backgroundColor = "rgb(165,69,236)";

        circle.style.transform = "translateX(22.5px)";
        body.style.backgroundColor = "rgb(1,0,1)"
        navText.style.color = " rgb(165,69,236)"
        serif.style.color = " rgb(165,69,236)"
        mono.style.color = " rgb(165,69,236)"
        sansSerif.style.color = " rgb(165,69,236)"
        dropDownCont.style.backgroundColor = "black";
        dropDownCont.style.boxShadow = "rgb(165 69 236 ) 0px 5px 30px ";
        searchInput.style.backgroundColor = "rgb(30,31,30)"
        searchBut.style.backgroundColor = "rgb(30,31,30)"
        inputCont.style.backgroundColor = "rgb(30,31,30)"

        for (const gram of grammar) {

            gram.style.color = " white"
        }


        for (const definitionOne of definition) {

            definitionOne.style.color = "white"
        }


        searchInput.style.color = "white";



        for (const word of realWord) {

            word.style.color = "white"
        }




        for (const sound of audio) {

            sound.style.backgroundColor = "rgb(41,16,58)"

        }

        for (const el of counter) {

            el.style.color = "white"
        }

        for (const el of part) {

            el.style.color = "white"
        }


        for (const el of total) {

            el.style.color = "white"
        }




    } else {



        circle.style.transform = "translateX(0px)";


        switchCont.style.backgroundColor = "rgb(117, 117, 117)";

        body.style.backgroundColor = "white"
        navText.style.color = " black"
        serif.style.color = " black"
        mono.style.color = " black"
        sansSerif.style.color = " black"
        dropDownCont.style.backgroundColor = "white"
        dropDownCont.style.boxShadow = "rgb(0 0 0 / 10%) 0px 5px 30px ";
        searchInput.style.backgroundColor = "rgb(244,245,244)"
        searchBut.style.backgroundColor = "rgb(244,245,244)"
        inputCont.style.backgroundColor = "rgb(244,245,244)"

        searchInput.style.color = "black"

        for (const gram of grammar) {

            gram.style.color = "black"
        }


        for (const word of realWord) {

            word.style.color = "black"
        }


        for (const definitionOne of definition) {

            definitionOne.style.color = "black"
        }





        for (const sound of audio) {

            sound.style.backgroundColor = "rgb(233,209,251)";

        }



        for (const el of counter) {

            el.style.color = "black"
        }


        for (const el of part) {

            el.style.color = "black"
        }


        for (const el of total) {

            el.style.color = "black"
        }







    }


})








