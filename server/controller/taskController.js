const connection = require('../connection')

exports.getTasks=(req,res)=>{
    connection.query('Select * FROM tasks',(err,rows)=>{
        if(err){
            console.log(err)
        }else{
            console.log(rows)
            res.send(rows)
        }
    })
}

// *************** DELETE ****************
exports.deleteTask=((req, res) => {
    connection.query('DELETE FROM tasks WHERE id=?', [req.params.id], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error deleting task");
        } else {
            console.log("Item Deleted");
            res.send("Item Deleted");
        }
    });
});

// *************** POST ****************
exports.postTask=((req, res) => {
    let task = req.body;
    let completed = task.completed === 'true' ? 1 : 0;
    let task_data = [task.title, task.description, completed];
    connection.query('INSERT INTO tasks(title, description, completed) VALUES(?, ?, ?)', task_data, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error occurred while adding data");
        } else {
            console.log("Data added successfully");
            res.status(200).send("Data added successfully");
        }
    });
});


// *************** PATCH ****************
exports.updateTask=((req, res) => {
    let taskId = req.params.id;
    let completed = req.body.completed;

    connection.query('UPDATE tasks SET completed=? WHERE id=?', [completed, taskId], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error updating task");
        } else {
            console.log("Task updated");
            res.send("Task updated");
        }
    });
});
