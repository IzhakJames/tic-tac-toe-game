const App = {
  $: {
    menu: document.querySelector('[data-id="menu-button"]'),
    menuItem: document.querySelector('[data-id="menu-popover"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
    playAgainBtn: document.querySelector('[data-id="play-again-btn"]'),
    squares: document.querySelectorAll(".square"),
    turn: document.querySelector('[data-id="turn"]'),
    modal: document.querySelector(".modal"),
    player1_stats: document.querySelector('[data-id="player-1-stats"]'),
    player2_stats: document.querySelector('[data-id="player-2-stats"]'),
    ties: document.querySelector('[data-id="ties"]'),
  },

  state: {
    currentPlayer: 1,
    player1_moves: [],
    player2_moves: [],
    player1_wins: 0,
    player2_wins: 0,
    ties: 0,
    gameInProgress: true,
    winning_state: [
      [1, 2, 3],
      [1, 4, 7],
      [1, 5, 9],
      [2, 5, 8],
      [3, 6, 9],
      [3, 5, 7],
      [4, 5, 6],
      [7, 8, 9],
    ],
  },

  init() {
    App.registerEventListeners();
  },

  reloading() {
    App.$.squares.forEach((square) => {
      if (square.hasChildNodes()) {
        square.removeChild(square.firstChild);
      }
    });
    App.state.currentPlayer = 1;
    App.state.player1_moves = [];
    App.state.player2_moves = [];
    App.state.gameInProgress = true;

    const turn = App.$.turn;
    turn.querySelector("p").innerHTML = "Player 1, you're up!";

    const newTurnIcon = document.createElement("i");
    newTurnIcon.classList.add("fa-solid", "fa-x", "turquoise");
    turn.replaceChild(newTurnIcon, turn.children[0]);
  },

  registerEventListeners() {
    App.$.menu.addEventListener("click", (event) => {
      App.$.menuItem.classList.toggle("hidden");
    });

    App.$.playAgainBtn.addEventListener("click", (event) => {
      App.$.modal.querySelector("p").innerHTML = "Player 1 Wins!!";
      App.$.modal.classList.toggle("hidden");
      App.reloading();
    });

    App.$.resetBtn.addEventListener("click", (event) => {
      App.reloading();
    });

    App.$.newRoundBtn.addEventListener("click", (event) => {
      App.reloading();
      App.$.player1_wins = 0;
      App.$.player2_wins = 0;
      App.$.player1_stats.innerHTML = "0 Wins";
      App.$.player2_stats.innerHTML = "0 Wins";
      App.$.ties.innerHTML = "0 Wins";
    });

    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        const icon = document.createElement("i");
        const currentPlayer = App.state.currentPlayer;
        const player1_moves = App.state.player1_moves;
        const player2_moves = App.state.player2_moves;
        const turn = App.$.turn;
        if (!square.hasChildNodes()) {
          if (App.state.gameInProgress) {
            if (currentPlayer === 1) {
              icon.classList.add("fa-solid", "fa-x", "turquoise");
              player1_moves.push(square.id);
              App.state.currentPlayer = 2;

              const newTurnIcon = document.createElement("i");
              newTurnIcon.classList.add("fa-solid", "fa-o", "yellow");

              const player = turn.querySelector("p");
              player.innerHTML = "Player 2, you're up!";

              turn.replaceChild(newTurnIcon, turn.children[0]);
            } else {
              icon.classList.add("fa-solid", "fa-o", "yellow");
              player2_moves.push(square.id);
              App.state.currentPlayer = 1;

              const newTurnIcon = document.createElement("i");
              newTurnIcon.classList.add("fa-solid", "fa-x", "turquoise");

              const player = turn.querySelector("p");
              player.innerHTML = "Player 1, you're up!";

              turn.replaceChild(newTurnIcon, turn.children[0]);
            }
            square.appendChild(icon);
          }
        }

        if (player1_moves.length + player2_moves.length === 9) {
          App.state.gameInProgress = false;
          const modal = App.$.modal;
          modal.querySelector("p").innerHTML = "It's a Draw!!";
          App.state.ties++;
          modal.classList.toggle("hidden");
          App.$.ties.innerHTML = String(App.state.ties);
          return;
        }

        const winning_state = App.state.winning_state;
        if ((player1_moves.length >= 3) | (player2_moves.length >= 3)) {
          if (App.state.gameInProgress) {
            winning_state.forEach((state) => {
              if (state.every((id) => player1_moves.includes(String(id)))) {
                App.state.gameInProgress = false;
                const modal = App.$.modal;
                App.state.player1_wins++;
                modal.classList.toggle("hidden");
                App.$.player1_stats.innerHTML =
                  String(App.state.player1_wins) + " Wins";
                return;
              }

              if (state.every((id) => player2_moves.includes(String(id)))) {
                App.state.gameInProgress = false;
                const modal = App.$.modal;
                modal.querySelector("p").innerHTML = "Player 2 Wins!!";
                App.state.player2_wins++;
                modal.classList.toggle("hidden");
                App.$.player2_stats.innerHTML =
                  String(App.state.player2_wins) + " Wins";
                return;
              }
            });
          }
        }
      });
    });
  },
};

window.addEventListener("load", App.init);
