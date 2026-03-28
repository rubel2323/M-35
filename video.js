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

const details = {
  category_id: "1001",
  video_id: "aaaa",
  thumbnail: "https://i.ibb.co/L1b6xSq/shape.jpg",
  title: "Shape of You",
  authors: Array(1),
};

const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((videos) => displayVideos(videos.videos))
    .catch((error) => console.log(error));
};
const displayVideos = (videoItems) => {
  const videoContainer = document.getElementById("videos");
  videoItems.forEach((video) => {
    console.log(video);
    const videoDisplay = document.createElement("div");
    videoDisplay.classList = "card";
    videoDisplay.innerHTML = `
      <figure class="px-10 pt-10">
    <img
      src=${video.thumbnail}
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
    
    `;
    videoContainer.append(videoDisplay);
  });
};
loadVideos();
