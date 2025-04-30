const path2 = 'https://dogapi.dog/api/v2/breeds';

function getDog() {
    const path = 'https://dog.ceo/api/breeds/image/random/10';
    fetch(path).then((result) => result.json()).then((resultJson) => {
        console.log(resultJson);
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
            console.log(dogData);
            const buttonContainer = document.getElementById('dogButtons');
            const dogButton = document.createElement('button');
            dogButton.textContent = dogData.name;
            dogButton.className = 'dogClass';

            function displayDog() {
                const codeHeader = document.getElementById('dogInfo');
                codeHeader.style.border = '3px solid black';
                codeHeader.style.backgroundColor = '#00ff0080';
                codeHeader.style.padding = '10px';
                codeHeader.style.margin = '10px';
                document.getElementById('dogName').textContent = dogData.name;
                document.getElementById('dogDesc').textContent = dogData.description;
                document.getElementById('min').textContent = `Min Life: ${dogData.life.min}`;
                document.getElementById('max').textContent = `Max Life: ${dogData.life.max}`;
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
        

        const commands = {
            'hello': () => { alert('Hello world!'); },
            'change the color to *color': changeColor,
            'navigate to *page': changePage    
        }
        
        // Add our commands to annyang
        annyang.addCommands(commands);
                
    }
}

function startAudio() {
    annyang.start();
}
function endAudio() {
    annyang.abort();
}

window.onload = audio();
window.onload = getDog;