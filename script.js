const API_KEY = "MnnUwGJ4fxz0ffhm5skci9g4DfD1rRmXTO2egyTj";

function getData() {
  const date = document.getElementById("datePicker").value;
  const content = document.getElementById("content");
  const loading = document.getElementById("loading");

  loading.style.display = "block";   // show loading

  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      loading.style.display = "none"; // hide loading

      if (data.media_type === "image") {
  content.innerHTML = `
    <h2>${data.title}</h2>
    <img src="${data.url}" width="300" onclick="openModal('${data.url}')"/>
    <p>${data.explanation}</p>
  `;
} else {
  content.innerHTML = `
  <h2>${data.title}</h2>
  <img src="${data.url}" width="300" onclick="openModal('${data.url}')"/>
  <br><br>
  <a href="${data.hdurl}" target="_blank">
    <button>View HD Image</button>
  </a>

  <p>${data.explanation}</p>
`;
}
    })
    .catch(error => {
      loading.style.display = "none";
      console.log("Error:", error);
    });
}

function openModal(src) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");

  modal.style.display = "flex";
  modalImg.src = src;
}

document.getElementById("close").onclick = function () {
  document.getElementById("modal").style.display = "none";
};

function toggleTheme() {
  document.body.classList.toggle("light");
}