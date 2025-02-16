document.addEventListener("DOMContentLoaded", function () {
    // Load GSAP Library if not already included
    if (typeof gsap === "undefined") {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
        script.onload = initAnimations;
        document.head.appendChild(script);
    } else {
        initAnimations();
    }

    function initAnimations() {
        // Smooth scrolling for navbar buttons
        document.querySelectorAll(".nav-button").forEach(button => {
            button.addEventListener("click", function () {
                const targetId = this.getAttribute("data-target");
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // Adjust for navbar height
                        behavior: "smooth"
                    });
                }
            });
        });

        // Scroll Reveal Effect with a Spring Bounce
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.fromTo(entry.target, 
                        { opacity: 0, y: 100, scale: 0.9 }, 
                        { opacity: 1, y: 0, scale: 1, ease: "elastic.out(1, 0.5)", duration: 1.2 }
                    );
                }
            });
        }, { threshold: 0.3 });

        // Observe all sections for animation
        document.querySelectorAll(".section").forEach(section => {
            observer.observe(section);
        });

        // Show project section based on button click
        function showProjectSection(sectionId) {
            const allSections = document.querySelectorAll(".projects-section");
            const selectedSection = document.getElementById(sectionId);

            // If section is already visible, do nothing
            if (selectedSection.style.display === "flex") return;

            // Hide all sections smoothly
            allSections.forEach(section => {
                if (section !== selectedSection) {
                    gsap.to(section, { opacity: 0, duration: 0.3, onComplete: () => {
                        section.style.display = "none"; 
                    }});
                }
            });

            // Show the selected section smoothly
            selectedSection.style.display = "flex"; // Ensure it appears before animation
            gsap.fromTo(selectedSection, { opacity: 0 }, { opacity: 1, duration: 0.5 });

            // Update active button styling
            document.querySelectorAll(".project-btn").forEach(btn => btn.classList.remove("active"));
            document.querySelector(`button[onclick="showProjectSection('${sectionId}')"]`).classList.add("active");
        }

        // Set default active section to "professional-projects"
        document.querySelectorAll(".projects-section").forEach(section => {
            section.style.display = "none";
        });

        showProjectSection("professional-projects");

        // Assign click events to buttons
        document.querySelectorAll(".project-btn").forEach(button => {
            button.addEventListener("click", function () {
                const sectionId = this.getAttribute("onclick").match(/'([^']+)'/)[1]; // Extract section ID
                showProjectSection(sectionId);
            });
        });
    }
});
