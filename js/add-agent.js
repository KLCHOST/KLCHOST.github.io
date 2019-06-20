document.addEventListener('DOMContentLoaded' , ()=>{
Swal.fire({
    title: 'Password Required',
    input: 'text',
    showCancelButton: true,
    inputValidator: (value) => {
        if (!value) {
            return 'Password cannot be blank'
        }
    }
})
    .then(password =>{        
       if(password.value === 'klc9976'){
        const x = document.querySelector('#submitData')
        const y = document.querySelector('form')
        x.addEventListener('click', () => {
        const f = new FormData(y)
        submitData.disabled = true;
        submitData.innerHTML = 'SENDING DATA...'
        UI.sendForm('http://72.27.52.224/car/php/add-agent.php', f)
            .then(val => {
                if (val === 'success') {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Agent added successfully',
                        type: 'success',
                        confirmButtonText: 'OK'
                    })
                    submitData.disabled = false;
                    submitData.innerHTML = 'SUBMIT'
                    y.reset()
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Unable to add agent, please contact administrator',
                        type: 'error',
                        confirmButtonText: 'OK'
                    })
                    submitData.disabled = false;
                    submitData.innerHTML = 'SUBMIT'
                }
            })
        })
        }else{
            location.replace('index.html')
        }
       })
    })