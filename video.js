// {category_id: '1001', category: 'Music'}

function loadCategory() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategoryBtn(data.categories))
    .catch((error) => console.error(error));
}

const loadCategoryById = (id) => {
  alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.category))
    .catch((error) => console.error(error));
};

function displayCategoryBtn(item) {
  item.forEach((element) => {
    console.log(element.category);
    const category = document.getElementById("displayCatagory");
    const btnContainer = document.createElement("div");
    btnContainer.innerHTML = `
<button onclick="loadCategoryById(${element.category_id})" class="btn">
${element.category}
</button>

`;

    //append it to implement
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

// Time display of each post
const getTimePosted = (time) => {
  let hour = parseInt(time / 3600);
  let timeRest = time % 3600;
  let minutes = parseInt(timeRest / 60);

  let secondsRemaining = timeRest % 60;

  return `${hour} hour and ${minutes} minutes and ${secondsRemaining} seconds ago`;
};
// console.log(getTimePosted(3606));

const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((videos) => displayVideos(videos.videos))
    .catch((error) => console.log(error));
};
const displayVideos = (videoItems) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";
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
      ${
        video.others.posted_date?.length == 0
          ? ""
          : `<span class="absolute text-gray-200 font-bold  bottom-2 right-3 bg-black text-xs">
      ${getTimePosted(video.others.posted_date)}
      </span>`
      }
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
