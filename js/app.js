$(document).ready(function() {
  console.log("worki");
  const connect4 = new Connect4("#connect4");

  connect4.colorTurn = function() {
    if (connect4.player === "redPlayer") {
      $(".colorTurn").css("backgroundColor", "#ff142b");
    } else {
      $(".colorTurn").css("backgroundColor", "#ffee07");
    }
  };
  $(".resetBtn").click(function() {
    connect4.restart();
  });
});
