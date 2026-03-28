// {category_id: '1001', category: 'Music'}

function loadCategory() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategoryBtn(data.categories))
    .catch((error) => console.error(error));
}
function displayCategoryBtn(item) {
  item.forEach((element) => {
    console.log(element.category);
    const category = document.getElementById("displayCatagory");
    const btnContainer = document.createElement("button");
    btnContainer.classList.add("btn");
    btnContainer.innerText = element.category;
    category.appendChild(btnContainer);
  });
}
loadCategory();
