const path2 = 'https://dogapi.dog/api/v2/breeds';

// Creating an object literal
const dogdivData = {
    border: '3px solid black',
    backgroundColor: '#00ff0080',
    padding: '10px',
    maring: '10px',
    name: null,
    desc: null,
    min: null,
    max: null
  }

function getDog() {
    const path = 'https://dog.ceo/api/breeds/image/random/10';
    fetch(path).then((result) => result.json()).then((resultJson) => {
        // console.log(resultJson);
        resultJson.message.forEach((resultData) => {
            // console.log(resultData);
            const slider = document.getElementById('dogSlider');
            const newDog = document.createElement('img');
            newDog.src = resultData;
            slider.append(newDog);   
            
        });
        simpleslider.getSlider();
    });

    fetch(path2).then((result) => result.json()).then((resultJson) => {
        // console.log(resultJson.data);

        resultJson.data.forEach((resultData) => {
            const dogData = resultData.attributes;
            // console.log(dogData);
            const buttonContainer = document.getElementById('dogButtons');
            const dogButton = document.createElement('button');
            dogButton.id = dogData.name;
            dogButton.textContent = dogData.name;
            dogButton.className = 'dogClass';

            function displayDog() {
                const codeHeader = document.getElementById('dogInfo');
                codeHeader.style.border = dogdivData.border;
                codeHeader.style.backgroundColor = dogdivData.backgroundColor;
                codeHeader.style.padding = dogdivData.padding;
                codeHeader.style.margin = dogdivData.margin;
                document.getElementById('dogName').textContent = dogdivData.name = dogData.name;
                document.getElementById('dogDesc').textContent = dogdivData.desc = dogData.description;
                document.getElementById('min').textContent = dogdivData.min = `Min Life: ${dogData.life.min}`;
                document.getElementById('max').textContent = dogdivData.max = `Max Life: ${dogData.life.max}`;
            }
            // button.addEventListener('click', functionName) <-- how to create button func
            dogButton.addEventListener('click', displayDog);
            buttonContainer.append(dogButton);
        });
    });
}

function audio() {
    if (annyang) {
        // Let's define a command.
        const changeColor = function(color) {
            document.body.style.backgroundColor = color;
        }

        const changePage = function(page) {
            window.location.replace(`A2_${page}.html`);
        }
        
        const changeDog = function(dog) {
            fetch(path2).then((result) => result.json()).then((resultJson) => {
                resultJson.data.forEach((resultData) => {
                    if(dog.toUpperCase().replaceAll(" ", "") == resultData.attributes.name.toUpperCase().replaceAll(" ", "")) {
                        const codeHeader = document.getElementById('dogInfo');
                        codeHeader.style.border = dogdivData.border;
                        codeHeader.style.backgroundColor = dogdivData.backgroundColor;
                        codeHeader.style.padding = dogdivData.padding;
                        codeHeader.style.margin = dogdivData.margin; 
                        document.getElementById('dogName').textContent = dog;
                        document.getElementById('dogDesc').textContent = resultData.attributes.description;
                        document.getElementById('min').textContent = `Min Life: ${resultData.attributes.life.min}`;
                        document.getElementById('max').textContent = `Max Life: ${resultData.attributes.life.max}`;;
                        
                    }
                });
            });
            
        }

        const commands = {
            'hello': () => { alert('Hello world!'); },
            'change the color to *color': changeColor,
            'navigate to *page': changePage,
            'load dog breed *dog': changeDog

        }
        
        // Add our commands to annyang
        annyang.addCommands(commands);
                
    }
}

function startAudio() {
    audio();
    annyang.start();
}
function endAudio() {
    annyang.abort();
}

window.onload = getDog;