const unassingnedStaff = JSON.parse(localStorage.getItem('unassingnedStaff')) || []; // the list for unassigned Staff

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

const select = document.getElementById('Role');

fetch('./data/role.json')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        data.forEach(d => {
            const option = document.createElement('option');
            option.setAttribute('value', d.roleName);
            option.textContent = d.roleName;
            select.appendChild(option);
        })
    })
    .catch(error => {
        console.error('Error fetching data:', error); 
    });

// Make more Experiences 
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


let imageSrc = '../img/default.png'; // image url variable
document.getElementById('imageHolder').src = imageSrc;
const image = document.getElementById('image'); // image url input

// eventListener for changing the image holder for 
image.addEventListener('change', (e) => {
    imageSrc = e.target.value;
    document.getElementById('imageHolder').src = imageSrc || '../img/default.png';
})  


// RegExp for validation 
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

const unassignedContainer = document.getElementById('unassigned'); 

// function for Showing the staff
function DisplayStaff(unassingnedList) {

    unassignedContainer.innerHTML = '';
    unassingnedList.forEach(staff => {
        const stafItem = document.createElement('div');
        // stafItem.draggable = "true";
        const fullName = staff.name.split(' ');
        const lastName = fullName[fullName.length - 1];
        stafItem.classList.add('shadow-xl', 'rounded-lg', 'm-2', 'md:m-4', 'flex', 'justify-between', 'bg-white');
        stafItem.innerHTML = `
                                <div class="flex">
                                    <img src="${staff.imageSrc}" alt="staff image" class="rounded-full w-8 h-8 m-2 md:m-3 md:w-14 md:h-14 object-cover">
                                    <h3 class="font-bold text-[.8rem] md:text-[1rem] mt-1 md:mt-3 md:ml-4">${lastName} <br> <span class="text-[.6rem] md:text-[.8rem] text-gray-400">${staff.role}</span></h3>
                                </div>
                                <div class="flex">
                                    <button class="mr-2 text-yellowButton text-[.7rem] md:text-[1.2rem]  font-bold">Edit</button>
                                </div>
                            `;
        unassignedContainer.appendChild(stafItem);
    })
}


// Display the UnassingendStaff
DisplayStaff(unassingnedStaff); 


// Submit Form 
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

    const staff = {Id : Date.now(), name, role, imageSrc, email, phone, experiences};

    unassingnedStaff.push(staff);

    DisplayStaff(unassingnedStaff);
    // localStorage.setItem('unassingnedStaff', JSON.stringify(unassingnedStaff));
    imageSrc = '../img/default.png';
    document.getElementById('imageHolder').src = imageSrc;
    addWorkerForm.reset();
    
    closeModal();
});


const staffContainer = document.getElementById('staffContainer'); // Container for the Unassigned Staff after click on "+" button
const roomPopup = document.getElementById('roomPopup');
const AddButton = document.querySelectorAll('.AddButton');
const closeButton = document.querySelector('.closePopup');
const ConferenceContainer = document.getElementById('ConferenceContainer');
const openRoomPopup = () => roomPopup.classList.remove('hidden');
const closeRoomPopup = () => roomPopup.classList.add('hidden');


AddButton.forEach(btn => {
    btn.addEventListener('click', () => {
        openRoomPopup();
        const room = btn.getAttribute('data-room');
        
        let newList = [];
        if (room == 'Reception') { 
            const allowed = ['Réceptionnistes', 'Manager'];
            newList = unassingnedStaff.filter(staff => allowed.includes(staff.role)); 
        };
        if (room === 'Server') { 
            const allowed = ['Manager', 'Techniciens IT', 'Nettoyage'];
            newList = unassingnedStaff.filter(staff => allowed.includes(staff.role)); 
        };
        if (room === 'Security') { 
            const allowed = ['Manager', 'Agents de sécurité', 'Nettoyage'];
            newList = unassingnedStaff.filter(staff => allowed.includes(staff.role)); 
        };
        if (room === 'Archives') { 
            const allowed = ['Manager'];
            newList = unassingnedStaff.filter(staff => allowed.includes(staff.role)); 
        };
        
        if(room === 'Staff room' || room === 'Conference') newList = [...unassingnedStaff];
        
        

        staffContainer.innerHTML = '';

        newList.forEach(staff => {
            
            const staffItem = document.createElement('div');
            staffItem.classList.add('shadow-xl', 'rounded-lg', 'm-2', 'md:m-4', 'flex', 'justify-between', 'bg-white', 'cursor-pointer', 'card'); 
            staffItem.innerHTML = `
                                <div class="flex">
                                    <img src="${staff.imageSrc}" alt="staff image" class="rounded-full w-8 h-8 m-2 md:m-3 md:w-14 md:h-14 object-cover">
                                    <h3 class="font-bold text-[.8rem] md:text-[1rem] mt-1 md:mt-3 md:ml-4">${staff.name} <br> <span class="text-[.6rem] md:text-[.8rem] text-gray-400">${staff.role}</span></h3>
                                </div>
                                 `;
            staffContainer.appendChild(staffItem);
        })

        const cards = document.querySelectorAll('.card');
            
        cards.forEach((card, index) => {
                card.addEventListener('click', () => {
                const item = newList[index];
                const fullName = item.name.split(' ');
                const lastName = fullName[fullName.length - 1];
                console.log(lastName);
                const itemContainer = document.createElement("div");
                itemContainer.classList.add('rounded-lg', 'flex', 'justify-between', 'items-center', 'bg-white', 'md:p-0.5', 'w-fit', 'h-5', 'md:w-28', 'md:h-full');
                itemContainer.innerHTML = `
                                            <div class="flex items-center">
                                                    <div class="md:mr-1 p-0.5">
                                                    <img src="${item.imageSrc}" alt="staff image" class="rounded-full w-4 h-4 md:w-8 md:h-8 object-cover">
                                                    </div>
                                                    <div class="flex flex-col mr-1">
                                                    <h3 class="font-bold text-[.3rem] md:text-[.6rem]">${lastName}</h3>
                                                        <p class="text-gray-400 text-[.3rem] md:text-[.5rem]">${item.role}</p>
                                                    </div>
                                                </div>
                                                <button class="text-white text-[.4rem] bg-red-600 rounded-full md:text-[.7rem] font-bold px-0.5 md:px-1 mr-1 md:mr-0.5 md:ml-0.5">✕</button>
                                            `;
                ConferenceContainer.appendChild(itemContainer);
            })
        })

    });
});


closeButton.addEventListener('click', () => {
    closeRoomPopup();
})



