// ========================================== START CODING BELOW!!

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDKv_uBIZS3Um4QvuV6A1jV8gLp0uoygc4",
    authDomain: "trainscedule-2ff1d.firebaseapp.com",
    databaseURL: "https://trainscedule-2ff1d.firebaseio.com",
    projectId: "trainscedule-2ff1d",
    storageBucket: "trainscedule-2ff1d.appspot.com",
    messagingSenderId: "158390279750"
};

firebase.initializeApp(config);


// Create a variable to reference the database.
var database = firebase.database();

// Initial Values



// Capture Button Click
$("#submit").on("click", function (event) {
    event.preventDefault();

    var train = $("#train").val().trim();
    var destination = $("#destination").val().trim();
    var time = $("#time").val().trim();
    var freq = $("#freq").val().trim();
    // Grabbed values from text boxes
    
    if(train === "" || destination === "" || time === "" | freq === ""){
        alert("Field is Missing");
    }else{
    
    // Code for handling the push
    database.ref().push({
        train: train,
        destination: destination,
        time: time,
        freq: freq,
    });


    $("#train").val("");
    $("#destination").val("");
    $("#time").val("");
    $("#freq").val("");
}

});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of childSnapshot
    console.log(childSnapshot.val());
    console.log(childSnapshot.val().train);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().time);
    console.log(childSnapshot.val().freq);
    // Change the HTML to reflect
    var train = childSnapshot.val().train;
    var destination = (childSnapshot.val().destination);
    var time = (childSnapshot.val().time);
    var freq = (childSnapshot.val().freq);

    var convertedTime = moment(time, "HH:mm");
    console.log("Converted Time: " + convertedTime.format("HH:mm"));
    var currentTime = moment();
    console.log("Current: " + moment(currentTime).format("HH:mm"));
    var timeMinutes = currentTime.diff(convertedTime, "minutes");
    console.log("Time in Minute: "+timeMinutes);
    var frequency = timeMinutes % freq;
    console.log("Remainder: " +frequency);
    var mintuesToTrain = freq - frequency;
    console.log("Minutes til next train: " + mintuesToTrain);
    var nextArrival = (currentTime).add(mintuesToTrain, "minutes").format("HH:mm");
    console.log("Next arrivial time: " +nextArrival);


      var newRow = $("<tr>").append(
         $("<td>").text(train),
         $("<td>").text(destination),
         $("<td>").text(freq),
         $("<td>").text(nextArrival),
         $("<td>").text(mintuesToTrain)
        );

        $("#table").append(newRow);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});