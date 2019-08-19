$(document).ready(init);

function init() {
    console.log('Hello Isurus!!!');
    console.log('Would you like to play with some Code?');

    //event listeners
    $('.js-add-task-btn').on('click', clickAddNewTask);
    $('.js-delete-task-btn').on('click', clickDeleteTask);
    $('.js-complete-task-btn').on('click', clickCompleteTask);
    getTasks();
}
//event handlers

function clickAddNewTask(event) {
    const newTaskData ={};
    const $taskInputs = $('.js-task-input');

    $taskInputs.each(function(inputElement){
        const elementDataKey = $(this).data().taskKey;
        newTaskData[elementDataKey] = $(this).val();
    });
    postTask(newTaskData);
}
function clickDeleteTask(event) {

    const buttonDataObject = $(this).data();
    const taskId = buttonDataObject.id;

    deleteTask(taskId);
}

function clickCompleteTask(event) {
    $('.js-complete-task-btn').click(function () {
        $('p').css('color', 'green');
    });
}
//server connections

function getTasks() {
    $.ajax({
        type: 'GET',
        url: '/api/tasks',
    })
    .then(function(serverResponse) {
        render(serverResponse);
    })
    .catch(function(err) {
        console.log('Error getting tasks', err);
        alert('There was an error getting new tasks.');
    });
}

function postTask(taskData) {
    $.ajax({
        type: 'POST',
        url:  '/api/tasks',
        data: taskData,
    })
    .then(function(serverResponse) {
        getTasks();    
    })
    .catch(function(err) {
        console.log('Error posting task:', err);
    });
}

function deleteTask(id) {
    $.ajax({
        type: 'DELETE',
        url: `/api/tasks/delete/${id}`,
    })
    .then(function(serverResponse) {
        getTasks();
    })
    .catch(function(err) {
        console.log('Error deleting task:', err);
        alert('There was a Error deleting task.');

    });
}


//DOM/rendering

function clearFields() {
    $('.js-task-input').val('');
}

function render (tasksDataList) {
    const $tasksList = $('.js-tasks-list');

    console.log(tasksDataList);
    $tasksList.empty();
    for (let task of tasksDataList) {
        $tasksList.append(`
            <li>
                <div class="taskPill">
                    
                    <p>task: ${task.description}</p> 
                    <p>done by: ${task.due_date}</p> 
                    <button
                        class="js-delete-task-btn"
                        data-id="${task.id}"
                        data-something="WORD"
                    >
                        Delete
                    </button>
                    <button
                        class="js-complete-task-btn"
                        data-id="${task.id}"
                        data-something="WORD"
                    >
                        Complete
                    </button>
                </div>
            </li>
        `);
    }
}