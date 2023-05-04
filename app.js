const App = {
  $: {
    menu: document.querySelector('[data-id="menu-button"]'),
    menuItem: document.querySelector('[data-id="menu-popover"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
    squares: document.querySelectorAll(".square"),
  },

  state: {
    currentPlayer: 1,
  },

  init() {
    App.registerEventListeners();
  },

  registerEventListeners() {
    App.$.menu.addEventListener("click", (event) => {
      App.$.menuItem.classList.toggle("hidden");
    });

    App.$.newRoundBtn.addEventListener("click", (event) => {
      alert("Start a new round");
    });

    App.$.resetBtn.addEventListener("click", (event) => {
      App.$.squares.forEach((square) => {
        if (square.hasChildNodes()) {
          square.removeChild(square.firstChild);
        }
      });
    });

    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        const icon = document.createElement("i");
        const currentPlayer = App.state.currentPlayer;
        if (!square.hasChildNodes()) {
          if (currentPlayer === 1) {
            icon.classList.add("fa-solid", "fa-x", "turquoise");
            App.state.currentPlayer = 2;
          } else {
            icon.classList.add("fa-solid", "fa-o", "yellow");
            App.state.currentPlayer = 1;
          }
          square.appendChild(icon);
        }
      });
    });
  },
};

window.addEventListener("load", App.init);
