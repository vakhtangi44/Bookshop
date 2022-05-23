fetch("./books.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });

function appendData(data) {
  const bgImage = document.createElement("div");
  const capt = document.createElement("div");
  const sp1 = document.createElement("span");
  const sp2 = document.createElement("span");
  const hr = document.createElement("hr");
  const btnOurBooks = document.createElement("button");
  const br = document.createElement("br");

  btnOurBooks.className = "btn";
  btnOurBooks.innerText = "try our books";
  sp1.className = "border";
  sp2.className = "border";
  sp1.innerText = "discover the  ";
  sp2.innerText = "great minds";

  bgImage.className = "bgimg-1";
  capt.className = "caption";
  hr.className = "hr2";

  btnOurBooks.onclick = function () {
    location.href = "#header";
  };

  capt.appendChild(sp1);
  capt.appendChild(br);
  capt.appendChild(sp2);
  capt.appendChild(hr);
  capt.appendChild(btnOurBooks);
  bgImage.appendChild(capt);
  let fragment = new DocumentFragment();

  fragment.appendChild(bgImage);

  const header = document.createElement("header");
  header.setAttribute("id", "header");
  const heading = document.createElement("h1");
  const container = document.createElement("div");

  container.className = "container";
  heading.setAttribute("id", "heading");
  heading.innerHTML = "Book Catalog";

  header.append(heading);
  fragment.append(header);

  let grandCartCont = document.createElement("div");
  grandCartCont.className = "grand-cart-container";
  let cartContainer = document.createElement("div");
  cartContainer.style.cssText = `position:absolute; top: 50%; left: 50%; width: 100px`;
  cartContainer.innerHTML = "mother of cart";
  let cart = document.createElement("div");

  let testInputName = document.createElement("p");
  // cartContainer.appendChild(testInputName);
  // let inputName = document.createElement("input");
  // inputName.type = "text";
  // inputName.value = "type here";
  // cartContainer.appendChild(inputName);
  // cart.appendChild(inputName);
  testInputName.innerText = "test";
  cartContainer.appendChild(testInputName);
  // testInputName.innerText = inputName.value;
  let total = document.createElement("p");
  total.innerText = "0";
  cartContainer.appendChild(total);
  let titleAll = document.createElement("div");
  titleAll.innerText = "All titles";
  cartContainer.appendChild(titleAll);

  var form = document.createElement("form");
  // // document.body.appendChild(form);
  // // form.method = "POST";
  // // form.action = "login.php";
  var element1 = document.createElement("input");
  // element1.name = "un";
  element1.value = "un";
  // element1.type = "hidden";
  form.appendChild(element1);
  var element2 = document.createElement("input");
  // element2.name = "pw";
  element2.value = "pw";
  var s = document.createElement("input");
  s.setAttribute("type", "submit");
  s.setAttribute("value", "Submit");
  s.onclick = function () {
    testInputName.innerText = `${element1.value} && ${element2.value}`;
  };
  // element2.type = "hidden";
  form.appendChild(element2);
  form.appendChild(s);
  // form.submit();
  cartContainer.appendChild(form);

  // let total = document.createElement("p");
  // total.innerText = "0";

  cart.className = "cart-content";
  cart.style.cssText = `background-color: red; position:relative; 
  top: 50%; left: 50%; height: 500px; width: 500px; display: none;`;
  // cartContainer.appendChild(total);
  cartContainer.onclick = function () {
    if (cart.style.display === "block") {
      cart.style.display = "none";
    } else {
      cart.style.display = "block";
    }
  };
  cartContainer.appendChild(cart);
  grandCartCont.appendChild(cartContainer);
  header.append(grandCartCont);

  for (var i = 0; i < data.length; i++) {
    const wrapper = document.createElement("div");
    const info = document.createElement("div");
    const card = document.createElement("div");
    const overlay = document.createElement("div");
    const text = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("h4");
    const author = document.createElement("h5");
    const price = document.createElement("span");

    const slideUpPrice = document.createElement("p");
    const slideUpTitle = document.createElement("p");
    const slideUpAuthor = document.createElement("p");
    const btnAddToCart = document.createElement("button");

    slideUpPrice.className = "slide-up-price";
    slideUpTitle.className = "slide-up-title";
    slideUpAuthor.className = "slide-up-author";
    btnAddToCart.className = "btn-add-to-cart";
    slideUpPrice.innerHTML = data[i].price + "$";
    slideUpTitle.innerHTML = data[i].title;
    slideUpAuthor.innerHTML = "Author: " + data[i].author;
    btnAddToCart.innerHTML = "add to cart";

    btnAddToCart.addEventListener("click", addBookToBasket);

    function addBookToBasket() {
      let elm = document.createElement("div");
      elm.className = "all-elms";
      let btnX = document.createElement("button");

      let btnConfirmOrder = document.createElement("button");
      btnX.innerHTML = "X";
      elm.innerHTML = slideUpPrice.textContent;
      if (cart.textContent.includes(slideUpPrice.textContent)) {
      } else {
        cart.append(elm);
        cart.append(btnX);
        const numbers = cart.textContent.split("$X").map(Number);
        total.textContent = numbers.reduce((p, c) => p + c);
        titleAll.textContent += slideUpTitle.textContent;
        btnX.onclick = function () {
          let val = parseInt(total.textContent) - parseInt(elm.textContent);
          total.textContent = val.toString();
          elm.remove();
          btnX.remove();
        };
      }
    }

    wrapper.className = "wrapper";
    info.className = "info";
    card.className = "card";
    overlay.className = "overlay";
    text.className = "text";
    title.className = "title";
    author.className = "author";
    title.innerHTML = data[i].title;
    author.innerHTML = data[i].author;
    price.innerHTML = data[i].price;
    image.src = data[i].imageLink;

    card.appendChild(image);
    info.appendChild(title);
    info.appendChild(author);
    info.appendChild(price);

    text.appendChild(slideUpPrice);
    text.appendChild(slideUpTitle);
    text.appendChild(slideUpAuthor);
    text.appendChild(btnAddToCart);

    overlay.appendChild(text);

    card.appendChild(overlay);
    card.appendChild(info);

    wrapper.appendChild(card);
    container.appendChild(wrapper);
  }

  fragment.append(container);
  document.body.appendChild(fragment);
}