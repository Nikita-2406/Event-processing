class Game {
  constructor() {
    this.widget = document.querySelectorAll(".impactField");
    this.image = document.querySelector("img");
    this.hit_count = document.querySelector(".hit-count");
    this.miss_count = document.querySelector(".miss-count");
    this.pressing = true;
    this.reload_btn = document.querySelector(".reload-game");
  }

  startGame() {
    this.addGameField();
    this.clickGoblin();
    this.replaceField();
    this.reloadButtonClick();
  }

  reloadButtonClick() {
    this.reload_btn.addEventListener("click", () => {
      console.log("click");
      location.reload();
    });
  }

  addGameField() {
    let field = document.createElement("td");
    field.classList.add("impactField");
    let table_row = document.createElement("tr");
    const table = document.createElement("table");
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        table_row.appendChild(field);
        field = document.createElement("td");
        field.classList.add("impactField");
      }
      table.appendChild(table_row);
      table_row = document.createElement("tr");
    }
    document.body.appendChild(table);
  }

  randomId(last_id) {
    const new_id = Math.floor(Math.random() * 16);
    if (new_id === last_id) {
      this.randomId(last_id);
    } else {
      return new_id;
    }
  }

  clickGoblin() {
    this.image.addEventListener("click", () => {
      this.pressing = true;
      this.image.classList.add("invisible");
      this.hit_count.textContent = Number(this.hit_count.textContent) + 1;
    });
  }

  replaceField() {
    this.widget = document.querySelectorAll(".impactField");
    const content = this.image;
    let id = Math.floor(Math.random() * 16);
    const interv = setInterval(() => {
      this.image.classList.remove("invisible");
      this.widget.item(id).appendChild(content);
      id = this.randomId(id);
      if (!this.pressing) {
        this.miss_count.textContent = Number(this.miss_count.textContent) + 1;
      }
      console.log(this.miss_count);
      if (this.miss_count.textContent == 5) {
        setTimeout(() => {
          alert("Вы проиграли!(");
          clearInterval(interv);
        }, 100);
      }
      this.pressing = false;
    }, 1000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const widget = new Game();
  widget.startGame();
});
