const main = document.querySelector("main");
const row = document.querySelector("#row");

let posicoes = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
let emojis = ["🍌", "🍓", "🍇", "🥝", "🍋", "🥥"];
let bloqueado = false;

let numClick = 1;
let click1 = null;
let click2 = null;
// 🍉🍓🍇🥝

function embaralharArray() {
  const novoArray = [...posicoes];
  for (let i = novoArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
  }
  posicoes = novoArray;
  console.log(posicoes);
}

function criarCards() {
  posicoes.forEach((card, index) => {
    const coluna = document.createElement("div");
    coluna.classList.add("col-3", "d-flex", "justify-content-center");

    const carta = document.createElement("div");
    carta.classList.add("cardsMemoria");

    carta.addEventListener("click", () => {
      if (bloqueado) return;
      if (carta.children.length > 0) return;

      if (numClick === 1) {
        click1 = { valor: card, elemento: carta };
        numClick = 2;
      } else if (numClick === 2 && click1.elemento !== carta) {
        click2 = { valor: card, elemento: carta };
        if (click1.valor === click2.valor) {
          numClick = 1;
          click1 = null;
          click2 = null;
        } else {
          bloqueado = true;

          setTimeout(() => {
            click1.elemento.replaceChildren();
            click2.elemento.replaceChildren();
            numClick = 1;
            click1 = null;
            click2 = null;
            bloqueado = false;
          }, 1000);
        }
      }

      const imagemCarta = document.createElement("h1");
      imagemCarta.classList.add("cardsMemoria");
      imagemCarta.textContent = emojis[card];

      carta.replaceChildren(imagemCarta);
    });

    coluna.append(carta);
    row.append(coluna);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  embaralharArray();
  criarCards();
});
