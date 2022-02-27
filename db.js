var db = new Dexie("TasksDatabase");

// DB with single table "tasks" with primary auto increment key "id"
// indexing on taskName, dueDate and assignedTo
db.version(1).stores({
    tasks: `
        ++id,
        taskName,
        dueDate,
        assignedTo`,
});

function getAllTasksFromDB() {
    return db.tasks.toArray().then((data) => {
        return data
    })

}

function addTasksToDB(taskName, dueDate, assignedTo) {
    db.tasks.put({ taskName, dueDate, assignedTo })
        .then(() => true)
        .catch(err => {
            alert("Data could not be added to DB... " + err);
        });
}

async function queryByTaskName(taskName) {
    if (taskName === undefined) return 0
    return await db.tasks
        .filter((task) => {
            return task.taskName === taskName
        })
        .toArray()
}

async function queryByAssignedTo(assignedTo) {
    if (assignedTo === undefined) return 0
    return await db.tasks
        .filter((task) => {
            return task.assignedTo === assignedTo
        })
        .toArray()
}

// Ref -> https://dexie.org/docs/Tutorial/Hello-World