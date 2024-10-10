/*Declared HTML DOM elements 
gallery for the card divs
body for Modal fn*/
const gallery = document.querySelector('.gallery');
const body = document.querySelector('body');



/* Getting and displaying 12 Random Users, utilizing the API */
async function getRandomUsers() {
    const response = await fetch('https://randomuser.me/api/?results=12&inc=name,location,email,picture&noinfo');
    const data = await response.json();
    users = data.results;
    console.log(users);
    showUsers(users);
}

function showUsers(users) {
    const usersHTML = users.map(
        (user) => `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${user.picture.large}">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>
        </div>
        `
    )
    .join('');
    gallery.insertAdjacentHTML('beforeend', usersHTML);
}
getRandomUsers();
