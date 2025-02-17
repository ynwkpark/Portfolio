document.addEventListener("DOMContentLoaded", function () {
    // Load GSAP and ScrollTrigger Libraries if not already included
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        const gsapScript = document.createElement("script");
        gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
        gsapScript.onload = () => {
            const scrollTriggerScript = document.createElement("script");
            scrollTriggerScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";
            scrollTriggerScript.onload = initAnimations;
            document.head.appendChild(scrollTriggerScript);
        };
        document.head.appendChild(gsapScript);
    } else {
        initAnimations();
    }

    function initAnimations() {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Smooth scrolling for navbar buttons
        document.querySelectorAll(".nav-button").forEach(button => {
            button.addEventListener("click", function () {
                const targetId = this.getAttribute("data-target");
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: { y: targetSection, offsetY: 80 }, // Adjust for navbar height
                        ease: "power2.inOut",
                    });
                }
            });
        });

        // Apple-like spring effect for section transitions
        gsap.utils.toArray(".section").forEach((section, index) => {
            gsap.fromTo(section,
                { opacity: 0, y: 100, scale: 0.95 }, // Start slightly scaled down and below
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "elastic.out(1.2, 0.5)", // Springy effect
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%", // Start animation when section is 80% in view
                        end: "bottom 20%", // End animation when section is 20% out of view
                        toggleActions: "play none none reverse", // Play animation on enter, reverse on leave
                    },
                }
            );
        });

        // Show project section based on button click
        function showProjectSection(sectionId) {
            const allSections = document.querySelectorAll(".projects-section");
            const selectedSection = document.getElementById(sectionId);

            // If section is already visible, do nothing
            if (selectedSection.style.display === "flex") return;

            // Hide all sections with a fade-out animation
            allSections.forEach(section => {
                if (section !== selectedSection) {
                    gsap.to(section, {
                        opacity: 0,
                        duration: 0.3,
                        ease: "power2.inOut",
                        onComplete: () => {
                            section.style.display = "none";
                        }
                    });
                }
            });

            // Show the selected section with a fade-in animation
            selectedSection.style.display = "flex"; // Ensure it appears before animation
            gsap.fromTo(selectedSection,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.inOut"
                }
            );

            // Update active button styling
            document.querySelectorAll(".project-btn").forEach(btn => btn.classList.remove("active"));
            document.querySelector(`button[data-target="${sectionId}"]`).classList.add("active");
        }

        // Set default active section to "professional-projects"
        document.querySelectorAll(".projects-section").forEach(section => {
            section.style.display = "none";
        });

        showProjectSection("professional-projects");

        // Assign click events to buttons
        document.querySelectorAll(".project-btn").forEach(button => {
            button.addEventListener("click", function () {
                const sectionId = this.getAttribute("data-target");
                showProjectSection(sectionId);
            });
        });

        // Apple-like smooth entrance effect for images
        gsap.utils.toArray(".project-box img").forEach(img => {
            gsap.fromTo(img,
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: img,
                        start: "top 80%", // Start animation when image is 80% in view
                        end: "bottom 20%", // End animation when image is 20% out of view
                        toggleActions: "play none none reverse", // Play animation on enter, reverse on leave
                    },
                }
            );
        });

        // Apple-like parallax effect for sections
        gsap.utils.toArray(".section").forEach(section => {
            gsap.fromTo(section,
                { opacity: 0.3, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%", // Start animation when section is 80% in view
                        end: "bottom 20%", // End animation when section is 20% out of view
                        toggleActions: "play none none reverse", // Play animation on enter, reverse on leave
                    },
                }
            );
        });
    }
});