'use strict';

console.log('front.js file was loaded');

const usersUrl = 'http://localhost:3000/api/users';
const usersTowns = 'http://localhost:3000/api/users/town';

// parsisiusti vartotojus ir iskonsolinti
// pakeiciau
async function getUsers(url) {
  try {
    const resp = await fetch(url);
    //console.log(resp);
    const usersData = await resp.json();
    //console.log(usersData);
    usersData.map((user) => {
      document.querySelector(".user").innerHTML += `<p>${user.name}</p>`
    })
  } catch (error) {
    console.warn(error);
  }
}
getUsers(`${usersUrl}`);

// parsiunčia miestus
async function getTowns() {
  try {
    const resp = await fetch(usersTowns);
    const townsData = await resp.json();
    townsData.map((town) => {
      console.log(town)
      document.querySelector(".town").innerHTML += `<p>${town}</p>`;
    });
  } catch (error) {
    console.warn(error);
  }
}
const getTownsButton = document.getElementById('getTownsButton');
getTownsButton.addEventListener('click', getTowns);

