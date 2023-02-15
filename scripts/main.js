// Récupération des infos sur le serveur
async function fetchAPI() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error(`HTTP erreur ${response.status} !`);
    }
    const data = await response.json();
    return data;
  }
  catch (erreur) {
    console.error(erreur);
  }
}

// AFFICHAGE DE LA GALERIE
function displayWorks(worksSent) {
  document.querySelector(".gallery").innerHTML = "";
  for (let i in worksSent) {
    let workSenti = worksSent[i];
    const workCard = createElement("figure");
    document.querySelector(".gallery").appendChild(workCard);
    
    const workImg = createElement("img","cardImg");
    workCard.appendChild(workImg);
    workImg.setAttribute("crossorigin", "anonymous");
    workImg.src = workSenti.imageUrl;

    const workTitle = createElement("figcaption", "cardFigcaption");
    workCard.appendChild(workTitle);
    workTitle.innerText = workSenti.title;
  }
}

fetchAPI().then(works => {
  // -----Affichage des travaux
  displayWorks(works);
});
