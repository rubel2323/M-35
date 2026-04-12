// {category_id: '1001', category: 'Music'}

const removeActiveBtn = () => {
  const buttons = document.querySelectorAll(".btn");
  console.log(buttons);
  buttons.forEach((button) => button.classList.remove("activeBtn"));
};
function loadCategory() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategoryBtn(data.categories))
    .catch((error) => console.error(error));
}

const loadCategoryById = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveBtn();
      let activeButton = document.getElementById(`btn-${id}`);

      // active button added
      activeButton.classList.add("activeBtn");
      console.log("this is loadCategoryById and ", data.category);
      displayVideos(data.category);
    })
    .catch((error) => console.error(error));
};

// Details button function
const loadDetails = async (videoId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`,
  );

  const data = await response.json();

  displayDetails(data.video);
};

const displayDetails = (video) => {
  console.log(video);
  // way-1
  // document.getElementById("my_modal_5").showModal();
  // way-2

  const modalContainer = document.getElementById("modal-content");
  modalContainer.innerHTML = `
  <img src= ${video.thumbnail}>
  <p>${video.description}</p>
  `;
  const modalShow = document.getElementById("customModal");
  modalShow.showModal();
};

function displayCategoryBtn(item) {
  item.forEach((element) => {
    console.log(element.category);
    const category = document.getElementById("displayCatagory");
    const btnContainer = document.createElement("div");
    btnContainer.innerHTML = `
<button id="btn-${element.category_id}" onclick="loadCategoryById(${element.category_id})" class="btn">
${element.category}
</button>

`;

    //append it to implement
    category.appendChild(btnContainer);
  });
}

const detailsInformation = {
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

// search text added
const loadVideos = (searchText = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`,
  )
    .then((res) => res.json())
    .then((videos) => displayVideos(videos.videos))
    .catch((error) => console.log(error));
};

const displayVideos = (videoItems) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";

  if (videoItems.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = ` 
  <div class="min-h-[400px] flex flex-col items-center justify-center">
  <img src="./resources/Icon.png"/>
  <h2 class="font-bold text-2xl">No video added here</h2>
  </div>
  `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }

  videoItems.forEach((video) => {
    // ----

    const videoDisplay = document.createElement("div");
    videoDisplay.classList = "card";
    videoDisplay.innerHTML = `
      <figure class="h-[200px] px-3 py-2 relative">
    <img
      src="${video.thumbnail}"
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
    <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm mt-1 bg-cyan-300 text-black text-lg">Details</button>
    </div>


  </div>
    
    `;
    videoContainer.append(videoDisplay);
  });
};

document.getElementById("search-input").addEventListener("keyup", (event) => {
  loadVideos(event.target.value);
});
loadVideos();
loadCategory();

// sorted view by view number added
function sortedView() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => sortedDisplay(data.videos));
}
//views function calculation
const parseViews = (value) => {
  if (typeof value === "string" && value.toLowerCase().includes("k")) {
    return parseFloat(value) * 1000;
  }
  return parseFloat(value);
};

const sortedDisplay = (allVideos) => {
  allVideos.sort(
    (a, b) => parseViews(b.others.views) - parseViews(a.others.views),
  );

  allVideos.forEach((video) =>
    console.log(video.title, "=", video.others.views),
  );
  displayVideos(allVideos);
};

document.getElementById("sort-btn").addEventListener("click", sortedView);
