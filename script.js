const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);
let modalQT = 1;

pizzaJson.map((item, index) => {
  let pizzaItem = c(".models .pizza-item").cloneNode(true);

  pizzaItem.setAttribute("data-key", index);

  pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
  pizzaItem.querySelector(".pizza-item--img img").src = item.img;
  pizzaItem.querySelector(".pizza-item--price").innerHTML = `R$${item.price}`;
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;

  pizzaItem.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();
    let key = e.target.closest(".pizza-item").getAttribute("data-key");
    modalQT = 1;

    c(".pizzaInfo h1").innerHTML = pizzaJson[key].name;
    c(".pizzaInfo .pizzaInfo--desc").innerHTML = pizzaJson[key].description;
    c(
      ".pizzaInfo .pizzaInfo--price .pizzaInfo--actualPrice"
    ).innerHTML = `R$${pizzaJson[key].price}`;
    c(".pizzaBig img").src = pizzaJson[key].img;

    c(".pizzaInfo--size.selected").classList.remove("selected");
    cs(".pizzaInfo--size").forEach((size, sizeIndex) => {
      if (sizeIndex == 2) {
        size.classList.add("selected");
      }
      size.querySelector("span").innerHTML = pizzaJson[key].sizes[sizeIndex];
    });

    c(".pizzaInfo--qt").innerHTML = modalQT;

    c(".pizzaWindowArea").style.opacity = 0;
    c(".pizzaWindowArea").style.display = "flex";
    setTimeout(() => {
      c(".pizzaWindowArea").style.opacity = 1;
    }, 50);
  });

  c(".pizza-area").append(pizzaItem);
});

c(".pizzaInfo--cancelButton").addEventListener("click", (e) => {
  c(".pizzaWindowArea").style.display = "none";
});
