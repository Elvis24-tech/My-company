emailjs.init("YOUR_PUBLIC_KEY"); 

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Contact form handling
document.getElementById('submit-btn').addEventListener('click', function () {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const formMessage = document.getElementById('form-message');

  if (name && email && message) {
    // Prepare email parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message
    };

   // send email 
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
      .then(function(response) {
        console.log('Email sent successfully:', response.status, response.text);
        formMessage.classList.remove('hidden', 'text-red-600');
        formMessage.classList.add('text-green-600');
        formMessage.textContent = 'Message sent successfully! I will get back to you soon.';
        document.getElementById('contact-form').reset();
        setTimeout(() => {
          formMessage.classList.add('hidden');
        }, 3000);
      }, function(error) {
        console.error('Failed to send email:', error);
        formMessage.classList.remove('hidden', 'text-green-600');
        formMessage.classList.add('text-red-600');
        formMessage.textContent = `Failed to send message: ${error.text || 'Unknown error. Please check your EmailJS setup.'}`;
        setTimeout(() => {
          formMessage.classList.add('hidden');
          formMessage.classList.remove('text-red-600');
          formMessage.textContent = 'Message sent successfully! I will get back to you soon.';
        }, 5000);
      });
  } else {
    formMessage.classList.remove('hidden', 'text-green-600');
    formMessage.classList.add('text-red-600');
    formMessage.textContent = 'Please fill out all fields.';
    setTimeout(() => {
      formMessage.classList.add('hidden');
      formMessage.classList.remove('text-red-600');
      formMessage.textContent = 'Message sent successfully! I will get back to you soon.';
    }, 3000);
  }
});