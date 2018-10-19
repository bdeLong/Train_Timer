// Initialize Firebase
var config = {
  apiKey: "AIzaSyDvpn9Ljs485eKUeOOApOsngjTiAyVRXNc",
  authDomain: "bdelong-train-timer.firebaseapp.com",
  databaseURL: "https://bdelong-train-timer.firebaseio.com",
  projectId: "bdelong-train-timer",
  storageBucket: "bdelong-train-timer.appspot.com",
  messagingSenderId: "929183510119"
};
firebase.initializeApp(config);

var database = firebase.database();

database.ref().on("child_added", function (snapshot) {
  var firstTrainTime = moment(snapshot.val().firstTrainTime, "HH:mm");
  var freq = parseInt(snapshot.val().freq);
  var firstFromNow = moment().diff(firstTrainTime, "minutes");
  var minutesRemainder = firstFromNow % freq;
  var tillNextTrain = freq - minutesRemainder;
  var nextTrain = moment().add(tillNextTrain, "minutes").format("hh:mm a");
  $("#train-table tbody").append(
    `<tr>
    <td>${snapshot.val().name}</td>
    <td>${snapshot.val().dest}</td>
    <td>${snapshot.val().freq} Minutes</td>
    <td>${nextTrain}</td>
    <td>${tillNextTrain} Minutes</td>
    </tr>
    `
  );
});

$("button").on("click", function (event) {
  event.preventDefault();
  var name = $("#train-name-input").val().trim();
  var dest = $("#dest-input").val().trim();
  var freq = $("#freq-input").val().trim();
  var firstTrainTime = $("#first-time-input").val().trim();
  if (name !== "" && dest !== "" && freq !== "" && firstTrainTime !== "") {
    database.ref().push({
      name,
      dest,
      firstTrainTime,
      freq
    })
  };
  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#freq-input").val("");
  $("#first-time-input").val("");
});