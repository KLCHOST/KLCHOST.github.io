class Statistics {
    static async getTotalCars() {
        const req = await fetch('http://72.27.52.224/car/php/getTotalCars.php')
        const res = await req.json()
        return res 
    }
    static async getNewCarsToday() {
        const req = await fetch('http://72.27.52.224/car/php/getNewCarsToday.php')
        const res = await req.json()
        return res
    }
    static async getReleasedToday() {
        const req = await fetch('http://72.27.52.224/car/php/getReleasedToday.php')
        const res = await req.json()
        return res
    }
    static async getNewCarsWeek() {
        const req = await fetch('http://72.27.52.224/car/php/getNewCarsWeek.php')
        const res = await req.json()
        return res
    }
    static async getReleaseCarsWeek() {
        const req = await fetch('http://72.27.52.224/car/php/getReleaseCarsWeek.php')
        const res = await req.json()
        return res
    }
    static async getNewCarsMonth() {
        const req = await fetch('http://72.27.52.224/car/php/getNewCarsMonth.php')
        const res = await req.json()
        return res
    }
    static async getReleaseCarsMonth() {
        const req = await fetch('http://72.27.52.224/car/php/getReleaseCarsMonth.php')
        const res = await req.json()
        return res
    }
}