import Worker from "./workers.js";


let workers = [
    new Worker('Максим','Кияница', 'Алексеевич', 2023, new Date(2003, 7, 24), 'Frontend-Developer'),
    new Worker('Денис','Кияница', 'Алексеевич', 2021, new Date(2000, 5, 4), 'QA Tester'),
    new Worker('Алексей','Устюгов', 'Андреевич', 2023, new Date(2003, 3, 4), 'Священник РПЦ')
]

const $workersList = document.getElementById('workers-list'),
      $workersListThAll = document.querySelectorAll('.workersTable th')

let column = 'fio',
    columnDir = false

//Получить TR сотрудника
function newWorkerTR(worker) {
    let periodWork = worker.getWorkPeriod()
    let str = periodWork.toString()
    const $workerTR  = document.createElement('tr'),
          $fioTD = document.createElement('td'),
          $birthDayTD = document.createElement('td'),
          $workStartTD = document.createElement('td'),
          $postTD = document.createElement('td')
    
    $fioTD.textContent = worker.fio
    
    if(str[str.length - 1] == '1') {
        $workStartTD.textContent = worker.workStart +' ('+ worker.getWorkPeriod() + ' год)'
    } else if(str[str.length - 1] == '2' || str[str.length - 1] == '3' || str[str.length - 1] == '4') {
        $workStartTD.textContent = worker.workStart +' ('+ worker.getWorkPeriod() + ' года)'
        $birthDayTD.textContent = worker.getBirthdayDate() +' ('+ worker.getAge() + ' года)'
    } else {
        $workStartTD.textContent = worker.workStart +' ('+ worker.getWorkPeriod() + ' лет)'
        $birthDayTD.textContent = worker.getBirthdayDate() +' ('+ worker.getAge() + ' лет)'
    }
    $postTD.textContent = worker.post

    $workerTR.append($fioTD)
    $workerTR.append($birthDayTD)
    $workerTR.append($workStartTD)
    $workerTR.append($postTD)
    
    return $workerTR
}   

//Получить сортировку массива по параметрам
function getSortWorkers(prop, dir) {
    let workersCopy = [...workers]
    return workersCopy.sort(function(workerA, workerB) {
        if(!dir == false? workerA[prop] < workerB[prop] : workerA[prop] > workerB[prop]){
            return -1;
        }
    })
}

let c = 0

//Отрисовать
function render() {
    let workersCopy  = [...workers]
    workersCopy = getSortWorkers(column, columnDir)
    $workersList.innerHTML = ''
    for (const worker of workersCopy) {
        $workersList.append(newWorkerTR(worker))
    }
    
}


//Событие сортировки
$workersListThAll.forEach(element => {
    element.addEventListener('click', function() {
        column = this.dataset.column
        columnDir = !columnDir
        render()
    })
});

//Добавление
document.getElementById('add-worker').addEventListener('submit', function(event){
    event.preventDefault()
    
    workers.push(new Worker(
        document.getElementById('input-name').value,
        document.getElementById('input-surname').value,
        document.getElementById('input-lastname').value,
        Number(document.getElementById('input-workstart').value),
        new Date(document.getElementById('input-birthdate').value),
        document.getElementById('input-post').value
    ))
    render()
})

render()
