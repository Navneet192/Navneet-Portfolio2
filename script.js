import projectsData from "./data/projects.js";
import skillsData from "./data/skills.js";
import socialData from "./data/social.js";

// Dark mode toggle
document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.body;

  // Check for saved theme preference
  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
  }

  // Toggle dark mode
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Save preference
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", null);
    }
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Mobile menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Projects section
function createProjectCard(project) {
  return `
        <div class="project-card">
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
                </div>
                <div class="project-links">
                    <a href="${
                      project.links.github
                    }" class="project-link" target="_blank">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    <a href="${
                      project.links.demo
                    }" class="project-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Contact Form
(function () {
  emailjs.init("xv3EGtvY9fCmyYCjE");
})();
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    emailjs
      .sendForm("service_hncy6ka", "template_ypjx7ga", "#contact-form")
      .then(
        function (response) {
          alert("Message sent successfully!");
          document.getElementById("contact-form").reset();
        },
        function (error) {
          alert("Failed to send message, please try again later.");
        }
      );
  });

// Resume download handler
document
  .getElementById("downloadResume")
  .addEventListener("click", function () {
    const link = document.createElement("a");
    link.href = "assets/Resume.pdf";
    link.download = "Navneet_Yadav_Resume.pdf";
    link.click();
  });
// Skills section
function createSkillItem(skill) {
  return `
        <div class="skill-item">
            <div class="skill-info">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-percentage">${skill.percentage}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress" style="width: ${skill.percentage}%"></div>
            </div>
        </div>
    `;
}

function createCategorySection(category, skills) {
  return `
        <div class="skills-category">
            <h3 class="category-title">${category.toUpperCase()}</h3>
            <div class="category-skills">
                ${skills.map((skill) => createSkillItem(skill)).join("")}
            </div>
        </div>
    `;
}

function renderSkills() {
  const skillsContainer = document.getElementById("skillsContainer");
  skillsContainer.innerHTML = Object.entries(skillsData)
    .map(([category, skills]) => createCategorySection(category, skills))
    .join("");
}

// About section
import aboutData from "./data/about.js";

function renderAbout() {
  // Update title
  document.getElementById("aboutTitle").textContent = aboutData.title;

  // Update description
  document.getElementById("aboutDescription").textContent =
    aboutData.description;

  // Update image
  const aboutImage = document.getElementById("aboutImage");
  aboutImage.src = aboutData.image.src;
  aboutImage.alt = aboutData.image.alt;
}

// Projects Section
function renderProjects() {
  const projectContainer = document.getElementById("projectContainer");
  projectContainer.innerHTML = projectsData
    .map((project) => createProjectCard(project))
    .join("");
}

// Add this function before the initialization
function createSocialLinks() {
  const socialContainer = document.querySelector(".social-links");
  socialContainer.innerHTML = socialData
    .map(
      (social) => `
        <a href="${social.url}" 
           class="social-link" 
           target="_blank"
           rel="noopener noreferrer"
           style="color: ${social.color}">
            <i class="${social.icon}"></i>
        </a>
    `
    )
    .join("");
}

// Initialize everything
document.addEventListener("DOMContentLoaded", function () {
  renderSkills();
  renderProjects();
  createSocialLinks();
});

// Add this to your existing script.js
document.getElementById("logoHome").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
