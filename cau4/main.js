// define api
const getListChar =
  "https://api.json-generator.com/templates/DTPRZfJQMCHV/data";
const getListCollection =
  "https://api.json-generator.com/templates/pPYRLlfbeG0g/data";
const getListProduct =
  "https://api.json-generator.com/templates/478NCObvctZK/data";

let characters_div = document.getElementById("characters");
let result_div = document.getElementById("searchResult");
let collections_div = document.getElementById("collections");
let products_div = document.getElementById("products");

//setting variants

let sChar = document.getElementById("checkSuggest");
let sCollec = document.getElementById("checkCollection");
let sProduct = document.getElementById("checkProduct");
let sNumberType = document.getElementById("nChatacter");

//loading

let loading = document.getElementById("loading");
let timerId;
let dataSugesst;
let defaultSetting;

// define header

const myHeaders = new Headers({
  Authorization: "Bearer " + "5ytrh2wlhz3ofqq3apr48hn2dv0nbebcoksof423",
  "Content-Type": "application/json",
});

const throttleFn = () => {
  loading.style.visibility = "visible";
  timerId && clearTimeout(timerId);

  timerId = setTimeout(() => {
    loading.style.visibility = "hidden";
    main();
  }, 300);
};

//check hiden result search
const main = () => {
  let query = document.getElementById("query").value;
  if (defaultSetting && query.length >= defaultSetting.nChatacter) {
    result_div.style.visibility = "visible";
    let res = searchcharacters(); // Returned array will be a promise;
    appendcharacters(res); // Add results to the div;
  } else if (!defaultSetting && query.length > 0) {
    result_div.style.visibility = "visible";
    let res = searchcharacters();
    appendcharacters(res);
  } else {
    console.log(defaultSetting);
    result_div.style.visibility = "hidden";
  }
};

document.addEventListener("DOMContentLoaded", async function getTerms(event) {
  getSetting();
  //call api when load page
  try {
    let resTerm = await fetch(getListChar, {
      headers: myHeaders,
      method: "GET",
    });
    let term = await resTerm.json();
    let resCollection = await fetch(getListCollection, {
      headers: myHeaders,
      method: "GET",
    });
    let collection = await resCollection.json();
    let resProduct = await fetch(getListProduct, {
      headers: myHeaders,
      method: "GET",
    });
    let product = await resProduct.json();
    dataSugesst = { term: term, collection: collection, product: product };
    console.log(dataSugesst);
    return collection;
  } catch (error) {
    alert(error);
  }
});

// function filter data by query
const searchcharacters = () => {
  let query = document.getElementById("query").value;
  if (
    dataSugesst.term.length != 0 &&
    dataSugesst.product.length != 0 &&
    dataSugesst.collection.length != 0
  ) {
    let newTerm = dataSugesst.term.filter((el) =>
      el.term.toUpperCase().includes(query.toUpperCase())
    );
    let newCollection = dataSugesst.collection.filter((el) =>
      el.title.toUpperCase().includes(query.toUpperCase())
    );
    let newProduct = dataSugesst.product.filter(
      (el) =>
        el.title.toUpperCase().includes(query.toUpperCase()) ||
        el.brand.includes(query)
    );

    return { term: newTerm, collection: newCollection, product: newProduct };
  } else {
    return { term: [], collection: [], product: [] };
  }
};

// function apply result to dom
const appendcharacters = (d) => {
  characters_div.innerHTML = "";
  collections_div.innerHTML = "";
  products_div.innerHTML = "";

  if (d.term.length !== 0) {
    d.term.forEach((el) => {
      let liE = document.createElement("li");

      let p_name = document.createElement("span");
      p_name.innerHTML = el.term;
      p_name.style.fontSize = "13px";
      p_name.style.color = "#000";
      let a_name = document.createElement("a");
      a_name.href = el.url;
      a_name.style.textDecoration = "none";

      a_name.append(p_name);
      liE.append(a_name);

      characters_div.append(liE);
    });
  }
  if (d.term.length == 0) {
    let p_error = document.createElement("p");
    p_error.innerHTML = "Not found or check again";
    p_error.style.fontSize = "18px";
    p_error.style.textAlign = "center";
    characters_div.append(p_error);
  }
  if (d.collection.length != 0) {
    d.collection.forEach((el) => {
      let liE = document.createElement("li");

      let p_name = document.createElement("span");
      p_name.innerHTML = el.title;
      p_name.style.fontSize = "13px";
      p_name.style.color = "#000";

      let a_name = document.createElement("a");
      a_name.href = el.url;
      a_name.style.textDecoration = "none";

      a_name.append(p_name);
      liE.append(a_name);

      collections_div.append(liE);
    });
  }
  if (d.collection.length == 0) {
    let p_error = document.createElement("p");
    p_error.innerHTML = "No collection Found";
    p_error.style.fontSize = "18px";
    p_error.style.textAlign = "center";

    collections_div.append(p_error);
  }
  if (d.product.length != 0) {
    d.product.forEach((el) => {
      let liE = document.createElement("li");

      let img = document.createElement("img");
      img.src = el.image;
      img.class = "product-image";
      let divIn4 = document.createElement("div");
      divIn4.class = "product-info";

      let p_name = document.createElement("p");
      p_name.innerHTML = el.title;

      let p_brand = document.createElement("p");
      p_brand.innerHTML = el.brand;
      let p_price = document.createElement("p");
      p_price.innerHTML = `${el.price} usd`;

      divIn4.append(p_name, p_brand, p_price);
      liE.append(img, divIn4);

      products_div.append(liE);
    });
  }
  if (d.product.length == 0) {
    let p_error = document.createElement("p");
    p_error.innerHTML = "No product Found";
    p_error.style.fontSize = "18px";
    p_error.style.textAlign = "center";

    products_div.append(p_error);
  }
};

//do form
const doSetting = () => {
  let dataForm = new FormData();
  let data = {};

  dataForm.append("nChatacter", sNumberType.value);
  dataForm.append("checkSuggest", sChar.checked);
  dataForm.append("checkCollection", sCollec.checked);
  dataForm.append("checkProduct", sProduct.checked);

  for (let [k, v] of dataForm.entries()) {
    data[k] = v;
  }
  saveSetting(data);
  return false;
};

// save setting to localstoreage
const saveSetting = (el) => {
  localStorage.setItem("setting", JSON.stringify(el));
  location.reload();
};
// get setting to localstoreage
const getSetting = () => {
  defaultSetting = JSON.parse(localStorage.getItem("setting"));
  if (defaultSetting) {
    sChar.checked = defaultSetting.checkSuggest == "true" ? true : false;
    sCollec.checked = defaultSetting.checkCollection == "true" ? true : false;
    sProduct.checked = defaultSetting.checkProduct == "true" ? true : false;
    sNumberType.defaultValue = defaultSetting.nChatacter;
    document.querySelector(".suggestion").style.display =
      defaultSetting.checkSuggest == "true" ? "block" : "none";
    document.querySelector(".collection").style.display =
      defaultSetting.checkCollection == "true" ? "block" : "none";
    document.querySelector(".product").style.display =
      defaultSetting.checkProduct == "true" ? "block" : "none";
    console.log(defaultSetting);
  }
};
