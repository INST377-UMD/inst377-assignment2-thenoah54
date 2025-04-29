const path2 = 'https://dogapi.dog/api/v2/breeds';

function getDog() {
    const path = 'https://dog.ceo/api/breeds/image/random/5';
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

window.onload = getDog;