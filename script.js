const projects = [
  {
    title: "Portfolio Project (This Website)",
    description: "A responsive personal portfolio built from scratch using HTML, CSS, and vanilla JavaScript. Features a dynamic theme switcher and is populated by a Java Script data structure",
    imageUrl: "./image/personal-portfolio.jpg",
    liveUrl: "https://sunny-personal-portfoli.netlify.app/",
    codeUrl: "https://github.com/ancersunny-spec/sunny-portfolio-website.git"
  },

  {
    title: "E-commerce Website Concept",
    description: "A concept design and front-end implementation for an e-commerce platform. Focused on a clean UI, responsive product grids, and a streamlined checkout process using modern CSS techniques.",
    imageUrl: "./image/project_placeholder.jpg", // Make sure to add this image to your 'images' folder!
    liveUrl: "#", // Use "#" if there's no live link yet
    codeUrl: "https://github.com/your-username/ecommerce-repo" // Replace with your repo link
  },

  {

    title: "Aurum - New Year Countdown",
    description: "Aurum New Year Countdown is a modern and interactive web experience that counts down to the New Year, with a focus on elegant design, smooth animations, and engaging features for setting goals and New Year resolutions.",
    imageUrl: "./image/aurum-preview.jpg", // Add this image to your 'images' folder
    liveUrl: "#",
    codeUrl: "https://github.com/ancersunny-spec/next-year-countdown.git" // Replace with your repo link
  }
];

// select the theme toggle checkbox 
const themeToggle = document.querySelector('#theme-toggle');

// console.log(themeToggle);

const htmlElement = document.documentElement;

// This gives us a direct "handle" to this specific div in the DOM 
const projectContainer = document.querySelector('.projects-container')

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

const renderProjects = () => {
  let allProjectsHTML = '';

  projects.forEach(project => {

    // console.log(project);
    const projectCardHTML = `
          
      <div class="project-card">
        <div class="project-image-container">
            <img 
              src="${project.imageUrl}" 
              alt="Screenshot of the ${project.title} project" 
              class="project-image"
            >
        </div>
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-links">
            <a 
              href="${project.liveUrl}" 
              class="btn" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
            <a 
              href="${project.codeUrl}" 
              class="btn btn-secondary" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View Code
            </a>
          </div>
        </div>
      </div>
    `;
    allProjectsHTML += projectCardHTML
    // console.log(projectCardHTML);

  });
  projectContainer.innerHTML = allProjectsHTML;
};
renderProjects()


htmlElement.removeAttribute('data-theme')
themeToggle.checked = false;
localStorage.setItem('theme', 'light');


// Theme switcher toggle logic is here
themeToggle.addEventListener('click', () => {
  // console.log('Theme toggle switch was clicked!');
  const newTheme = themeToggle.checked ? 'dark' : 'light';
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

});


(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
      themeToggle.checked = true;
    }
  }
})();

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('header nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('nav-open');
  console.log('Nav class after toggle:', nav.className);
});

document.addEventListener('DOMContentLoaded', () => {
  // When the DOM is ready, we call our function to render the projects.
  renderProjects();



  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      // 1. Prevent the default form submission behavior (the page redirect).
      event.preventDefault();

      // 2. Collect the form data using the FormData API.
      // This is a modern way to get all form fields.
      const formData = new FormData(contactForm);
      const submitButton = contactForm.querySelector('button[type="submit"]');

      // Provide immediate user feedback: show a "sending" state.
      formStatus.innerHTML = 'Sending...';
      formStatus.className = 'info'; // You could add an .info style for this
      formStatus.style.display = 'block';
      submitButton.disabled = true;

      // 3. Use the fetch API to send the data.
      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        // We tell Formspree we want to receive a JSON response.
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        // 4. Handle the response from the server.
        if (response.ok) {
          // Success! Show the success message.
          formStatus.innerHTML = "Thank you! Your message has been sent.";
          formStatus.className = 'success';
          // Clear the form fields after a successful submission.
          contactForm.reset();
        } else {
          // The server responded with an error. Try to parse the error message.
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              // This is a validation error from Formspree.
              formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
            } else {
              // This is a generic server error.
              formStatus.innerHTML = "Oops! Something went wrong. Please try again later.";
            }
            formStatus.className = 'error';
          })
        }
      }).catch(error => {
        // 5. Handle network errors (e.g., user is offline).
        formStatus.innerHTML = "Oops! A network error occurred. Please check your connection and try again.";
        formStatus.className = 'error';
      }).finally(() => {
        // Re-enable the submit button regardless of success or failure.
        submitButton.disabled = false;
      });
    });
  }
});










