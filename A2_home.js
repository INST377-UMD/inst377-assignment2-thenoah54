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

window.onload = generateQuote;