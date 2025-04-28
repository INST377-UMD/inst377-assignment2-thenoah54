let isChart = null;

function lookupStocks() {
    const key = '_BY1EDMCHCM131cACv21KR9dSZQGlRy_'
    // const path = `/v2/aggs/ticker/${stocksTicker}/range/1/day/${from}/${to}`

    const to = new Date().toISOString().split('T')[0];
    var from = new Date();
    const multiplier = document.getElementById('multiplier').value;
    const stocksTicker = document.getElementById('ticker').value;
    from.setDate(from.getDate() - multiplier);
    from = from.toISOString().split('T')[0];
    console.log(to);
    console.log(from);

    const samplePath = `https://api.polygon.io/v2/aggs/ticker/${stocksTicker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&apiKey=${key}`
    fetch(samplePath).then((results) => results.json()).then((resultsJson) => {
        console.log(resultsJson);

        var closePrice = []
        var dates = []

        resultsJson.results.forEach((resultData) => {
            closePrice.push(resultData.c);

            var epoch = resultData.t;
            var convertedEpoch = new Date(epoch);
            dates.push(convertedEpoch.toLocaleString().split(',')[0]);
        });
        console.log(closePrice);
        console.log(dates);

        const ctx = document.getElementById('myChart');

        if(isChart) {
            isChart.destroy();
        }

        isChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: dates,
            datasets: [{
              label: '$ Stock Price',
              data: closePrice,
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
        
    });
}

function validityTest() {
    const form = document.getElementById('stockLookup');

    if(!form.checkValidity()) {
        form.reportValidity(); 
        return;
    }
    lookupStocks();
}

function top5Stocks() {
    const path = 'https://tradestie.com/api/v1/apps/reddit?date=2022-04-03'

    fetch(path).then((results) => results.json()).then((resultJson) => {
        console.log(resultJson);

        for(let i = 0; i < 5; i++) {
            const resultData = resultJson[i];
            
            const tableRow = document.createElement('tr');

            const tickerCell = document.createElement('td');
            const tickerName = document.createElement('a');
            tickerName.setAttribute('href', `https://finance.yahoo.com/quote/${resultData.ticker}/`);
            tickerName.textContent = resultData.ticker;
            tickerName.innerHTML = resultData.ticker;
            tickerCell.appendChild(tickerName);
            tableRow.appendChild(tickerCell);

            const comments = document.createElement('td');
            comments.innerHTML = resultData.no_of_comments;
            tableRow.appendChild(comments);

            const sentimentStat = document.createElement('img');
            if(resultData.sentiment == "Bullish") {
                sentimentStat.src = "stonks.png";
            } else {
                sentimentStat.src = "not_stonks.png";
            }
            sentimentStat.width = 150;
            sentimentStat.height = 100;
            // sentimentStat.innerHTML = resultData.sentiment;   
            tableRow.appendChild(sentimentStat);         
            
            stockTable.append(tableRow);
        };

    });
    
}

window.onload = top5Stocks;


