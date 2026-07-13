const projects = [
  {
    title: "Portfolio Project (This Website)",
    description: "A responsive personal portfolio built from scratch using HTML, CSS, and vanilla JavaScript. Features a dynamic theme switcher and is populated by a Java Script data structure",
    imageUrl: "./images/portfolio-projectpreview.jpg",
    liveUrl: "https://your-live-site.com",
    codeUrl: "https://github.com/your-username/you-repo-name"
  },

  {
    title: "E-commerce Website Concept",
    description: "A concept design and front-end implementation for an e-commerce platform. Focused on a clean UI, responsive product grids, and a streamlined checkout process using modern CSS techniques.",
    imageUrl: "./images/ecommerce-project-preview.jpg", // Make sure to add this image to your 'images' folder!
    liveUrl: "#", // Use "#" if there's no live link yet
    codeUrl: "https://github.com/your-username/ecommerce-repo" // Replace with your repo link
  },

  {

    title: "Task Management App",
    description: "A client-side task management application built with vanilla JavaScript. Allows users to add, edit, delete, and mark tasks as complete, with all data saved to localStorage.",
    imageUrl: "./images/task-app-preview.jpg", // Add this image to your 'images' folder
    liveUrl: "#",
    codeUrl: "https://github.com/your-username/task-app-repo" // Replace with your repo link
  }
];

// select the theme toggle checkbox 
const themeToggle = document.querySelector('#theme-toggle');

// console.log(themeToggle);

const htmlElement = document.documentElement;

// This gives us a direct "handle" to this specific div in the DOM 
const projectContainer = documnent.querySelector('.projects-container')

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
    allProjectsHTML += projectsHTML
    // console.log(projectCardHTML);

  });
  projectsContainer.innerHTML = allProjectsHTML;
};
renderProjects()


htmlElement.removeAttribute('data-theme')
themeToggle.checked = false;
localStorage.setItem('theme', 'light');

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







