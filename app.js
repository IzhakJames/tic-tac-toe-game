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
  },

  state: {
    currentPlayer: 1,
    player1_moves: [],
    player2_moves: [],
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

    App.$.newRoundBtn.addEventListener("click", (event) => {
      alert("Start a new round");
    });

    App.$.playAgainBtn.addEventListener("click", (event) => {
      App.$.modal.querySelector("p").innerHTML = "Player 1 Wins!!";
      App.$.modal.classList.toggle("hidden");
      App.reloading();
    });

    App.$.resetBtn.addEventListener("click", (event) => {
      App.reloading();
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
            console.log(player1_moves);
            console.log(player2_moves);
          }
        }

        const winning_state = App.state.winning_state;
        if ((player1_moves.length >= 3) | (player2_moves.length >= 3)) {
          if (App.state.gameInProgress) {
            winning_state.forEach((state) => {
              if (state.every((id) => player1_moves.includes(String(id)))) {
                console.log("Player 1 has won!");
                App.state.gameInProgress = false;
                const modal = App.$.modal;
                modal.classList.toggle("hidden");
                return;
              }

              if (state.every((id) => player2_moves.includes(String(id)))) {
                console.log("Player 2 has won!");
                App.state.gameInProgress = false;
                const modal = App.$.modal;
                modal.querySelector("p").innerHTML = "Player 2 Wins!!";
                modal.classList.toggle("hidden");
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
