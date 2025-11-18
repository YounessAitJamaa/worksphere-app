const addNewWorker = document.getElementById('addNewWorker'); // add new worker button
const modal = document.getElementById('modale'); // the modal
const closeModalbutton = document.querySelectorAll('.closeModal'); // the close buttons
const addWorkerForm = document.getElementById('addWorkerForm'); // the form

// function for closing and opening modal
const openModal = () => modal.classList.remove('hidden');
const closeModal = () => modal.classList.add('hidden');

// open modal after click on the button add new worker
addNewWorker.addEventListener('click', openModal);


closeModalbutton.forEach(btn => {
    btn.addEventListener('click', closeModal);
});





