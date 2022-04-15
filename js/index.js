import data from './data.js';

const cardList = document.querySelector('.cards-list');
data.forEach((card) => {
  cardList.innerHTML += `  <li class="card-item flex-center-culomn">
  <div class="img-container">
    <img class="card-image" data-index-number=${card.id} src=${card.image} alt="Portfolio Portfolio">
  </div>
  <div class="right-container">
    <div class="list-container">
      <h2>${card.name}</h2>
       <div class="list">
        <span class="list-item item1">Canopy</span>
        <img class= "list-item-btn"src="images/Counter.jpg" alt="bnt">
        <span class="list-item">back end Dev</span>
        <img class= "list-item-btn"src="images/Counter.jpg" alt="bnt">
        <span class="list-item">2015</span>
       </div>
    </div>
    <div class="text-container">
      <p>
        ${card.detail}
      </p>
    </div>
    <div class="languages-list-container">
      <ul class="lang-container">
        ${(function technoUsed() {
    return card.technologies.map((technology) => `<li class="langage-item"><span>${technology}</span></li>`).join('');
      }())}
      </ul>
    </div>
    <button type="button" data-index-number=${card.id} class="see-btn">See Project</button>
  </div>
</li>
`;
});
// POPUP WINDOW //

const cardPopupWindow = document.querySelector('.card-popup-window');
const seeProjectBtn = document.querySelectorAll('.see-btn');
const seeProjectImg = document.querySelectorAll('.card-image');
const closedWind = document.querySelector('#close-pop');

const arr = [seeProjectBtn, seeProjectImg];
arr.forEach((item) => {
  item.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      cardPopupWindow.classList.add('open-pop-up');
      const filteredCard = data.filter((card) => card.id === Number(link.dataset.indexNumber));
      const title = document.querySelector('.card-popup-window .popup-main-container .main-container .title h2');
      const info = document.querySelectorAll('.card-popup-window .main-container .info span');
      const img = document.querySelector('.card-popup-window .main-container .img-container img');
      const detail = document.querySelector('.card-popup-window .main-container .text-container p');
      const techno = document.querySelector('#lang');
      const links = document.querySelectorAll('.card-popup-window .main-container .about-links a');

      title.innerHTML = filteredCard[0].name;
      img.src = filteredCard[0].image;
      detail.innerHTML = filteredCard[0].fullDesciption;

      for (let i = 0; i < Array.from(info).length; i += 1) {
        if (i === 0) {
          info[i].innerHTML = filteredCard[0].description.type;
        } else if (i === 2) {
          info[i].innerHTML = filteredCard[0].description.interface;
        } else if (i === 4) {
          info[i].innerHTML = filteredCard[0].description.year;
        }
      }

      const technologiesChild = [...techno.childNodes];
      technologiesChild.forEach((child, index) => {
        techno.removeChild(technologiesChild[index]);
      });
      filteredCard[0].technologies.forEach((item) => {
        const techItem = document.createElement('li');
        const techLink = document.createElement('a');
        techLink.href = '#';
        techLink.innerText = item;
        techItem.appendChild(techLink);
        techno.appendChild(techItem);
      });
      links[0].href = filteredCard[0].liveDemo;
      links[1].href = filteredCard[0].sourceCode;
    });
  });
});

closedWind.addEventListener('click', () => {
  cardPopupWindow.classList.remove('open-pop-up');
});

function outputMessage(accepted) {
  const message = document.getElementById('msg');
  if (accepted) {
    message.classList.remove('error');
  } else {
    message.classList.add('error');
    message.innerHTML = 'Please enter a correct email address format';
  }
}

const form = document.querySelector('.container-form');

const email = document.getElementById('email');
const name = document.getElementById('name');
const message = document.getElementById('message');

form.addEventListener('submit', (element) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.value !== email.value.toLowerCase()) {
    element.preventDefault();
    outputMessage(false);
    return;
  }
  if (!emailRegex.test(email.value)) {
    element.preventDefault();
    outputMessage(false);
    return;
  }
  outputMessage(true);
  const data = { email: email.value, name: name.value, message: message.value };
  localStorage.setItem('dataform', JSON.stringify(data));
});
const showData = JSON.parse(localStorage.getItem('dataform'));

if (showData) {
  email.value = showData.email;
  name.value = showData.name;
  message.value = showData.message;
}