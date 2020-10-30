import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TicTacToe';
  o: String = 'O'; // Player 1
  x: String = 'X'; // Player 2
  comb: Array<Object> = [];
  nextIsX: Boolean;
  board: Array<Array<String>>;
  winner: String;
  winnerText: String = '';

  constructor() { }

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.comb = [];
    this.nextIsX = false;
    this.winner = null;
    this.board = this.generateBoard();
    this.winnerText = '';
  }

  startGame() {
    this.newGame();

    for (let i = 0; i < 8; i++) {
      if (this.winner) break;
      this.playGame();
    }
    
    if (!this.winner) {
      this.winnerText = 'Draw';
    } else {
      this.winnerText = `The winner is ${this.winner}.`;
    }
  }

  get player() {
    return this.nextIsX ? this.x : this.o;
  }

  playGame() {
    // First Move
    let randomPair = this.generateRandom();
    if (!this.comb.length) {
      this.makeMove(randomPair.x, randomPair.y);
    }

    // Rest moves
    do {
      if (this.comb.length === 9 || this.winner) break;
      randomPair = this.generateRandom();
    } while (this.filterCombs(randomPair.x, randomPair.y));

    this.makeMove(randomPair.x, randomPair.y);
  }

  generateRandom() {
    return {
      x: Math.floor(Math.random() * Math.floor(3)),
      y: Math.floor(Math.random() * Math.floor(3))
    }
  }

  filterCombs(x: number, y: number) {
    return this.comb.filter(
      (a: { x: number, y: number }) => {
        return (a.x === x && a.y === y)
      }
    ).length;
  }

  makeMove(x: number, y: number) {
    this.comb.push({ x, y });
    this.board[x][y] = this.player;
    this.nextIsX = !this.nextIsX;

    this.winner = this.calculateWinner();
  }

  generateBoard() {
    return [
      [
        '',
        '',
        ''
      ],
      [
        '',
        '',
        ''
      ],
      [
        '',
        '',
        ''
      ],
    ];
  }

  calculateWinner() {
    const winMatrix = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ];

    for (let i = 0; i < winMatrix.length; i++) {
      let [a, b, c] = winMatrix[i];
      if (
        this.board[a[0]][a[1]] &&
        this.board[a[0]][a[1]] === this.board[b[0]][b[1]] &&
        this.board[a[0]][a[1]] === this.board[c[0]][c[1]]
      ) {
        return this.board[a[0]][a[1]];
      }
    }

    return null;
  }

}
