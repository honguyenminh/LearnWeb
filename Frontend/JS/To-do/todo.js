// Todo list app

let todos = [];

let command;
while (true) {
    command = prompt("Enter a command").trim();
    // Add a todo
    if (command === "new") {
        let todo = prompt("Enter todo to create").trim();
        if (todo === null) continue;
        if (!todo) {
            let confirms = confirm("Todo is empty, are you sure you want to save this?");
            if (confirms === false) continue;
        }
        todos.push(todo);
    }
    // List todos
    else if (command === "list") {
        let output = "";
        for (let i = 0; i < todos.length; i++) {
            output += `${i}: ${todos[i]}\n`;
        }
        alert(output);
    }
    // Delete todo
    else if (command === "del") {
        let delIndex = parseInt(prompt("Enter index of todo to delete"));
        todos.splice(delIndex, 1);
    }
    else if (command == "quit") {
        alert("Goodbye!");
        break;
    }
    else {
        alert("haha m8 w0t is dat?");
    }
}