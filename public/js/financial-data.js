const canvas = document.getElementById("myChart")
const ctx = myChart.getContext('2d')
const fromDate = document.querySelector('#fromDate')
const toDate = document.querySelector('#toDate')
const fromDateValue = fromDate.value
const toDateValue = toDate.value
const currency=document.querySelector('#currency')
const currencyValue=currency.value
const min= document.getElementById('min')
const max= document.getElementById('max')


fromDate.addEventListener('change', () => {
    return window.location.reload()
})
toDate.addEventListener('change', () => {
    return window.location.reload()
})
currency.addEventListener('change',()=>{
    return window.location.reload()
})

const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDateValue}&end=${toDateValue}&currency=${currencyValue}`

console.log("dates:",fromDateValue,toDateValue)
console.log("apiUrl",apiUrl)

axios({
    url: apiUrl,
    method: "GET",
})
    .then((response) => {
        console.log('response : ', response.data)

        const data = {
            labels: Object.keys(response.data.bpi),
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: Object.values(response.data.bpi)
            }]
        };

        const config = {
            type: 'line',
            data: data,
            options: {}
        }

        const myChart = new Chart(
            document.getElementById('myChart'),
            config
        );

        console.log(Object.values(response.data.bpi))

        min.innerHTML=Math.min(...Object.values(response.data.bpi))
        max.innerHTML=Math.max(...Object.values(response.data.bpi))

    })
    .catch(err => {
        console.log("boom error", err)
    })
