console.log("soy el index.js");

const sideCart = document.getElementById("sideCart");

const showCart = () => {
  sideCart.classList.remove("disabled");
  sideCart.classList.add("active");

  const bg = document.getElementById("bg");
};

const hideCart = () => {
  sideCart.classList.add("hiding");
  setTimeout(() => {
    sideCart.classList.add("disabled");
    sideCart.classList.remove("hiding", "active");
  }, 400);
};
