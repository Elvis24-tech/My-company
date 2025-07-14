document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded, attaching event listeners');

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
    console.log('Form submitted');

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('form-message');
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formMessage.classList.remove('hidden', 'text-green-600');
      formMessage.classList.add('text-red-600');
      formMessage.textContent = 'Please enter a valid email address.';
      setTimeout(() => {
        formMessage.classList.add('hidden');
        formMessage.classList.remove('text-red-600');
      }, 3000);
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    formMessage.classList.add('hidden'); 

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message
    };

    console.log('Template Params:', templateParams);

    emailjs.send("service_7215aqt", "template_5w8r5k7", templateParams)
      .then(response => {
        console.log('EmailJS response:', response);
        console.log('Email sent successfully:', response.status, response.text);
        formMessage.classList.remove('hidden', 'text-red-600');
        formMessage.classList.add('text-green-600');
        formMessage.textContent = 'Message sent successfully! We will get back to you soon.';
        form.reset();
        setTimeout(() => {
          formMessage.classList.add('hidden');
          formMessage.classList.remove('text-green-600');
        }, 3000);
      })
      .catch(error => {
        console.error('Email sending failed:', error);
        formMessage.classList.remove('hidden', 'text-green-600');
        formMessage.classList.add('text-red-600');
        formMessage.textContent = `Failed to send message: ${error.text || error.message || 'Please check your EmailJS configuration (service ID, template ID, or Allowed Origins)'}`;
        setTimeout(() => {
          formMessage.classList.add('hidden');
          formMessage.classList.remove('text-red-600');
        }, 5000);
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      });
  }

  const form = document.getElementById('contact-form');
  if (form) {
    console.log('Contact form found, attaching submit event');
    form.addEventListener('submit', sendEmail);
  } else {
    console.error('Contact form not found in DOM');
  }
});