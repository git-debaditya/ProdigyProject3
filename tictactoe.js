var board = ['','','','','','','','',''];
var player = 'X';
var gameStarted = false;
var timer;
var isPlayersTurn = true;

function startGame()
{
  //gameStarted = true;
  document.getElementById('start-btn').style.display = 'none';
  document.getElementById('player-btn').style.display = 'inline-block';
  document.getElementById('ai-btn').style.display = 'inline-block';
} //EoF

function chooseOpponent(opponentType)
{
  gameStarted = true;
  opponent = opponentType;
  document.getElementById('player-btn').style.display = 'none';
  document.getElementById('ai-btn').style.display = 'none';
  document.getElementById('reset-btn').style.display = 'inline-block';
  startTimer();
  if(opponent == 'ai')
  {
    aiMove();
  }
} //EoF

function aiMove()
{
  isPlayersTurn = false;
  if(gameStarted)
  {
    var validMoves = [];
    for(var i = 0; i < board.length; i++)
    {
      if(board[i] == '')
      {
        validMoves.push(i);
      }
    }
    if(validMoves.length > 0)
    {
      var move = validMoves[Math.floor(Math.random() * validMoves.length)];
      board[move] = player;
      player = player == 'X' ? 'O' : 'X';
      createBoard();
      checkWin();
    }
  }
  isPlayersTurn = true;
}

function startTimer()
{
  timer = setTimeout(function()
  {
    if(opponent == 'ai' && player == 'X')
    {
      aiMove();
      startTimer();
    }
    else
    {
      gameStarted = false;
      var playerWhoDidntMove = player;
      player = player == 'X' ? 'O' : 'X';
      alert('Timeout: Player ' + playerWhoDidntMove + " didn't make a move. \n\nPlayer " + player + ' wins!');
      document.getElementById('start-btn').style.display = 'none';
      document.getElementById('reset-btn').style.display = 'none';
      document.getElementById('player-btn').style.display = 'none';
      document.getElementById('ai-btn').style.display = 'none';
      document.getElementById('play-again-btn').style.display = 'inline-block';
    }
  }, 3000);   //timer of 3sec to make a move
} //EoF

function createBoard() 
{
  var boardDiv = document.getElementById('board');
  boardDiv.innerHTML = '';
  for(var i = 0; i < 3; i++)
  {
    var row = document.createElement('div');
    row.className = 'row';
    for(var j = 0; j < 3; j++)
    {
      var cell = document.createElement('div');
      cell.innerHTML = board[i*3+j];
      cell.className = 'cell';
      if(i == 0)
      {
        cell.classList.add('first-row');
      }
      if(i == 2)
      {
        cell.classList.add('last-row');
      }
      if(j == 0)
      {
        cell.classList.add('first-col');
      }
      if(j == 2)
      {
        cell.classList.add('last-col');
      }
      cell.addEventListener('click', 
      (function(index)
      {
        return function() 
        {
          if( gameStarted && isPlayersTurn && board[index] == '') 
          {
            clearTimeout(timer);
            board[index] = player;
            player = player == 'X' ? 'O' : 'X';
            createBoard();
            checkWin();
            startTimer();
          }
        }
      })(i*3+j));
      row.appendChild(cell);
    }
    boardDiv.appendChild(row);
  }
} //EoF

function checkWin() 
{
  var winningCombinations = 
  [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
  ];

  for(var i = 0; i < winningCombinations.length; i++)
  {
    if(board[winningCombinations[i][0]] != '' &&
        board[winningCombinations[i][0]] == board[winningCombinations[i][1]] &&
        board[winningCombinations[i][0]] == board[winningCombinations[i][2]])
        {
          winner = board[winningCombinations[i][0]];
          setTimeout(function()
          {
            clearTimeout(timer);
            gameStarted = false;
            alert('Player ' + winner + ' wins!');
            document.getElementById('start-btn').style.display = 'none';
            document.getElementById('reset-btn').style.display = 'none';
            document.getElementById('play-again-btn').style.display = 'inline-block';
          }, 250);
          return;
        }
  }
  // Check for a draw
  if(!board.includes('')) {
    setTimeout(function()
    {
      clearTimeout(timer);
      gameStarted = false;
      alert("It's a Draw!");
      document.getElementById('start-btn').style.display = 'none';
      document.getElementById('reset-btn').style.display = 'none';
      document.getElementById('play-again-btn').style.display = 'inline-block';
    }, 250);
  }
} //EoF

function playAgain() {
  resetBoard();
  document.getElementById('play-again-btn').style.display = 'none';
  document.getElementById('start-btn').style.display = 'inline-block';
} //EoF

function resetBoard()
{
  clearTimeout(timer);
  board = ['','','','','','','','',''];
  player = 'X';
  gameStarted = false;
  document.getElementById('start-btn').style.display = 'inline-block';
  document.getElementById('reset-btn').style.display = 'none';
  createBoard();
} //EoF

createBoard();

/*********************************************************/