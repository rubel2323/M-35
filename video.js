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
  category: [
    {
      category_id: "1001",
      video_id: "aaaa",
      thumbnail: "https://i.ibb.co/L1b6xSq/shape.jpg",
      title: "Shape of You",
      authors: [
        {
          profile_picture: "https://i.ibb.co/D9wWRM6/olivia.jpg",
          profile_name: "Olivia Mitchell",
          verified: "",
        },
      ],
      others: {
        views: "100K",
        posted_date: "16278",
      },
      description:
        "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey.",
    },
  ],
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
      <figure class="h-[200px] px-3 py-2 relative">
    <img
      src=${video.thumbnail}
      alt="Shoes"
      class="h-full w-full  object-cover rounded-xl" />
      <span class="absolute">
      
      </span>
  </figure>
  <div class="flex gap-2 px-3 py-2">
      <div class="">
            <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}/>
      </div>
    <div>
    <h2 class="font-bold text-2xl">${video.title}</h2>
    <div class="flex gap-2 items-center">
    <p>${video.authors[0].profile_name}</p>
    ${
      video.authors[0].verified == true
        ? `<img class="w-5 h-5 object-cover"
    src="https://img.icons8.com/?size=96&id=91kLZWvmd4sg&format=png"/>`
        : ""
    }
    </div>
    
    </div>


  </div>
    
    `;
    videoContainer.append(videoDisplay);
  });
};
loadVideos();
