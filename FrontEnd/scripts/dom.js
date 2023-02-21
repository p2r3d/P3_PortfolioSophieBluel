// CREATION D'UN ELEMENT HTML
function createElement(tagName, classes = []) {
  const element = document.createElement(tagName);
  if (classes.length>0) {
    element.classList.add(...classes); // ... spread opérator, décompose le tableau en liste d'éléments individuels
  }
  return element;
}

// AFFICHAGE DE LA GALERIE
function displayWorks(worksSent) {
  document.querySelector(".gallery").innerHTML = "";
  HideWhenLogged();
  const categoriesNames = new Set();
  for (let i in worksSent) {
    let workSenti = worksSent[i];
    const workCard = createElement("figure");
    document.querySelector(".gallery").appendChild(workCard);

    // affichage de l'image
    const workImg = createElement("img", ["cardImg"]);
    workCard.appendChild(workImg);
    workImg.setAttribute("crossorigin", "anonymous");
    workImg.src = workSenti.imageUrl;

    // affichage du titre de l'image
    const workTitle = createElement("figcaption", ["cardfigcaption"]);
    workCard.appendChild(workTitle);
    workTitle.innerText = workSenti.title;

    // récup de la catégorie pour l'affichage ultérieur des filtres
    categoriesNames.add(workSenti.category.name);
  }
  
  return (categoriesNames);
}

// AFFICHAGE DES FILTRES
function displayFilters(works, categoriesNames) {
  const portfolio = document.getElementById("portfolio");

  // conteneur filtres rattaché au portfolio
  const filtersContainer = createElement("div",["filters"]);
  const ngallery = document.getElementsByClassName("gallery")[0];
  portfolio.insertBefore(filtersContainer, ngallery);

  // ajout du bouton "Tous"
  const btnAll = createElement("button", ["btn", "SelectedFilter"]);
  btnAll.innerText = "Tous";
  filtersContainer.appendChild(btnAll);
  btnAll.addEventListener("click", function() {
    displayWorks(works);
    updateFilter(btnAll);
  })

  // affichage des boutons de filtre
  for (let categoryName of categoriesNames) {
    const catButton = createElement("button",["btn"]);
    catButton.innerText = categoryName;
    filtersContainer.appendChild(catButton);
    
    catButton.addEventListener("click", function() {
      const FilteredWorks = works.filter(work => work.category.name==categoryName);
      displayWorks(FilteredWorks);
      updateFilter(catButton);
    });
  }
}

// MISE A JOUR DE L'APPARENCE DES BOUTONS FILTRES
function updateFilter(filterBtn) {
  const filters = document.getElementsByClassName("btn");
  for (i = 0; i < filters.length; i++) {
    filters[i].classList.remove("SelectedFilter");
  }
  filterBtn.classList.add("SelectedFilter");
}

// AFFICHAGE QUAND LOGGED
function loggedUser() {
  const filters = document.getElementsByClassName("filters");
  filters[0].classList.add("hidden");
  const modifyLinks = document.getElementsByClassName("modifyLink");
  for (let modifyLink of modifyLinks) {
    modifyLink.style.display="flex";
  }
    const headBand = document.getElementsByClassName("divheadband");
  headBand[0].style.display = "flex";  
}

// CACHAGE DU BANDEAU ET DES LIENS "MODIFIER"
function HideWhenLogged() {
  const modifyLinks = document.getElementsByClassName("modifyLink");
  for (let modifyLink of modifyLinks){
    modifyLink.classList.add("hidden");
  }
  const headBand = document.getElementsByClassName("divheadband");
  headBand[0].classList.add("hidden");
}


// REMPLISSAGE DE LA MODALE
function fillModal(worksSent) {
  document.querySelector(".idPhotosGallery").innerHTML = "";
  HideWhenLogged();

  for (let i in worksSent) {
    let workSenti = worksSent[i];
    const workCard = createElement("figure");
    workCard.classList.add("workCard");
    document.querySelector(".idPhotosGallery").appendChild(workCard);

    // affichage de l'image
    const workImg = createElement("img", ["cardImg"]);
    workImg.setAttribute("crossorigin", "anonymous");
    workImg.src = workSenti.imageUrl;
    workCard.appendChild(workImg);

    // affichage du titre de l'image
    const workTitle = createElement("figcaption");
    workTitle.innerText = "éditer";
    workTitle.style.color="#000000";
    workCard.appendChild(workTitle);
  
    // affichage de la poubelle
    const trashImg = createElement("i", ["idDivTrash"]);
    trashImg.classList.add("fa-solid","fa-trash-can");

    // si clic sur la poubelle 
    trashImg.addEventListener("click", function (e) {
      e.preventDefault();
      workCard.style.display="none";
      fetchDelete(workSenti.id);
      // enlever le work de la liste et relancer displayworks
      let WorkToDelete = worksSent.find(objet => objet.id === workSenti.id);
      let indexToDelete = worksSent.indexOf(WorkToDelete);
      worksSent.splice(indexToDelete, 1);
      displayWorks(worksSent);
      console.log(worksSent);
    })
    workCard.appendChild(trashImg); 
 }
  
 // affichage de l'icône de déplacement sur la 1ère photo
  const card = document.querySelectorAll(".workCard");
  const movingImg = createElement("i", ["idDivMoving"]);
  movingImg.classList.add("fa-solid", "fa-arrows-up-down-left-right");
  card[0].appendChild(movingImg);  
}

