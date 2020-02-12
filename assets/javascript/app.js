//initializing firebase
var config = {
    apiKey: "AIzaSyA2QGrQQuHKU30S6xrM9MFwcUzjlcwjltQ",
    authDomain: "to-do-or-not-to-do-list.firebaseio.com/",
    databaseURL: "https://to-do-or-not-to-do-list.firebaseio.com/"
};

firebase.initializeApp(config);

var database = firebase.database();

//Creating new to-do when submit button is clicked.

$("#submitButton").on("click", function(event)
{
    event.preventDefault();

    //grabs user input
    var userToDo = $("#toDoInput").val().trim();
    var toDoCategory = $("#categoryInput").val().trim();
    var toDoColor = $("#colorOfInput").val().trim();
    var toDoImportanceLevel = $("#importanceLevel").val().trim();
    var toDoDueDate = $("#dateDueInput").val().trim();

    //Creates local "temporary" object for holding new to-do data
    var newToDo = {
        todo: userToDo,
        category: toDoCategory,
        color: toDoColor,
        importance: toDoImportanceLevel,
        date: toDoDueDate
    };

    //Uploads new to-do to the database
    database.ref().push(newToDo);

    //logs everything to console
    console.log(newToDo.todo);
    console.log(newToDo.category);
    console.log(newToDo.color);
    console.log(newToDo.importance);
    console.log(newToDo.date);

    //clears all text-boxes
    $("#toDoInput").val("");
    $("#categoryInput").val("");
    $("#colorOfInput").val("");
    $("#importanceLevel").val("");
    $("#dateDueInput").val("");
});