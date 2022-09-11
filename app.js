
let d = new Date();
let day = d.getDay();
if(day === 0){
    d.setDate(d.getDate() - 2);
}
else if(day === 1){
    d.setDate(d.getDate() - 3);
}
else{
    d.setDate(d.getDate() - 1);
}
d = d.toJSON();
d = d.substr(0,10);

window.onload = function(){
    console.log("app started")
    getYesterdayData();
    getGold();
}

function getYesterdayData(){
    fetch("http://api.nbp.pl/api/exchangerates/tables/a/" + d + "/?format=json")
    .then(response => response.json())
    .then(dataY => getData(dataY))
}

function getData(dataY){
    fetch("https://api.nbp.pl/api/exchangerates/tables/a/?format=json")
    .then(response => response.json())
    .then(data => ratesShow(data,dataY))
}

function getGold(){
    fetch("http://api.nbp.pl/api/cenyzlota/last/30/?format=json")
    .then(response => response.json())
    .then(data1 => goldShow(data1))
}

function ratesShow(data,dataY){
    let rate = document.getElementById("currencies");
    for(let i=0;i<data[0].rates.length;i++){
        let balance = null;
        let difference =  ((data[0].rates[i].mid-dataY[0].rates[i].mid)/dataY[0].rates[i].mid) * 100;  //data[0].rates[i].mid / dataY[0].rates[i].mid;
        //let current = data[0].rates[i].code.toLowerCase();

        if((data[0].rates[i].mid - dataY[0].rates[i].mid) < 0){
            balance = '<span style="color: #EB5353;">' + (data[0].rates[i].mid - dataY[0].rates[i].mid).toPrecision(2) + ' zł ' + '(' + difference.toPrecision(2) + ' %)' + '<i class="fa-solid fa-arrow-down-long"></i></span></div>';
        }
        else if((data[0].rates[i].mid - dataY[0].rates[i].mid) > 0){
            balance = '<span style="color: #36AE7C;"> +' + (data[0].rates[i].mid - dataY[0].rates[i].mid).toPrecision(2) + ' zł ' + '(' + difference.toPrecision(2) + ' %)' +  '<i class="fa-solid fa-arrow-up-long"></i></span></div>';
        }
        else{
            balance = ' -0,00 zł (kurs bez zmian)</div>';
        }

        rate.appendChild(document.createElement("div"));
        rate.lastChild.classList.add("currency");
        rate.lastChild.innerHTML = data[0].rates[i].currency.toUpperCase() + " (" +
        data[0].rates[i].code + "): " +
        data[0].rates[i].mid + " zł " +
        balance;
        rate.appendChild(document.createElement("hr"));

        /*rate.innerHTML += '<div class="currency">' + data[0].rates[i].currency.toUpperCase() + " (" +
        data[0].rates[i].code + "): " +
        data[0].rates[i].mid + " zł " +
        balance;*/
    }
}

function goldShow(data1){
    let goldPrice = document.getElementById("gold");
    for(let i=data1.length-1;i>=0;i--){
        //let goldPrice = document.getElementById(i);
        
        goldPrice.appendChild(document.createElement("div"));
        goldPrice.lastChild.classList.add("currency","gold");
        goldPrice.lastChild.innerHTML = data1[i].data + ": " + data1[i].cena + " zł/g";
        goldPrice.appendChild(document.createElement("hr"));

        //goldPrice.innerHTML += '<div class="gold currency">' + data1[i].data + ": " + data1[i].cena + " zł/g</div>";
    }
                let dane=data1;
                for(let i=0;i<data1.length;i++)
                {
                    dane[i] = data1[i].cena;
                }
                const ctx = document.getElementById('chart').getContext('2d');
                const myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
                        datasets: [{
                            label: 'Cena złota za gram',
                            data: [dane[0],dane[1],dane[2],dane[3],dane[4],dane[5],dane[6],dane[7],dane[8],dane[9],dane[10]
                                    ,dane[11],dane[12],dane[13],dane[14],dane[15],dane[16],dane[17],dane[18],dane[19],dane[20]
                                    ,dane[21],dane[22],dane[23],dane[24],dane[25],dane[26],dane[27],dane[28],dane[29]],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false
                            }
                        },
                    }
                })
}

/*function ratesShow(data,dataY){
    for(let i=0;i<data[0].rates.length;i++){
        let current = data[0].rates[i].code.toLowerCase();
        let rate = document.getElementById(current);
        rate.innerHTML = " " + data[0].rates[i].currency.toUpperCase() + " (" +
        data[0].rates[i].code + "): " +
        data[0].rates[i].mid + " zł ";

        if((data[0].rates[i].mid - dataY[0].rates[i].mid) < 0){
            rate.innerHTML += '<span style="color: #EB5353;">' + (data[0].rates[i].mid - dataY[0].rates[i].mid).toPrecision(2) + ' zł <i class="fa-solid fa-arrow-down-long"></i></span>';
        }
        else if((data[0].rates[i].mid - dataY[0].rates[i].mid) > 0){
            rate.innerHTML += '<span style="color: #36AE7C;"> +' + (data[0].rates[i].mid - dataY[0].rates[i].mid).toPrecision(2) + ' zł <i class="fa-solid fa-arrow-up-long"></i></span>';
        }
        else{
            rate.innerHTML += ' -0,00 zł (kurs bez zmian)';
        }
    }
}*/

/*function goldShow(data1){
    for(let i=0;i<data1.length;i++){
        let goldPrice = document.getElementById(i);
        goldPrice.innerHTML = data1[i].data + ": " + data1[i].cena + " zł/g";
    }
}*/