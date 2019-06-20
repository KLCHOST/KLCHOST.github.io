class Statistics {
    static async getTotalCars() {
        const req = await fetch('https://klcvehiclemovements.klclogistics-jm.com/klc_vehicle_movements/getTotalCars.php')
        const res = await req.json()
        return res 
    }
    static async getNewCarsToday() {
        const req = await fetch('https://klcvehiclemovements.klclogistics-jm.com/klc_vehicle_movements/getNewCarsToday.php')
        const res = await req.json()
        return res
    }
    static async getReleasedToday() {
        const req = await fetch('https://klcvehiclemovements.klclogistics-jm.com/klc_vehicle_movements/getReleasedToday.php')
        const res = await req.json()
        return res
    }
    static async getNewCarsWeek() {
        const req = await fetch('https://klcvehiclemovements.klclogistics-jm.com/klc_vehicle_movements/getNewCarsWeek.php')
        const res = await req.json()
        return res
    }
    static async getReleaseCarsWeek() {
        const req = await fetch('https://klcvehiclemovements.klclogistics-jm.com/klc_vehicle_movements/getReleaseCarsWeek.php')
        const res = await req.json()
        return res
    }
    static async getNewCarsMonth() {
        const req = await fetch('https://klcvehiclemovements.klclogistics-jm.com/klc_vehicle_movements/getNewCarsMonth.php')
        const res = await req.json()
        return res
    }
    static async getReleaseCarsMonth() {
        const req = await fetch('https://klcvehiclemovements.klclogistics-jm.com/klc_vehicle_movements/getReleaseCarsMonth.php')
        const res = await req.json()
        return res
    }
}