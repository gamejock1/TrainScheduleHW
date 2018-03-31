
$(document).ready(function () {

  var config = {
    apiKey: "AIzaSyC0pHhjjnnkU4LvEWSAZkbBeUiQzkK5OxA",
    authDomain: "gt2018-f3e1a.firebaseapp.com",
    databaseURL: "https://gt2018-f3e1a.firebaseio.com",
    projectId: "gt2018-f3e1a",
    storageBucket: "gt2018-f3e1a.appspot.com",
    messagingSenderId: "493500824612"
  };
  firebase.initializeApp(config);


  $("#submit").on("click", function (event) {
    event.preventDefault();


    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = $("#trainTime").val().trim();
    var frequency = $("#frequency").val().trim();

    var newTrain = {
      name: trainName,
      trainDestination: destination,
      time: trainTime,
      scheduledTime: frequency
    };

    database.ref().push(newTrain);

    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#frequency").val("");
  });

  var database = firebase.database();


  database.ref().on("child_added", function (childSnapshot, prevChildKey) {



    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().trainDestination;
    var trainTime = childSnapshot.val().time;
    var frequency = childSnapshot.val().scheduledTime;
    var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var minutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    var nextTrainConverted = moment(nextTrain).format("hh:mm");


    $("#table").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
      frequency + " min" + "</td><td>" + nextTrainConverted + "</td><td>" + minutesTillTrain + "</td></tr>");
  });



});

