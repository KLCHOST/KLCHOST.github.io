const x = document.querySelector('#content-row')
const y = x.querySelectorAll('span')
const z = document.querySelector('#loader')

document.addEventListener('DOMContentLoaded' , ()=>{
    z.style.display = 'block';
    Promise.all([
        Statistics.getTotalCars(), 
        Statistics.getNewCarsToday(),
        Statistics.getReleasedToday(),
        Statistics.getNewCarsWeek(),
        Statistics.getReleaseCarsWeek(),
        Statistics.getNewCarsMonth(),
        Statistics.getReleaseCarsMonth()
    ])
        .then(values => {
            z.style.display = 'none';
            for (let i = 0; i < y.length; i++) {
                y[i].innerHTML = values[i]                
            }
        })
    
})