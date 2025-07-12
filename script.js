const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);
let modalQT = 1;
let cart = [];
let modalKey = 0;
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
        modalKey = key;

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

cs(".pizzaInfo--cancelButton , .pizzaInfo--cancelMobileButton").forEach((item) => {
    item.addEventListener("click", closeModal);
});

c(".pizzaInfo--qtmenos").addEventListener("click", () => {
    if (modalQT > 1) {
        modalQT--;
    }
    c(".pizzaInfo--qt").innerHTML = modalQT;
});
c(".pizzaInfo--qtmais").addEventListener("click", () => {
    modalQT++;
    c(".pizzaInfo--qt").innerHTML = modalQT;
});

function closeModal() {
    c(".pizzaWindowArea").style.opacity = 0;
    setTimeout(() => {
        c(".pizzaWindowArea").style.display = "none";
    }, 500);
}

cs(".pizzaInfo--size").forEach((size, sizeIndex) => {
    size.addEventListener("click", (e) => {
        c(".pizzaInfo--size.selected").classList.remove("selected");

        size.classList.add("selected");
    });
});

c(".pizzaInfo--addButton").addEventListener("click", () => {
    //aqual pizza
    modalKey;
    //qual tamaho
    let size = parseInt(c(".pizzaInfo--size.selected").getAttribute("data-key"));
    //quantidade
    modalQT;
    let identifier = [pizzaJson[modalKey].id + "@" + size];

    let key = cart.findIndex((item) => {
        return item.identifier == identifier;
    });

    if (key > -1) {
        cart[key].qt += modalQT;
    } else {
        cart.push({
            identifier: identifier,
            id: pizzaJson[modalKey].id,
            qt: modalQT,
            size: size,
        });
    }
    updateCart();

    closeModal();
});

function updateCart() {
    if (cart.length > 0) {
        c("aside").classList.add("show");
        for (let i in cart) {
            //varreo cart
            let pizzaItem = pizzaJson.find((item) => {
                return item.id == cart[i].id; //salva todas as pizzasJson que tem o mesmo id do cart
            });
            console.log(pizzaItem);
        }
    } else {
        c("aside").classList.remove("show");
    }
}
