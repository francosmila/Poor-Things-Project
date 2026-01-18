'use strict'
// loader

window.addEventListener("load", function () {
	const preloader = document.querySelector(".Preload");
	preloader.classList.add("Preload_oculto");
});

// cuando haga click en el boton, el nav tomará la clase .isActive, lo que hará que aparezca, luego cuando la clase isActive se encuentre activa, el scroll se bloqueará

// header
const nav = document.querySelector('.header__nav')
const btn = document.querySelector('.header__btn')

// abrir y cerrar el menu desplegable y bloquear el scroll 
btn.addEventListener('click',  function(){
  nav.classList.toggle('isActive')  
  document.body.classList.toggle('no-scroll', nav.classList.contains('isActive'))
})

// al hacer click fuera del nav, la clase isActive desaparecerá

document.addEventListener('click', function () {
    const clickFuera = !nav.contains(event.target) && !btn.contains(event.target)
    if (clickFuera) {
      nav.classList.remove('isActive')
      document.body.classList.remove('no-scroll')
    }
  })


// accordion


// cuando haga click en .article__wrapper, se le agregará la clase isVisible a .article__grid--container

const desplegable = document.querySelectorAll('.article__wrapper')
const accordion = document.querySelectorAll('.article__grid--container') 
const plus = document.querySelectorAll('.accordion__article--btn')


desplegable.forEach(function (eachDesplegable, i) {
  eachDesplegable.addEventListener('click', function () {
    const isActive = accordion[i].classList.contains('isVisible');
    
    // Cierra todos los acordeones y resetea los botones
    accordion.forEach(acc => acc.classList.remove('isVisible'));
    desplegable.forEach(btn => btn.classList.remove('isActive'));
    
    // Si no estaba activo, ábrelo y activa el botón
    if (!isActive) {
      accordion[i].classList.add('isVisible');
      eachDesplegable.classList.add('isActive');
    }
  });
});

// lightbox - gallery

const gridImgs = document.querySelectorAll('.gallery__img')
const lightbox = document.querySelector('.gallery__lightbox')
const lightboxImg = document.querySelector('.lightbox__img')

if (lightbox && lightboxImg && gridImgs.length > 0) {
  gridImgs.forEach(eachImg => {
    eachImg.addEventListener('click', () => {
      lightbox.classList.add('isActive')
      lightboxImg.src = eachImg.src
    })
  })

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('isActive')
  })
}


// mini game

let currentElement = null;
let startX = 0, startY = 0;
let offsetX = 0, offsetY = 0;

const draggableItems = document.querySelectorAll('.game__dress--container');

draggableItems.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    e.preventDefault(); // Evita selección de texto

    currentElement = item;

    // Posición del mouse
    startX = e.clientX;
    startY = e.clientY;

    // Posición del elemento dentro de su contenedor
    const rect = currentElement.getBoundingClientRect();
    const parentRect = currentElement.parentElement.getBoundingClientRect();

    offsetX = rect.left - parentRect.left;
    offsetY = rect.top - parentRect.top;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
});

function onMouseMove(e) {
  if (!currentElement) return;

  const dx = e.clientX - startX;
  const dy = e.clientY - startY;

  let newLeft = offsetX + dx;
  let newTop = offsetY + dy;

  const container = currentElement.parentElement;
  const containerRect = container.getBoundingClientRect();

  const maxX = containerRect.width - currentElement.offsetWidth;
  const maxY = containerRect.height - currentElement.offsetHeight;

  newLeft = Math.max(0, Math.min(newLeft, maxX));
  newTop = Math.max(0, Math.min(newTop, maxY));

  currentElement.style.left = newLeft + 'px';
  currentElement.style.top = newTop + 'px';
}

function onMouseUp() {
  currentElement = null;
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
}