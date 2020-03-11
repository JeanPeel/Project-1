//initializing firebase
var config = {
    apiKey: "AIzaSyCknN_Lk3XNKwsggryvBP-ih5vMImqi6cM",
    authDomain: "productiveproject1.firebaseio.com/",
    databaseURL: "https://productiveproject1.firebaseio.com/"
};

firebase.initializeApp(config);

var database = firebase.database();
var count = 0;

var scoreArray = [];

var currentScore = (scoreArray[0]);

// var scoreKeeper = firebase.database.score();

//Creating new to-do when submit button is clicked.

$("#submitButton").on("click", function (event) {
    event.preventDefault();

    count++;
    
    $(".score-keeper").html(count); 

    //grabs user input
    var userToDo = $("#toDoInput").val().trim();
    var toDoCategory = $("#categoryInput").val().trim();
    var toDoColor = $("#colorOfInput").val().trim();
    var toDoImportanceLevel = $("#importanceLevelInput").val().trim();
    var toDoDueDate = $("#dateDueInput").val().trim();
    var databaseScore = count;
    
    //Creates local "temporary" object for holding new to-do data
    var newToDo = {
        todo: userToDo,
        category: toDoCategory,
        color: toDoColor,
        importance: toDoImportanceLevel,
        date: toDoDueDate,
        score: databaseScore
    };

    //Uploads new to-do to the database
    database.ref().push(newToDo);

    //logs everything to console
    console.log(newToDo.todo);
    console.log(newToDo.category);
    console.log(newToDo.color);
    console.log(newToDo.importance);
    console.log(newToDo.date);
    console.log(newToDo.score);

    //clears all text-boxes
    $("#toDoInput").val("");
    $("#categoryInput").val("");
    $("#colorOfInput").val("#000000");
    $("#importanceLevel").val("");
    $("#dateDueInput").val("");

});

//Create firebase event for adding a row in the html when a user adds an entry.
database.ref().on("child_added", function (childSnapshot) {
    //Assign values from the database object. 
    var key = childSnapshot.key;
    var value = childSnapshot.val();

    //To-Do Information
    console.log(value);

    //Create checkmark box to add before todo.
    var checkbox = $("<input type='checkbox' class = 'checkbox'>");

    checkbox.on("click", function (event) {
        if ($(this).prop("checked") == true) {
            childSnapshot.ref.child("checked").set($(this).prop("checked"));
        }
        else if ($(this).prop("checked") == false) {
            childSnapshot.ref.child("checked").set(false);
        }
    });

    //Marking tasks on HTML as checked to match database.
    if (value.checked == true) {
        $(checkbox).prop("checked", value.checked)
    };

    //Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(value.todo).prepend(checkbox),
        $("<td>").text(value.category),
        $("<td>").text(value.importance),
        $("<td>").text(value.date)
        // $("<td>").text(value.timeleft)
    );

    //Append the new row to the table
    $("#to-do-table > #to-do-list").append(newRow);

    $("#database.score").text(value.score);

    var scoreValue = value.score;

    scoreArray.unshift(scoreValue);

    console.log("Database Score Value: " + value.score);
    console.log("Score Value: " + value.score);
    console.log("Score Array: " + scoreArray);
    console.log("Current Score: " + currentScore);

    currentScore = (scoreArray[0]);
});


