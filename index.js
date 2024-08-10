#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todos = [];
let condition = true;
let main = async () => {
    while (condition) {
        let option = await inquirer.prompt([
            {
                name: "choices",
                type: "list",
                massage: "Select an option you want to do :",
                choices: ["Add Task", "Delete Task", "Update Task", "View Todo-list", chalk.red("Exit")]
            }
        ]);
        if (option.choices === "Add Task") {
            await addTask();
        }
        else if (option.choices === "Delete Task") {
            await deleteTask();
        }
        else if (option.choices === "Update Task") {
            await updateList();
        }
        else if (option.choices === "View Todo-list") {
            await viewList();
        }
        else if (option.choices === "Exit") {
            condition = false;
        }
    }
};
//function to add new task in a list.
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.green("\nEnter your new Task :\n")
        }
    ]);
    todos.push(newTask.task);
    console.log(chalk.italic(`\n${newTask.task} : add Successfully!\n`));
};
//function to view To-do list.
let viewList = () => {
    console.log(chalk.yellow("\n Your Todo-List : \n"));
    todos.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`);
    });
};
//function to Delete task from the list.
let deleteTask = async () => {
    await viewList();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.italic("Enter the 'index no' of a task you want to Delete :")
        }
    ]);
    let deletedTask = todos.splice(taskIndex.index - 1, 1);
    console.log(chalk.green(`\n${deletedTask} : Deleted Successfully from the List!\n`));
};
//function to Update the list.
let updateList = async () => {
    await viewList();
    let update = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.italic("\nEnter the 'index no' of a task you want to Update :\n")
        },
        {
            name: "updatedTask",
            type: "input",
            message: chalk.bold("\nnow, Enter your new task name :\n")
        }
    ]);
    todos[update.index - 1] = update.updatedTask;
    console.log(chalk.green("\nList Updated Successfully !\n"));
};
main();
