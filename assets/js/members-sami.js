      // Loading Screen
      window.addEventListener("load", function () {
        const loadingScreen = document.getElementById("loadingScreen");
        setTimeout(() => {
          loadingScreen.classList.add("hidden");
        }, 2000); // Show loading screen for 2 seconds
      });

      // Scroll Progress Indicator
      function updateScrollProgress() {
        const scrollProgress = document.getElementById("scrollProgress");
        const totalHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const currentProgress = window.pageYOffset;
        const progressPercentage = (currentProgress / totalHeight) * 100;
        scrollProgress.style.width = progressPercentage + "%";
      }

      window.addEventListener("scroll", updateScrollProgress);

      // Dark Mode Toggle
      const themeToggle = document.getElementById("themeToggle");
      const themeToggleMobile = document.getElementById("themeToggleMobile");
      const html = document.documentElement;

      // Check for saved theme preference or default to light mode
      const savedTheme = localStorage.getItem("theme") || "light";
      html.setAttribute("data-theme", savedTheme);

      // Update toggle state based on current theme
      function updateToggleState() {
        const currentTheme = html.getAttribute("data-theme");
        if (themeToggle) {
          themeToggle.setAttribute("aria-pressed", currentTheme === "dark");
        }
        if (themeToggleMobile) {
          themeToggleMobile.setAttribute(
            "aria-pressed",
            currentTheme === "dark"
          );
        }
      }

      updateToggleState();

      // Theme toggle function
      function toggleTheme() {
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateToggleState();
      }

      // Add event listeners to both toggle buttons
      if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
      }
      if (themeToggleMobile) {
        themeToggleMobile.addEventListener("click", toggleTheme);
      }

      // Intersection Observer for Section Animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      }, observerOptions);

      // Observe all sections with animation class
      document.querySelectorAll(".section-animate").forEach((section) => {
        observer.observe(section);
      });

      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });

      // Mobile Menu Toggle
      const mobileMenuButton = document.getElementById("mobileMenuButton");
      const mobileMenu = document.getElementById("mobileMenu");

      if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener("click", () => {
          const isOpen = !mobileMenu.classList.contains("hidden");

          if (isOpen) {
            // Close mobile menu
            mobileMenu.classList.add("hidden");
          } else {
            // Open mobile menu
            mobileMenu.classList.remove("hidden");
          }

          // Update ARIA attributes for accessibility
          mobileMenuButton.setAttribute("aria-expanded", !isOpen);
        });

        // Close mobile menu when clicking outside
        document.addEventListener("click", (e) => {
          if (
            !mobileMenuButton.contains(e.target) &&
            !mobileMenu.contains(e.target) &&
            !mobileMenu.classList.contains("hidden")
          ) {
            mobileMenu.classList.add("hidden");
            mobileMenuButton.setAttribute("aria-expanded", "false");
          }
        });

        // Close mobile menu when clicking on a link
        mobileMenu.addEventListener("click", (e) => {
          if (e.target.tagName === "A") {
            mobileMenu.classList.add("hidden");
            mobileMenuButton.setAttribute("aria-expanded", "false");
          }
        });
      }

      // Skill Card Staggered Animation
      function animateSkillCards() {
        const skillCards = document.querySelectorAll(".skill-card");
        skillCards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, index * 100);
        });
      }

      // Project Card Staggered Animation
      function animateProjectCards() {
        const projectCards = document.querySelectorAll(".project-card");
        projectCards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, index * 150);
        });
      }

      // Trigger animations when sections come into view
      const skillsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target.id === "skills") {
              animateSkillCards();
              skillsObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      const projectsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target.id === "projects") {
              animateProjectCards();
              projectsObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      // Initialize card animations
      const skillsSection = document.getElementById("skills");
      const projectsSection = document.getElementById("projects");

      if (skillsSection) {
        // Initially hide skill cards
        document.querySelectorAll(".skill-card").forEach((card) => {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        });
        skillsObserver.observe(skillsSection);
      }

      if (projectsSection) {
        // Initially hide project cards
        document.querySelectorAll(".project-card").forEach((card) => {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        });
        projectsObserver.observe(projectsSection);
      }

      // Performance optimization: Remove will-change after animations
      document.addEventListener("transitionend", (e) => {
        if (
          e.target.classList.contains("skill-card") ||
          e.target.classList.contains("project-card")
        ) {
          e.target.style.willChange = "auto";
        }
      });
