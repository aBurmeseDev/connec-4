class Connect4 {
  constructor(connector) {
    this.rows = 6;
    this.cols = 7;
    this.connector = connector;
    this.createGrid();
  }
  createGrid() {
    // create a div
    const $board = $(this.connector);
    for (let row = 0; row < this.rows; row++) {
      const $row = $("<div></div>");
      $row.addClass("row");

      for (let col = 0; col < this.cols; col++) {
        const $col = $("<div></div>").addClass("col empty");
        // append columns to rows
        $row.append($col);
      }
      // append rows to board
      $board.append($row);
    }
  }
}
