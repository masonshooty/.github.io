document.addEventListener("DOMContentLoaded", function() {
    const ROWS = 6;
    const COLS = 7;
    let currentPlayer = 1;
    let board = createBoard();
  
    const boardElement = document.getElementById('board');
    const statusElement = document.getElementById('status');
  
    renderBoard();
  
    function createBoard() {
      let board = [];
      for (let i = 0; i < ROWS; i++) {
        board.push(Array(COLS).fill(0));
      }
      return board;
    }


  
    function renderBoard() {
      boardElement.innerHTML = '';
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.dataset.row = row;
          cell.dataset.col = col;
          cell.addEventListener('click', handleCellClick);
          boardElement.appendChild(cell);
        }
      }
    }


  
    function handleCellClick(event) {
      const col = parseInt(event.target.dataset.col);
      const row = dropToken(col);
      if (row !== -1) {
        if (checkWin(row, col)) {
          statusElement.textContent = `Player ${currentPlayer} wins!`;
          boardElement.removeEventListener('click', handleCellClick);
        } else if (checkTie()) {
          statusElement.textContent = 'It\'s a draw!';
        } else {
          currentPlayer = currentPlayer === 1 ? 2 : 1;
          statusElement.textContent = `Player ${currentPlayer}'s Turn`;
        }
      }
    }


  
    function dropToken(col) {
      for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === 0) {
          board[row][col] = currentPlayer;
          renderToken(row, col);
          return row;
        }
      }
      return -1;
    }


  
    function renderToken(row, col) {
      const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
      cell.classList.add(currentPlayer === 1 ? 'player1' : 'player2');
    }


  
    function checkWin(row, col) {
      const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
      for (const [dx, dy] of directions) {
        let count = 1;
        for (let dir = -1; dir <= 1; dir += 2) {
          for (let i = 1; i < 4; i++) {
            const r = row + i * dir * dx;
            const c = col + i * dir * dy;
            if (r < 0 || r >= ROWS || c < 0 || c >= COLS || board[r][c] !== currentPlayer) break;
            count++;
          }
        }
        if (count >= 4) return true;
      }
      return false;
    }


  
    function checkTie() {
      for (let col = 0; col < COLS; col++) {
        if (board[0][col] === 0) return false;
      }
      return true;
    }
  });
  