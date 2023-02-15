// création d'un élément html
function createElement(tagName, attributes) {
  const element = document.createElement(tagName);
  if (attributes) {
    const attrib = { class: attributes };
    // Objet.entries convertit un objet en un tableau d'arrays contenant à chaque index un array de 2 éléments (clé, valeur)
    for (const [attribute, value] of Object.entries(attrib)) {
      element.setAttribute(attribute, value);
    }
  }
  return element;
}
