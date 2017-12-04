// IIFE
(() => {
  const gameBoard = `
    <div class="board" id="board">
      <header>
        <h1>Tic Tac Toe</h1>
        <ul>
          <li class="players" id="player1"><h4>Player 1</h4><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg></li>
          <li class="players" id="player2"><h4>Computer</h4><svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg></li>
        </ul>
      </header>
      <ul class="boxes">
        <li class="box" id="0"></li>
        <li class="box" id="1"></li>
        <li class="box" id="2"></li>
        <li class="box" id="3"></li>
        <li class="box" id="4"></li>
        <li class="box" id="5"></li>
        <li class="box" id="6"></li>
        <li class="box" id="7"></li> 
        <li class="box" id="8"></li>
      </ul>
    </div>
  `;

  const gameStart = `
    <div class="screen screen-start" id="start">
      <header>
        <h1>Tic Tac Toe</h1>
        <a href="#" class="button">Start game</a>
      </header>
    </div>
  `;

  const gameWin = `
    <div class="screen screen-win" id="finish">
      <header>
        <h1>Tic Tac Toe</h1>
        <p class="message"></p>
        <a href="#" class="button">New game</a>
      </header>
    </div>
  `;

  const winningMoves = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6] // Diagonal
  ];

  let name;
  let computerMoves;
  let playing;
  let turn;

  // Append start screen on load
  $('.container').append(gameStart);

  // Game start click handler
  $('.container').on('click', '.screen-start .button', () => {
    $('.container').empty();
    $('.container').append(gameBoard);
    $('#player1').addClass('active');

    name = prompt('What is your name?');

    if (name) {
      $('#player1 h4').html(name);
    }

    computerMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    playing = true;
    turn = 0;
  });

  // New game click handler
  $('.container').on('click', '.screen-win .button', () => {
    $('.container').empty();
    $('.container').append(gameBoard);
    $('#player1').addClass('active');

    if (name) {
      $('#player1 h4').html(name);
    }

    computerMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    playing = true;
    turn = 0;
  });

  // Game click handler
  $('.container').on('click', '.boxes .box', (event) => {
    // Prevent already filled boxes from being modified
    if (playing === true && $(event.target).hasClass('filled') === false) {
      // Player 1 functionality
      if (turn % 2 === 0) {
        turn += 1;

        $(event.target).addClass('filled box-filled-1');
        $('#player1').removeClass('active');
        $('#player2').addClass('active');

        // Remove the number from the list of possible computer moves
        computerMoves.splice(computerMoves.indexOf(parseInt($(event.target).attr('id'))), 1);

        // The items of each array align with the IDs of each box
        winningMoves.forEach((item) => {
          // Append the winning screen and end the game if there is a match
          if ($(`#${item[0]}`).hasClass('box-filled-1') && $(`#${item[1]}`).hasClass('box-filled-1') && $(`#${item[2]}`).hasClass('box-filled-1')) {
            $('.container').empty().append(gameWin);
            $('p').text(`${name} wins!`);
            $('.screen-win').addClass('screen-win-one');

            playing = false;
          }
        });
      }

      // Computer functionality
      if (turn % 2 !== 0 && turn < 9) {
        // Get a random index of the remaining available moves and fill the corresponding box ID
        const random = Math.floor(Math.random() * computerMoves.length);

        turn += 1;

        $(`#${computerMoves[random]}`).addClass('filled box-filled-2');
        $('#player2').removeClass('active');
        $('#player1').addClass('active');

        // Remove the number from the list of possible computer moves
        computerMoves.splice(computerMoves.indexOf(computerMoves[random]), 1);

        // Check if the computer beat you
        winningMoves.forEach((item) => {
          // Append the winning screen and end the game if there is a match
          if ($(`#${item[0]}`).hasClass('box-filled-2') && $(`#${item[1]}`).hasClass('box-filled-2') && $(`#${item[2]}`).hasClass('box-filled-2')) {
            $('.container').empty().append(gameWin);
            $('p').text('Computer wins!');
            $('.screen-win').addClass('screen-win-two');

            playing = false;
          }
        });
      }
    }

    // If all boxes are filled and no winner was found, append the tie screen
    if (playing === true && turn === 9) {
      $('.container').empty().append(gameWin);
      $('p').text("It's a Tie");
      $('.screen-win').addClass('screen-win-tie');

      playing = false;
    }
  });

  // Mouse enter handler
  $('.container').on('mouseenter', '.boxes .box', (event) => {
    if (playing === true && $(event.target).hasClass('filled') === false) {
      if (turn % 2 === 0) {
        $(event.target).addClass('box-hover-1');
      }
    }
  });

  // Mouse leave handler
  $('.container').on('mouseleave', '.boxes .box', (event) => {
    if (playing === true && $(event.target).hasClass('filled') === false) {
      if ($(event.target).hasClass('box-hover-1')) {
        $(event.target).removeClass('box-hover-1');
      }
    }
  });
})();
