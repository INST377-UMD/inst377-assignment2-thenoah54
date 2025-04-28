function getDog() {
    const path = 'https://dog.ceo/api/breeds/image/random/5';
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

    const path2 = 'https://dogapi.dog/api/v2/breeds';
    fetch(path2).then((result) => result.json()).then((resultJson) => {
        console.log(resultJson);
        resultJson.data.forEach((resultData) => {
            const dogData = resultData.attributes;
            const buttonContainer = document.getElementById('dogButtons');
            const dogButton = document.createElement('button');
            dogButton.textContent = dogData.name;
            dogButton.className = 'dogClass';
            // how to create button func
            // button.addEventListener('click', functionName)
            buttonContainer.append(dogButton);
        });
    });
}

window.onload = getDog;