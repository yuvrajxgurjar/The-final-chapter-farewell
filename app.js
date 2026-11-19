let photos = [];
let visiblePhotos = [];
let currentPhoto = 0;

const grid = document.getElementById("gallery-grid");
const count = document.getElementById("photo-count");
const emptyNote = document.getElementById("empty-note");

function safe(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}

async function loadData() {
  try {
    const response = await fetch("./photos.json?v=5");
    if (!response.ok) throw new Error(`photos.json: HTTP ${response.status}`);
    const data = await response.json();
    photos = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Could not load photos:", error);
    photos = [];
  }
  visiblePhotos = photos;
  renderPhotos();

  try {
    const response = await fetch("./videos.json?v=1");
    if (!response.ok) throw new Error(`videos.json: HTTP ${response.status}`);
    const videos = await response.json();
    renderVideos(Array.isArray(videos) ? videos : []);
  } catch (error) {
    console.error("Could not load videos:", error);
    renderVideos([]);
  }
}

function renderPhotos() {
  grid.innerHTML = "";
  count.textContent = `${visiblePhotos.length} PHOTO${visiblePhotos.length === 1 ? "" : "S"}`;
  emptyNote.style.display = visiblePhotos.length ? "none" : "block";

  visiblePhotos.forEach((photo, index) => {
    const button = document.createElement("button");
    button.className = "photo-card";
    const image = document.createElement("img");
    image.loading = "lazy";
    image.src = photo.src;
    image.alt = photo.title || "Farewell photograph";
    image.onerror = () => { button.classList.add("image-missing"); image.alt = "Image unavailable"; };
    const caption = document.createElement("span");
    caption.textContent = photo.title || photo.category || "Farewell memory";
    button.append(image, caption);
    button.addEventListener("click", () => openLightbox(index));
    grid.appendChild(button);
  });
}

document.getElementById("filters").addEventListener("click", event => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === button));
  visiblePhotos = button.dataset.category === "All"
    ? photos
    : photos.filter(photo => photo.category === button.dataset.category);
  renderPhotos();
});

function openLightbox(index) {
  currentPhoto = index;
  showLightbox();
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}
function showLightbox() {
  const photo = visiblePhotos[currentPhoto];
  if (!photo) return;
  document.getElementById("lightbox-image").src = photo.src;
  document.getElementById("lightbox-caption").textContent = photo.title || photo.category || "";
}
function movePhoto(direction) {
  if (!visiblePhotos.length) return;
  currentPhoto = (currentPhoto + direction + visiblePhotos.length) % visiblePhotos.length;
  showLightbox();
}
function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}
document.getElementById("prev-photo").addEventListener("click", () => movePhoto(-1));
document.getElementById("next-photo").addEventListener("click", () => movePhoto(1));
document.getElementById("close-lightbox").addEventListener("click", closeLightbox);
document.getElementById("lightbox").addEventListener("click", event => {
  if (event.target.id === "lightbox") closeLightbox();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") movePhoto(-1);
  if (event.key === "ArrowRight") movePhoto(1);
});

function renderVideos(videos) {
  const box = document.getElementById("video-grid");
  const note = document.getElementById("video-empty");
  box.innerHTML = "";
  note.style.display = videos.length ? "none" : "block";
  videos.forEach(video => {
    const card = document.createElement("article");
    card.className = "video-card";
    const player = document.createElement("video");
    player.controls = true;
    player.playsInline = true;
    player.preload = "metadata";
    const source = document.createElement("source");
    source.src = video.src;
    source.type = "video/mp4";
    player.appendChild(source);
    const title = document.createElement("h3");
    title.textContent = video.title || "Farewell video";
    card.append(player, title);
    box.appendChild(card);
  });
}

loadData();
