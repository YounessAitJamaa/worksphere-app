const addNewWorker = document.getElementById('addNewWorker'); // add new worker button
const modal = document.getElementById('modale'); // the modal
const closeModalbutton = document.querySelectorAll('.closeModal'); // the close buttons
const addWorkerForm = document.getElementById('addWorkerForm'); // the form

const addExperienceButton = document.getElementById('addExperience'); 
const expContainer = document.querySelector('.exp-container'); // the div where the experience added
let count = 1; // the count for the number of experiences

// function for closing and opening modal
const openModal = () => modal.classList.remove('hidden');
const closeModal = () => modal.classList.add('hidden');

// open modal after click on the button add new worker
addNewWorker.addEventListener('click', openModal);

// close button after Click on the cancel button or X
closeModalbutton.forEach(btn => {
    btn.addEventListener('click', closeModal);
});

addExperienceButton.addEventListener('click', () => {
    count++;
    const expItem = document.createElement('div');
    expItem.classList.add('exp-item', 'flex', 'flex-col', 'gap-2');
    expItem.innerHTML = `
                        <div class="flex justify-between items-center">
                            <h5 class="font-semibold mb-2">Expérience ${count}</h5>
                        </div>
                        <input type="text" placeholder="Poste" class="exp-title w-full p-2 bg-white rounded border border-gray-300" required>
                        <input type="text" placeholder="Entreprise" class="exp-company w-full p-2 bg-white rounded border border-gray-300" required>
                        <div class="flex flex-col gap-2">
                            <label for="">Date debut</label>
                            <input type="date" class="exp-start p-2 bg-white rounded border border-gray-300 flex-1" required>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="">Date fin</label>
                            <input type="date" class="exp-end p-2 bg-white rounded border border-gray-300 flex-1" required>
                        </div>
                    `;
    
    expContainer.appendChild(expItem);
});

const unassingnedStaff = [];


let imageSrc = '../img/default.png'; // image url variable
document.getElementById('imageHolder').src = imageSrc;
const image = document.getElementById('image'); // image url input

// eventListener for changing the image holder for 
image.addEventListener('change', (e) => {
    imageSrc = e.target.value;
    document.getElementById('imageHolder').src = imageSrc;
})  


const regexName = /^[A-Za-z\s]{3,20}$/;
const regexEmail = /^[A-Za-z0-9^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPhone = /^[0-9+\s-]{10,13}$/;


function validationName(name) {
    return regexName.test(name);
}

function validationEmail(email) {
    return regexEmail.test(email);
}

function validationPhone(phone) {
    return regexPhone.test(phone);
}

function validationDates(start, end) {
    return new Date(start) < new Date(end);
}

addWorkerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const role = document.getElementById('Role').value;
    const email = document.querySelector('input[name="email"]').value;
    const phone = document.querySelector('input[name="phone"]').value;

    console.log(validationName(name));
    if (!validationName(name)) {
        alert('Invalid Name');
        return;
    }

    if (!validationEmail(email)) {
        alert('invalid email');
        return;
    }

    if (!validationPhone(phone)) {
        alert('invalid phone');
        return;
    }

    const experiences = [];
    let dateError = false;

    document.querySelectorAll('.exp-item').forEach(exp => {
        const start = exp.querySelector('.exp-start').value;
        const end = exp.querySelector('.exp-end').value;
        if (!validationDates(start, end)) {
            alert('Start date cannot be after end date.');
            dateError = true;
            return;
        }
        experiences.push({
            post : exp.querySelector('.exp-title').value,
            enterprise : exp.querySelector('.exp-company').value,
            dateDebut : exp.querySelector('.exp-start').value,
            dateFin : exp.querySelector('.exp-end').value,
        });
    });
    if (dateError) return;

    const staff = {name, role, imageSrc, email, phone,experiences};

    unassingnedStaff.push(staff);


    // localStorage.setItem('unassingnedStaff', JSON.stringify(unassingnedStaff));
    addWorkerForm.reset();
    closeModal();
})



