class Connect4 {
  constructor(connector) {
    this.rows = 6;
    this.columns = 7;
    this.connector = connector;
    this.player = "redPlayer";
    this.createGrid();
    this.eventListeners();
  }
  createGrid() {
    // create a div
    const $gameboard = $(this.connector);
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
      const col = $(this).data("col");
      const $lastEmptyCell = findLastEmptyCell(col);
      // add class when mouse hovers
      $lastEmptyCell.addClass(`empty-${that.player}`);
      //   console.log(col);
    });
    // remove class when mouse leaves
    $gameboard.on("mouseleave", ".col", function() {
      $(".col").removeClass(`empty-${that.player}`);
    });
    $gameboard.on("click", ".col.empty", function() {
      const col = $(this).data("col");
      const $lastEmptyCell = findLastEmptyCell(col);
      // remove the class empty when click
      $lastEmptyCell.removeClass("empty");
      // add color class
      $lastEmptyCell.addClass(that.player);
      if (that.player === "redPlayer") {
        that.player = "blackPlayer";
      } else {
        that.player = "redPlayer";
      }
    });
  }
}
