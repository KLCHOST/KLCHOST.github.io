const l = document.querySelector('#loader')
class UI {
    static async sendForm(url, formData) {
        try {
            l.style.display = 'block'
            const req = await fetch(url, {
                method: 'post',
                body: formData
            })
            const res = await req.json()
            l.style.display = 'none'
            return res
        } catch(e)  {
            console.error(e);
        }
    }
    static async getData(url){
        try {
            l.style.display = 'block'
            const req = await fetch(url)
            const res = await req.json()
            l.style.display = 'none'
            return res
        } catch (error) {
            console.error(error);
            
        }
    }
}