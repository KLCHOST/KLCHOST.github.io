const y = document.querySelector('#vins')
const z = document.querySelector('#tablebody')
const x = document.querySelector('form')

async function refreshSearch() {
    UI.getData('http://72.27.52.224/car/php/getVin.php')
        .then(data => {
            let html = ''
            if (data !== false) {
                data.forEach(element => {
                    html += `<option value="${element.vehicle_identification_number}">`
                });
                y.innerHTML = html;
            } else {
                y.innerHTML = html;
            }
        })
}
async function processGateOut(vin) {
    const f = new FormData()
    f.append('search', vin)
    UI.sendForm('http://72.27.52.224/car/php/processGateOut.php', f)
        .then(data => {
            if (data === 'success') {
                refreshSearch()
                getUnrealeased()
                Swal.fire({
                    title: 'Success!',
                    text: 'Vehicle released successfully',
                    type: 'success',
                    confirmButtonText: 'OK'
                })
                x.reset()
            }
        })
}
async function getUnrealeased() {
    UI.getData('http://72.27.52.224/car/php/getVehicleTable.php')
        .then(data => {
            sessionStorage.setItem('tabledata', JSON.stringify(data))
            let html = ''
            if (data !== false) {
                data.forEach(element => {
                    html += `<tr>
                                <td>${element.vehicle_make}</td>
                                <td>${element.vehicle_model}</td>
                                <td>${element.vehicle_year}</td>
                                <td><button data-vin="${element.vehicle_identification_number}" class="btn btn-primary btn-lg btn-block">Release</button></td>
                             </tr>`
                });

            } else {
                html += `<tr><td colspan="4" class="text-center">All vehicles have been released</td></tr>`
            }
            z.innerHTML = html
        })
}
document.querySelector('#submitData').addEventListener('click', () => {
    const searchTerm = document.querySelector('#search').value
    if (searchTerm) {
        const table = JSON.parse(sessionStorage.getItem('tabledata'))
        if (table) {
            const filteredTable = table.filter(data => data.vehicle_identification_number === searchTerm)
            if (!Array.isArray(filteredTable) || !filteredTable.length) {
                Swal.fire({
                    title: 'Error!',
                    text: `No vehicle exists with that VIN`,
                    type: 'error',
                    confirmButtonText: 'OK'
                })
            } else {
                let html = ''
                filteredTable.forEach(element => {
                    html += `<tr>
                                <td>${element.vehicle_make}</td>
                                <td>${element.vehicle_model}</td>
                                <td>${element.vehicle_year}</td>
                                <td><button data-vin="${element.vehicle_identification_number}" class="btn btn-primary btn-lg btn-block">Release</button></td>
                             </tr>`
                })
                z.innerHTML = html
            }
        } else {
            Swal.fire({
                title: 'Error!',
                text: `No vehicle exists with that VIN`,
                type: 'error',
                confirmButtonText: 'OK'
            })
        }

    } else {
        Swal.fire({
            title: 'Empty Field!',
            text: `Please enter a value`,
            type: 'warning',
            confirmButtonText: 'OK'
        })
    }
})

document.querySelector('#tablebody').addEventListener('click', e => {
    if (e.target !== e.currentTarget) {
        e.target.dataset.vin ? processGateOut(e.target.dataset.vin) : false
    }
    e.stopPropagation()
})

document.addEventListener('DOMContentLoaded', () => {
    refreshSearch()
    getUnrealeased()
})