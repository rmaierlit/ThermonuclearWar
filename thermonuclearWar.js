var pieces = {
  0: '#',
  1: 'X',
  '-1': 'O'
};

var players = {
  1: 'player1',
  '-1': 'player2'
};

var Game = function() {
  this.board = [];
  this.activePlayer = 1;
  this.rowSums = [0,0,0];
  this.columnSums = [0,0,0];
  this.majorDiagSum = 0;
  this.minorDiagSum = 0;

  var size = 3;

  for (var i = 0; i < size; i++) {
    var row = [];
    for (var j = 0; j < size; j++) {
      row.push(0);
    }
    this.board.push(row);
  }

  console.log('Would you like to play a game?');
  console.log('it is time for', players[this.activePlayer], 'to play');
};

Game.prototype = {
  placePiece: function(player, row, column) {
    if (this.board[row][column] === 0) {
      this.board[row][column] = player;
      this.rowSums[row] += player;
      this.columnSums[column] += player;

      //check if in major diagonal
      if (row === column) {
        this.majorDiagSum += player;
      }

      //check if in minor diagonal
      if (row + column === 2){
        this.minorDiagSum += player;
      }
      return true;
    } else {
      return false;
    }
  },
  switchPlayer: function() {
    this.activePlayer = -(this.activePLayer);
  },
  checkWin: function() {
    var allSums = this.rowSums.concat(this.ColumnSums, this.majorDiagSum, this.minorDiagSum);
    if (allSums.includes(3)) {
      return 1;
    } else if (allSums.includes(-3)) {
      return -1;
    } else {
      return 0;
    }
  },
  play: function(row, column) {
    this.placePiece(this.activePlayer, row, column);
    var winner = this.checkWin();
    if (winner !== 0) {
      console.log(players[winner], 'wins!');
    } else {
      this.switchPlayer();
      console.log('it is time for', players[this.activePlayer], 'to play');
    }
  }
};

var fun = new Game();
