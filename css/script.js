const scriptURL = 'https://script.google.com/macros/s/AKfycbyoW0xB2WLDtkJ3iSmDB416a9jHqQ-9SgJC0UeTE4zvjMYLlvDwVJBfH223C746_1dJcQ/exec';
const form = document.querySelector('#booking-form');

form.addEventListener('submit', e => {
  e.preventDefault();
  
  const submitBtn = form.querySelector('.confirm-button');
  submitBtn.innerText = "Booking...";

  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
       alert("Success! Your table at Marrocco's is requested.");
       submitBtn.innerText = "CONFIRM BOOKING";
       form.reset();
    })
    .catch(error => console.error('Error!', error.message));
});



function filterTimes() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    const datePicker = document.getElementById('res-date');
    const selectedDate = datePicker ? datePicker.value : "";

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todayFormatted = `${year}-${month}-${day}`;

    const slots = document.querySelectorAll('.time-option');
    const isToday = !selectedDate || selectedDate === todayFormatted;

    slots.forEach(slot => {
        const timeValue = slot.getAttribute('data-time');
        if (!timeValue) return;

        const [hour, minute] = timeValue.split(':').map(Number);
        const radioInput = slot.querySelector('input');

        slot.classList.remove('past');
        if (radioInput) radioInput.disabled = false;

        if (isToday) {
            if (hour < currentHour || (hour === currentHour && minute <= currentMinutes)) {
                slot.classList.add('past'); // Add the greyed-out class
                if (radioInput) radioInput.disabled = true; 
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECT ALL ELEMENTS
    const guestsInput = document.querySelector('select[name="guests"]');
    const dateInput = document.getElementById('res-date');
    const guestsDisp = document.getElementById('summary-guests');
    const dateDisp = document.getElementById('summary-date');
    const timeDisp = document.getElementById('summary-time');

    filterTimes();

    if (guestsInput && guestsDisp) {
        guestsInput.addEventListener('change', (e) => {
        const selectedText = e.target.options[e.target.selectedIndex].text;
        guestsDisp.innerText = `Table for ${selectedText}`;
        });
    }

    if (dateInput && dateDisp) {
        dateInput.addEventListener('change', (e) => {
            const dateObj = new Date(e.target.value);
            const options = { weekday: 'long', day: 'numeric', month: 'long' };
            dateDisp.innerText = dateObj.toLocaleDateString('en-GB', options);
            filterTimes(); 
        });
    }

    document.addEventListener('change', (e) => {
        if (e.target.name === 'time' && timeDisp) {
            timeDisp.innerText = `At ${e.target.value}`;
            timeDisp.style.color = '#1b261d';
            timeDisp.style.fontWeight = '700';
        }
    });

const bookingForm = document.getElementById('booking-form');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const btn = document.querySelector('.book-now-btn');
    btn.innerText = "Processing...";
    btn.style.opacity = "0.7";

    const formData = new FormData(bookingForm);

    fetch('YOUR_GOOGLE_SCRIPT_URL', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        alert('Grazie! Your table request has been sent.');
        bookingForm.reset(); 
        btn.innerText = "CONFIRM BOOKING";
        btn.style.opacity = "1";
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
        btn.innerText = "CONFIRM BOOKING";
    });
});
});

function filterTimes() {
    const slots = document.querySelectorAll('.time-option');
    console.log("Times filtered");
}
