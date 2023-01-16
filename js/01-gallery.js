import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector(".gallery");

createGallery();

gallery.addEventListener("click", openImage);

function createGallery() {
  let galleryElements = "";

  galleryItems.forEach((image) => {
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery__item");

    const galleryLink = document.createElement("a");
    galleryLink.classList.add("gallery__link");
    galleryLink.href = image.original;
    galleryItem.append(galleryLink);

    const galleryImg = document.createElement("img");
    galleryImg.classList.add("gallery__image");
    galleryImg.src = image.preview;
    galleryImg.dataset.source = image.original;
    galleryImg.alt = image.description;
    galleryLink.append(galleryImg);

    galleryElements += galleryItem.innerHTML;
  });

  gallery.insertAdjacentHTML("beforeend", galleryElements);
}

function openImage(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const imageSrc = event.target.dataset.source;

  const instance = basicLightbox.create(`<img src="${imageSrc}">`);

  instance.show(onModalShow);
}

function onModalShow(instance) {
  document.addEventListener("keydown", closeModal);

  function closeModal(event) {
    if (event.code === "Escape") {
      instance.close();
      document.removeEventListener("keydown", closeModal);
    }
  }
}
