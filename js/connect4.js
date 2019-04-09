class Connect4 {
  constructor(connector) {
    this.rows = 7;
    this.columns = 8;
    this.connector = connector;
    this.isOver = false;
    this.player = "playerOne";
    this.colorTurn = function() {};
    this.showUserName();
    this.createGrid();
    this.eventListeners();
  }
  // show player names
  showUserName() {
    // inputs
    let $inputOne = $(".playerInput1");
    let $inputTwo = $(".playerInput2");
    var $playerOne = $(".playerOneName");
    var $playerTwo = $(".playerTwoName");

    $inputTwo.on("change", () => {
      $playerOne.text($inputOne.val()).css("color", "#ff142b");
      $playerTwo.text($inputTwo.val()).css("color", "#ffee07");
      console.log($playerOne);
      // $playerOne.val();
      // $playerTwo.val();
      $(".players").css("display", "flex");
      $("input").css("display", "none");
    });
  }

  createGrid() {
    // create a div
    const $gameboard = $(this.connector);

    this.isOver = false;
    $gameboard.empty();
    for (let row = 0; row < this.rows; row++) {
      const $row = $("<div></div>").addClass("row");

      for (let col = 0; col < this.columns; col++) {
        const $col = $("<div></div>")
          .addClass("col empty")
          .attr("data-col", col)
          .attr("data-row", row);
        // append columns to rows
        $row.append($col);
      }
      // append rows to board
      $gameboard.append($row);
    }
  }

  // set up event listeners
  eventListeners() {
    const $gameboard = $(this.connector);
    // get access to the original this attr
    const that = this;
    function findLastEmptyCell(col) {
      // get
      const cells = $(`.col[data-col='${col}']`);
      // looping cells backwards
      for (let i = cells.length - 1; i >= 0; i--) {
        const $cell = $(cells[i]);
        // any cells that has empty class
        if ($cell.hasClass("empty")) {
          return $cell;
        }
      }
      return null;
      //   console.log(cells);
    }
    $gameboard.on("mouseenter", ".col.empty", function() {
      if (that.isOver) return;
      const col = $(this).data("col");
      // const $lastEmptyCell = findLastEmptyCell(col);
      // add class when mouse hovers
      // highlight or indicate the color where hovers
      // $lastEmptyCell.addClass(`empty-${that.player}`);
      //   console.log(col);
    });
    // remove class when mouse leaves
    // $gameboard.on("mouseleave", ".col", function() {
    //   $(".col").removeClass(`empty-${that.player}`);
    // });
    $gameboard.on("click", ".col.empty", function() {
      const rollSound = new Audio("resources/token.mp3");
      rollSound.play();
      if (that.isOver) return;
      const col = $(this).data("col");
      const row = $(this).data("row");
      const $lastEmptyCell = findLastEmptyCell(col);
      // remove the class empty when click
      $lastEmptyCell.removeClass(`empty empty-${that.player}`);

      // add color class
      // drop the color when click
      $lastEmptyCell.addClass(that.player);

      $lastEmptyCell.data("player", that.player);

      //   check for winner
      const winner = that.checkWinner(
        $lastEmptyCell.data("row"),
        $lastEmptyCell.data("col")
      );

      if (winner) {
        // give him some applause
        this.isOver = true;
        // alert(`${that.player} won`);
        // remove highlight after game is over
        $(".col.empty").removeClass("empty");

        // modal pops up
        const $modal = $(".modal-content");
        $modal
          .css("display", "flex")
          .text(`Congratulations! You are connec4 master`);

        $gameboard.css("z-index", "1");
        return;
      }

      //   alternate the dropping color
      if (that.player === "playerOne") {
        that.player = "playerTwo";
      } else {
        that.player = "playerOne";
      }
      // color cell showing whose turn
      that.colorTurn();
      $(this).trigger("mouseenter");
    });
  }

  checkWinner(row, col) {
    //
    const that = this;

    //    get the current each cell of col and row
    const $getCell = (i, j) => {
      return $(`.col[data-row='${i}'][data-col='${j}']`);
    };
    //  check direction
    const checkDirection = direction => {
      let cellNum = 0;
      // row and move i direction
      let i = row + direction.i;
      let j = col + direction.j;
      let $next = $getCell(i, j);
      console.log("column", i);
      console.log("row", j);
      console.log($next);
      // keep doing this until the cells are full
      while (
        i < that.rows &&
        j < that.columns &&
        i >= 0 &&
        j >= 0 &&
        $next.data("player") === that.player
      ) {
        cellNum++;
        i += direction.i;
        j += direction.j;

        $next = $getCell(i, j);
      }
      return cellNum;
    };

    const checkWin = (dirA, dirB) => {
      const cellNum = 1 + checkDirection(dirA) + checkDirection(dirB);
      if (cellNum >= 4) {
        return that.player;
      } else {
        return null;
      }
    };

    // check Horizontal wins
    const checkHor = () => {
      //
      return checkWin({ i: 0, j: 1 }, { i: 0, j: -1 });
    };
    // check Vertical wins
    const checkVer = () => {
      // up row = -1, column = 0 and down row = 1, column 0
      return checkWin({ i: -1, j: 0 }, { i: 1, j: 0 });
    };
    // check Diagonal Left to Right
    const checkDiaganolLR = () => {
      return checkWin({ i: 1, j: 1 }, { i: 1, j: -1 });
    };
    // check Diagonal Right to Left
    const checkDiaganolRL = () => {
      return checkWin({ i: 1, j: 1 }, { i: -1, j: -1 });
    };

    return checkHor() || checkVer() || checkDiaganolLR() || checkDiaganolRL();
  }

  restart() {
    this.createGrid();
    const $modal = $(".modal-content");
    $modal.css("display", "none");
  }
}
