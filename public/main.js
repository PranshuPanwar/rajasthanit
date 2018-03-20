/**
 * Created by Pranshu Panwar on 20-03-2018.
 */

const form =document.getElementById('vote-form');


form.addEventListener('submit',e=>{


    const choice =document.querySelector('input[name=os]:checked').value;

       const data ={os:choice};


    //post request code
     fetch('http://localhost:3000/poll',{
         method :'post',
         body : JSON.stringify(data),
         headers : new Headers({
             'Content-Type': 'application/json'
         })
     }).then(res => res.json())
         .then(data => console.log(data))
         .catch(err => console.log(err));

    e.preventDefault();
    });
let dataPoints =[
    {label :"place1", y:0},
    {label :"place2", y:0},
    {label :"plac3", y:0},
    {label :"place4", y:0},
    {label :"others", y:0},
]

const chartContainer =document.querySelector('AchartContainer');
if(chartContainer) {
    const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
            text: 'POLL RESULT'
        },
        data: [
            {
                type: 'column',
                dataPoints: dataPoints
            }
        ]
    });
    chart.render();

}



