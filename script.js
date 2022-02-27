async function main() {
    const form = document.querySelector('form');
    const task_name = document.querySelector("[name='tname']");
    const due_date = document.querySelector("[name='dd']");
    const assigned_to = document.querySelector("[name='ast']");
    //const tasksList1 = document.getElementById('tasks'); //check
    const tasksList = document.getElementById('tasksUL');
    const existingTasks = await getAllTasksFromDB()

    //console.log(existingTasks)

    const taskData = [];

    existingTasks.forEach(task => {
        addTasks(task.taskName, task.dueDate, task.assignedTo);
    });


    function addTasks(taskName, dueDate, assignedTo) {
        //const div1 = document.createElement('div')//check
        const div = document.createElement('li')
        div.classList.add('task')
        const h1 = document.createElement('h1')
        h1.innerHTML = taskName;
        const h2 = document.createElement('h2')
        h2.innerHTML = "Due Date: " + dueDate;
        const p = document.createElement('p')
        p.innerHTML = "Assigned: " + assignedTo;

        taskData.push({ taskName, dueDate, assignedTo });

        div.appendChild(h1)
        div.appendChild(h2)
        div.appendChild(p)
        tasksList.appendChild(div)

        localStorage.setItem('tasks', JSON.stringify(taskData));
        //addTasksToDB(taskName, dueDate, assignedTo)
        task_name.value = ''
        due_date.value = ''
        assigned_to.value = ''
        taskData.pop()
    }

    function getFormattedDate(dueDate){
        let date = new Date(dueDate);  // got the string as date but it is in UTC and when printed in AST it would change the date due to timezone.
        let astdate = new Date(date.toUTCString()+'-0400') // adding timezone so that the date for AST does not change.
        let formatted_date = String(astdate.getDate()).padStart(2, '0') + "/" + String(astdate.getMonth() + 1).padStart(2, '0') + "/" + astdate.getFullYear();
        return formatted_date
    }

    // Events
    form.onsubmit = (event) => {
        event.preventDefault();  
        let due_date_value = getFormattedDate(due_date.value)
        addTasksToDB(task_name.value, due_date_value, assigned_to.value);
        addTasks(task_name.value, due_date_value, assigned_to.value);
    }
}

main()