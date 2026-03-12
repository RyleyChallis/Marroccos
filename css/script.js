document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const navLinksItems = document.querySelectorAll('.nav-links li a');

    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    const closeBtn = document.querySelector('.close-btn');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    
        const allForms = document.querySelectorAll('form');

    allForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';

            const formData = new FormData(form);
            const scriptURL = form.getAttribute('action');

            if (!scriptURL) {
                console.error("Form is missing an action attribute!");
                btn.innerText = originalText;
                return;
            }

            fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                if (response.ok) {
                    alert('Thank you! Your reservation has been sent.');
                    form.reset();
                } else {
                    alert('Server error. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert('Could not connect to the server. Please check your internet.');
            })
            .finally(() => {
                btn.innerText = originalText;
            });
        });
    });
}

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    });
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((element) => observer.observe(element));

    const dateInput = document.getElementById('res-date');
    const timeDisp = document.getElementById('summary-time');

    if (dateInput) {
    }

    document.addEventListener('change', (e) => {
        if (e.target.name === 'time' && timeDisp) {
            timeDisp.innerText = `At ${e.target.value}`;
            timeDisp.style.color = '#1b261d';
            timeDisp.style.fontWeight = '700';
        }
    });

});

const faqSummaries = document.querySelectorAll('#faqs .faq-item summary');

faqSummaries.forEach(summary => {
    summary.addEventListener('click', () => {
        const clickedDetails = summary.parentElement;

        document.querySelectorAll('#faqs .faq-item').forEach(item => {
            if (item !== clickedDetails) {
                item.removeAttribute('open');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    
    function updateTimeSlots() {
        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
        const currentTimeInMinutes = (currentHours * 60) + currentMinutes;

        const slots = document.querySelectorAll('.time-option');

        slots.forEach(slot => {
            const timeVal = slot.getAttribute('data-time'); 
            if (!timeVal) return; 

            const [h, m] = timeVal.split(':').map(Number);
            const slotTimeInMinutes = (h * 60) + m;

            if (currentTimeInMinutes >= slotTimeInMinutes) {
                slot.classList.add('past-time');
                const radio = slot.querySelector('input[type="radio"]');
                if (radio) radio.disabled = true;
            } else {
                slot.classList.remove('past-time');
                const radio = slot.querySelector('input[type="radio"]');
                if (radio) radio.disabled = false;
            }
        });
    }

    updateTimeSlots();
    setInterval(updateTimeSlots, 60000);
});

document.addEventListener('DOMContentLoaded', () => {
    const guestSelect = document.querySelector('select[name="guests"]');
    const dateInput = document.getElementById('res-date');
    const timeRadios = document.querySelectorAll('input[name="time"]');
    
    const summaryGuests = document.getElementById('summary-guests');
    const summaryDate = document.getElementById('summary-date');
    const summaryTime = document.getElementById('summary-time');

    const today = new Date().toISOString().split('T')[0];
    if (dateInput) {
        dateInput.setAttribute('min', today);

        dateInput.addEventListener('change', () => {
            const date = new Date(dateInput.value);
            const formatted = date.toLocaleDateString('en-GB', { 
                weekday: 'long', day: 'numeric', month: 'long' 
            });
            summaryDate.innerText = formatted;
        });
    }

    if (guestSelect) {
        guestSelect.addEventListener('change', () => {
            summaryGuests.innerText = `Table for ${guestSelect.value}`;
        });
    }

    timeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            summaryTime.innerText = `At ${radio.value}`;
        });
    });
});