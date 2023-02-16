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
  catch (error) {
    console.error(error);
  }
}

fetchAPI().then(works => {
  // -----Affichage galerie
  // on affiche les travaux et on récupère la liste des catégories
  const categoriesNames = displayWorks(works);
  // on affiche les boutons de filtres par catégorie
  displayFilters(works, categoriesNames);
});


