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
    let size = parseInt(c(".pizzaInfo--size.selected").getAttribute("data-key"));
    let identifier = pizzaJson[modalKey].id + "@" + size;

    let key = cart.findIndex((item) => {
        return item.identifier == identifier;
    });

    if (key > -1) {
        cart[key].qt += modalQT;
    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            qt: modalQT,
            size: size,
        });
    }

    updateCart();

    closeModal();
});
c(".menu-openner").addEventListener("click", () => {
    if (cart.length > 0) {
        c("aside").style.left = "0";
    }
});
c(".menu-closer").addEventListener("click", () => {
    c("aside").style.left = "100vw";
});
function updateCart() {
    c(".menu-openner span").innerHTML = cart.length;

    if (cart.length > 0) {
        c("aside").classList.add("show");
        c(".cart").innerHTML = "";

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for (let i in cart) {
            //varreo cart
            let pizzaItem = pizzaJson.find((item) => {
                return item.id == cart[i].id; //salva todas as pizzasJson que tem o mesmo id do cart
            });

            subtotal += pizzaItem.price * cart[i].qt;
            let cartItem = c(".models .cart--item").cloneNode(true);

            let sizeName;
            switch (cart[i].size) {
                case 0:
                    sizeName = "P";
                    break;
                case 1:
                    sizeName = "M";
                    break;
                case 2:
                    sizeName = "G";
                    break;
            }

            cartItem.querySelector("img").src = pizzaItem.img;
            cartItem.querySelector(
                ".cart--item-nome"
            ).innerHTML = `${pizzaItem.name} (${sizeName})`;
            cartItem.querySelector(".cart--item--qt").innerHTML = cart[i].qt;
            cartItem.querySelector(".cart--item-qtmais").addEventListener("click", () => {
                cart[i].qt++;
                updateCart();
            });
            cartItem.querySelector(".cart--item-qtmenos").addEventListener("click", () => {
                if (cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }

                updateCart();
            });

            c(".cart").append(cartItem);
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        c(".subtotal span:last-child").innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c(".desconto span:last-child").innerHTML = `R$ ${desconto.toFixed(2)}`;
        c(".total span:last-child").innerHTML = `R$ ${total.toFixed(2)}`;
    } else {
        c("aside").classList.remove("show");
        c("aside").style.left = "100vw";
    }
}
