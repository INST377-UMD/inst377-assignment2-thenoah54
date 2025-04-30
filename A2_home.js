function generateQuote() {
    const usingMock = true;
    const path = usingMock ? 
    'https://mock-11300458b2a7412e818de3bc6a0b9f5d.mock.insomnia.rest/api/quotes'
    :"https://zenquotes.io/api/random/";
    fetch(path).then((result) => result.json()).then((resultJson) => {
        console.log(resultJson);
        var index = Math.floor(Math.random() * resultJson.length);
        document.getElementById('quote').innerHTML = `"${resultJson[index].q}" —`;
        document.createElement('br');
        document.getElementById('author').innerHTML = `${resultJson[index].a}`;
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
window.onload = generateQuote;