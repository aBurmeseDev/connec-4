$(document).ready(function() {
  console.log("worki");
  const connect4 = new Connect4("#connect4");

  $(".resetBtn").click(function() {
    connect4.restart();
  });
});
