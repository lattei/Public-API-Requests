/*Declared HTML DOM elements 
gallery for the card divs
body for Modal fn*/
const gallery = document.querySelector('.gallery');
const body = document.querySelector('body');
let users = [];
//Empty array for users helps when mapping!

/* Getting and displaying 12 Random Users, utilizing the API documentation to narrow down what is needed. */
async function getRandomUsers() {
    // const response = await fetch('https://randomuser.me/api/?results=12&inc=name,location,email,picture&noinfo');
    const response = await fetch('https://randomuser.me/api/?results=12');
    const data = await response.json();
    users = data.results;
    console.log(users);
    showUsers(users);
}

function showUsers(users) {
    const usersHTML = users.map(
        (user) => `
        <div class="card" data-name="${user.name.first} ${user.name.last}">
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

/* Modal Event Listeners */
// This function opens up the modal window upon clicking on the card with the corresponding name.
gallery.addEventListener('click', (e) => {
    const userEntry = e.target.closest('.card');
    if (!userEntry) return;
    const userName = userEntry.dataset.name;
    //Find the index of user in users list based on the name
    const userIndex = users.findIndex(user => `${user.name.first} ${user.name.last}` === userName);
    if (userIndex !== -1) {
        userModal(userIndex);
    };
});



/* Modal Window, updated the getRandomUsers fetch url to accomodate the criteria needed 

*/
function userModal(userIndex) {
    //Added for Prev + Next Buttons: get user based on index!
    const user = users[userIndex];
    const modalHTML = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${user.picture.large}" alt="profile picture of ${user.name}">
                    <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                    <p class="modal-text">${user.email}</p>
                    <p class="modal-text cap>${user.location.city}</p>
                    <hr>
                    <p class="modal-text">${user.phone}</p>
                    <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                    <p class="modal-text">Birthday: ${new Date(user.dob.date).toLocaleDateString()}</p>
                </div>
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
        </div>
    `
;
    gallery.insertAdjacentHTML('afterend', modalHTML);
    // This event listener closes the modal window by selecting the X button, and closing!
    const closeModal = document.querySelector('#modal-close-btn');
    closeModal.addEventListener('click', () => closeCurrentModal());
    // For EXCEEDS EXPECTATIONS
    const backModal = document.querySelector('#modal-prev');
    const nextModal = document.querySelector('#modal-next');
    backModal.addEventListener('click', () => {
        closeCurrentModal();
        const newIndex = (userIndex === 0) ? users.length - 1 : userIndex - 1;
        console.log(newIndex)
        userModal(newIndex);
    });
    nextModal.addEventListener('click', () => {
        closeCurrentModal();
        const newIndex = (userIndex === users.length - 1) ? 0 : userIndex + 1;
        userModal(newIndex);

    });
}

function closeCurrentModal() {
    const modalContainer = document.querySelector('.modal-container');
    if (modalContainer) {
        modalContainer.remove();
    }

};

/* Exceeds Expectations Search Feature */
//Select the search container and insert the form HTML provided
const searchContainer = document.querySelector('.search-container');
searchContainer.innerHTML = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
//Select the search input ID in order for User to type
const searchInput = document.querySelector('#search-input');
searchInput.addEventListener('input', (e) => {
    const search = e.target.value.toLowerCase();
    //Call searchUsers to actively search!
    searchUsers(search);
})
/* psuedocode:
Start with no user cards upon searching
Filter through users by first and last name, include them if it meets input
If no corresponding letters or name is found, return an error
Else show users
*/
function searchUsers(search) {
    gallery.innerHTML = '';
    const searchedUsers = users.filter(
        user => {
            const userName = `${user.name.first} ${user.name.last}`.toLowerCase();
            return userName.includes(search);
        }
    );
    if (searchedUsers.length === 0) {
        gallery.innerHTML = "<p> Nothing found, sorry!</p>"
    } else {
        showUsers(searchedUsers);
    }
}