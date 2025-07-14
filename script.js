document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

function sendEmail(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const formMessage = document.getElementById('form-message');
  const form = document.getElementById('contact-form');

  if (!name || !email || !message) {
    formMessage.classList.remove('hidden', 'text-green-600');
    formMessage.classList.add('text-red-600');
    formMessage.textContent = 'Please fill out all fields.';
    setTimeout(() => {
      formMessage.classList.add('hidden');
      formMessage.classList.remove('text-red-600');
    }, 3000);
    return;
  }

  const templateParams = {
    from_name: name,
    from_email: email,
    message: message
  };

  emailjs.send("service_7215aqt", "template_5w8r5k7", templateParams)
    .then(response => {
      console.log('Email sent:', response.status, response.text);
      formMessage.classList.remove('hidden', 'text-red-600');
      formMessage.classList.add('text-green-600');
      formMessage.textContent = 'Message sent successfully! I will get back to you soon.';
      form.reset();
      setTimeout(() => formMessage.classList.add('hidden'), 3000);
    })
    .catch(error => {
      console.error('Email sending failed:', error);
      formMessage.classList.remove('hidden', 'text-green-600');
      formMessage.classList.add('text-red-600');
      formMessage.textContent = `Failed to send message: ${error.text || error.message || 'Unknown error.'}`;
      setTimeout(() => {
        formMessage.classList.add('hidden');
        formMessage.classList.remove('text-red-600');
      }, 5000);
    });
}

document.getElementById('contact-form').addEventListener('submit', sendEmail);
