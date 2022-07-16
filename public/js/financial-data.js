const apiUrl= "http://api.coindesk.com/v1/bpi/historical/close.json"
const canvas = document.getElementById("myChart")
const ctx = myChart.getContext('2d')


axios({
    url: apiUrl,
    method: "GET",
})
    .then((response)=>{
        console.log('response : ',response.data.bpi)

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
    })
    .catch(err=>{
        console.log("boom error",err)
    })
