const API_KEY = "MnnUwGJ4fxz0ffhm5skci9g4DfD1rRmXTO2egyTj";
let allData = [];

function getData() {
  const content = document.getElementById("content");
  const loading = document.getElementById("loading");

  loading.style.display = "block";

  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=10`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      loading.style.display = "none";

      allData = data;  

      displayData(data);  
    })
    .catch(error => {
      loading.style.display = "none";
      console.log("Error:", error);
    });
}

function searchData() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();

  const filteredData = allData.filter(item =>
    item.title.toLowerCase().includes(searchValue)
  );

  displayData(filteredData);
}

function displayData(data) {
  const content = document.getElementById("content");

  content.innerHTML = "";

  data.forEach(item => {
    if (item.media_type === "image") {
      content.innerHTML += `
        <div>
          <h2>${item.title}</h2>
          <img src="${item.url}" width="300" onclick="openModal('${item.url}')"/>
          <br><br>
          <a href="${item.hdurl}" target="_blank">
            <button>View HD Image</button>
          </a>
          <p>${item.explanation}</p>
        </div>
      `;
    } else {
      content.innerHTML += `
        <div>
          <h2>${item.title}</h2>
          <iframe src="${item.url}" width="300"></iframe>
          <p>${item.explanation}</p>
        </div>
      `;
    }
  });
}

function openModal(src) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");

  modal.style.display = "flex";
  modalImg.src = src;
}

window.onload = function () {
  document.getElementById("close").onclick = function () {
    document.getElementById("modal").style.display = "none";
  };
};
function toggleTheme() {
  document.body.classList.toggle("light");
}

function filterData(type) {
  if (type === "all") {
    displayData(allData);
    return;
  }

  const filtered = allData.filter(item => item.media_type === type);

  displayData(filtered);
}

function sortData(order) {
  let sortedData = [...allData];

  if (order === "new") {
    sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (order === "old") {
    sortedData.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  displayData(sortedData);
}