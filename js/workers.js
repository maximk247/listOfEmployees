export default class Worker {
    constructor(name, surename, lastname, workStart, birthDate, post) {
        this.name = name
        this.surename = surename
        this.lastname = lastname
        this.workStart = workStart
        this.birthDate = birthDate
        this.post = post
    }
    
    get fio() {
        return this.surename + ' ' + this.name + ' ' + this.lastname
    }
    
    getWorkPeriod() {
        const currentTime = new Date()
        return currentTime.getFullYear() - this.workStart
    }
    
    getBirthdayDate() {
        let today = this.birthDate
        const yyyy = today.getFullYear()
        let mm = today.getMonth() + 1
        let dd = today.getDate()
        if(dd < 10) dd = '0' + dd
        if(mm < 10) mm = '0' + mm
        
        today = dd + '.' + mm + '.' + yyyy
    
        return today
    }
    
    getAge() {
        const today = new Date()
        let age = today.getFullYear() - this.birthDate.getFullYear()
        let m = today.getMonth() - this.birthDate.getMonth()
        if(m < 0 || (m === 0 && today.getDate() < this.birthDate.getDate())) {
            age--
        }
        return age
    }
}



