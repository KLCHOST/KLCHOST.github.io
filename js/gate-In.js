//elements 
const consigneeSelect = document.querySelector('#consigneeSelect')
const containerSelect = document.querySelector('#containerSelect')
const vesselSelect = document.querySelector('#vesselSelect')
const agentSelect = document.querySelector('#agentSelect')
const submitData = document.querySelector('#submitData')
const gateInForm = document.querySelector('#gateInForm')
const inputs = gateInForm.querySelectorAll('input, select')
const vehicleYear = document.querySelector('#vehicleYear')
const vehicleMake = document.querySelector('#vehicleMake')
const vehicleColor = document.querySelector('#vehicleColor')
const unitInspection = document.querySelector('#unitInspection')
const unitInspectionSelect = unitInspection.querySelectorAll("select")
const vehicleType = document.querySelector('#vehicleType')
const z = document.querySelector('#loader')
//urls
const consigneeURL = 'http://72.27.52.224/car/php/getConsigneeData.php'
const containerURL = 'http://72.27.52.224/car/php/getContainerData.php'
const vesselURL = 'http://72.27.52.224/car/php/getVesselData.php'
const agentURL = 'http://72.27.52.224/car/php/getAgentData.php'

//state
const vehicleMakesArray = ['Audi', 'BMW', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge', 'Ferrari', 'Ford', 'GM', 'GEM', 'GMC', 'Honda', 'Hummer', 'Hyundai', 'Infiniti', 'Isuzu', 'Jaguar', 'Jeep', 'Kia', 'Lamborghini', 'Land Rover', 'Lexus', 'Lincoln', 'Lotus', 'Mazda', 'Mercedes-Benz', 'Mercury', 'Mitsubishi', 'Nissan', 'Oldsmobile', 'Peugeot', 'Pontiac', 'Porsche', 'Regal', 'Saab', 'Saturn', 'Subaru', 'Suzuki', 'Toyota', 'Volkswagen', 'Volvo'];
const vehicleColorArray = ['Amber', 'Amethyst', 'Apricot', 'Aquamarine', 'Azure', 'Baby blue', 'Beige', 'Black', 'Blue', 'Blue-green', 'Blue-violet', 'Blush', 'Bronze', 'Brown', 'Burgundy', 'Byzantium', 'Carmine', 'Cerise', 'Cerulean', 'Champagne', 'Chartreuse green', 'Chocolate', 'Cobalt blue', 'Coffee', 'Copper', 'Coral', 'Crimson', 'Cyan', 'Desert sand', 'Electric blue', 'Emerald', 'Erin', 'Gold', 'Gray', 'Green', 'Harlequin', 'Indigo', 'Ivory', 'Jade', 'Jungle green', 'Lavender', 'Lemon', 'Lilac', 'Lime', 'Magenta', 'Magenta rose', 'Maroon', 'Mauve', 'Navy blue', 'Ochre', 'Olive', 'Orange', 'Orange-red', 'Orchid', 'Peach', 'Pear', 'Periwinkle', 'Persian blue', 'Pink', 'Plum', 'Prussian blue', 'Puce', 'Purple', 'Raspberry', 'Red', 'Red-violet', 'Rose', 'Ruby', 'Salmon', 'Sangria', 'Sapphire', 'Scarlet', 'Silver', 'Slate gray', 'Spring bud', 'Spring green', 'Tan', 'Taupe', 'Teal', 'Turquoise', 'Ultramarine', 'Violet', 'Viridian', 'White', 'Yellow'];
const unitCodes = ['Broken', 'Cut', 'Dent', 'Hole', 'Missing', 'Not Seen', 'Scratch']
const vehicleTypeArray = ['Car', 'Truck', 'Motorbike', 'Station Wagon', 'Bus', 'Van', 'SUV']

//get data from the db and dynamically populate datalist
async function getDdlData(element, url) {
    try {
        z.style.display = 'block'
        let string = ''
        let req = await fetch(url)
        let res = await req.json()        
        z.style.display = 'none'
        res.forEach(el => {
            let array = Object.entries(el)
            array = array.flat();
            string += `<option value="${array[3]}">`
        });
        element.innerHTML = string;
    } catch (error) {
        console.error(error);
    }
}

//get data from the state and dynamically populate datalist
function populateDataListFromState(element, array) {
    try {
        let string = ''
        array.forEach(el => {
            string += `<option value="${el}">`
        })
        element.innerHTML = string
    } catch (e) {
        console.error(e)
    }
}

//get data from the state and dynamically populate datalist
function populateDropdownListFromState(nodeList, array) {
    try {
        let string = '<option value="" disabled selected>Choose an option</option>'
        array.forEach(el => {
            string += `<option value="${el}">${el}</option>`
        })
        if (NodeList.prototype.isPrototypeOf(nodeList)) {
            for (let i = 0; i < nodeList.length; i++) {
                nodeList[i].innerHTML = string
            }
        } else {
            nodeList.innerHTML = string;
        }

    } catch (e) {
        console.error(e)
    }
}

//populate year ddl
function populateYearDdl() {
    let yearLimit = new Date().getFullYear() + 1;
    let string = `<option value="" disabled selected>Choose an option</option>`
    for (let i = 0; i < 20; i++) {
        string += `<option value='${yearLimit}'>${yearLimit}</option>`
        yearLimit--
    }
    vehicleYear.innerHTML = string;
}

async function processSubmit() {
    //test for blank input
    let pass = true
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() === '') {
            pass = false
            break;
        }
    }
    //submit form if no values are empty
    if (pass) {
        submitData.disabled = true;
        submitData.innerHTML = 'SENDING DATA...'
        let formData = new FormData(gateInForm);
        params = {
            method: 'post',
            body: formData
        }
        try {
            z.style.display = 'block'
            let req = await fetch('php/processGateIn.php', params)
            let res = await req.json()
            z.style.display = 'none'
            if (res === 'success') {
                Swal.fire({
                    title: 'Success!',
                    text: 'Car gated in successfully',
                    type: 'success',
                    confirmButtonText: 'OK'
                })
                submitData.disabled = false;
                submitData.innerHTML = 'SUBMIT'
                gateInForm.reset()
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: `${res}`,
                    type: 'error',
                    confirmButtonText: 'OK'
                })
                submitData.disabled = false;
                submitData.innerHTML = 'SUBMIT'
            }
        } catch {
            submitData.disabled = false;
            submitData.innerHTML = 'SUBMIT'
            Swal.fire({
                title: 'Something went wrong!',
                text: 'Please contact your administrator',
                type: 'error',
                confirmButtonText: 'OK'
            })
        }
    } else {
        Swal.fire({
            title: 'Empty Fields!',
            text: 'Please complete all fields',
            type: 'warning',
            confirmButtonText: 'OK'
        })
    }

}

submitData.addEventListener('click', processSubmit)


document.addEventListener('DOMContentLoaded', () => {
    getDdlData(consigneeSelect, consigneeURL)
    getDdlData(containerSelect, containerURL)
    getDdlData(vesselSelect, vesselURL)
    getDdlData(agentSelect, agentURL)
    populateYearDdl()
    // populateDataListFromState(vehicleMake, vehicleMakesArray)
    populateDataListFromState(vehicleColor, vehicleColorArray)
    populateDropdownListFromState(unitInspectionSelect, unitCodes)
    populateDropdownListFromState(vehicleType, vehicleTypeArray)
})