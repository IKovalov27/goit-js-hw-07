import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');

function galleryItem(images) {
    return images.map(({preview, original, description}) => {
        return `
        <div class="gallery__item">
            <a href="${original}" class="gallery__link">
                <img
                  class="gallery__image"
                  src="${preview}" 
                  data-source="${original}"
                  alt="${description}"
                />        
            </a>
        </div>
        `;
    })
    .join(' '); 
}

const cards = galleryItem(galleryItems);
gallery.innerHTML = cards;

let instance = {};

gallery.addEventListener('click', (evt) => {
    evt.preventDefault();
    const img = evt.target.dataset.source;        
    createInstance(img);    
})
  
function createInstance(img) {
     instance = basicLightbox.create(`
            <img src="${img}">`,
        {
            onShow: () => {
                document.addEventListener(('keydown'), onEscPress)
            },
            onClose: () => {
                document.removeEventListener(('keydown'), onEscPress)
            }
        });
    
    instance.show();
}

function onEscPress(evt) {
    
    if (evt.code === 'Escape') {
        
        return instance.close();        
        }
    }
