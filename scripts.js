const player = (symbol, name) => {
  const playerSymbol = () => symbol;
  const playerName = () => name;

  return { playerSymbol, playerName };
};

const gameBoard = (() => {
  const _gameboard = ["", "", "", "", "", "", "", "", ""];

  const squares = () => [...document.getElementsByClassName("square")];

  const _render = () => {
    squares().forEach((square, i) => {
      square.firstChild.innerText = _gameboard[i];
    });
  };

  const draw = (playerSymbol, square) => {
    _gameboard[square] = playerSymbol;
    _render();
  };

  return { draw, squares };
})();

const game = (() => {
  const player1 = player("X", prompt("seleccionar nombre para jugador 1"));
  const player2 = player("O", prompt("seleccionar nombre para jugador 2"));

  const domSquares = gameBoard.squares();

  const winMessage = document.querySelector(".display");
  const reloadButton = document.querySelector(".reload");
  const parentDiv = document.querySelector(".container");

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const init = () => {
    _clicked();
  };

  const _clicked = () => {
    domSquares.forEach((square, i) => {
      square.addEventListener("click", () => {
        // Preguntar si el square clickeado esta vacio si no esta no hacer nada
        if (square.firstChild.innerText !== "") return;

        // Dibujar la marca correspondiente al turno del jugador
        gameBoard.draw(_turn(true).playerSymbol(), i);

        _isTie();
        _checkForWinner();
      });
    });
  };

  let counter = 0;
  const _turn = (passed) => {
    if (passed === true) counter++;
    return counter === 0 || counter % 2 === 0 ? player2 : player1;
  };

  const _checkForWinner = () => {
    winningConditions.forEach((condition) => {
      let counter = 0;
      condition.forEach((elem) => {
        if (
          domSquares[elem].firstChild.innerText === _turn(false).playerSymbol()
        )
          counter++;
        if (counter == 3) _displayResult(_turn().playerName());
      });
    });
  };

  const _isTie = () => {
    // Si todos los squares estan llenos devolver true
    domSquares.every((square) => square.firstChild.innerText !== "")
      ? _displayResult()
      : null;
  };

  const _displayResult = (winner) => {
    if (winner) winMessage.innerHTML = `El ganador es ${winner}`;
    else winMessage.innerHTML = "Empate";
    _unclickable();
    reloadButton.style.display = "flex";
  };

  const _unclickable = () => {
    parentDiv.classList.contains === "unclickable"
      ? parentDiv.classList.remove("unclickable")
      : parentDiv.classList.add("unclickable");
  };

  return { init };
})();

game.init();
