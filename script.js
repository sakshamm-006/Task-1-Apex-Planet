// Wait for the DOM to be fully loaded before running JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Alert button functionality
  const alertButton = document.getElementById("alert-button")
  alertButton.addEventListener("click", () => {
    alert("Hello! This is a JavaScript alert message.")
  })

  // Change background color functionality
  const changeColorButton = document.getElementById("change-color-button")
  const contentSections = document.querySelectorAll(".content-section")

  // Array of background colors to cycle through
  const colors = ["#f8f9fa", "#e9ecef", "#dee2e6", "#ced4da", "#adb5bd"]
  let colorIndex = 0

  changeColorButton.addEventListener("click", () => {
    // Cycle through colors
    colorIndex = (colorIndex + 1) % colors.length

    // Apply the new background color to all content sections
    contentSections.forEach((section) => {
      section.style.backgroundColor = colors[colorIndex]
    })
  })

  // Counter functionality
  const counterElement = document.getElementById("counter")
  const incrementButton = document.getElementById("increment-button")
  let count = 0

  incrementButton.addEventListener("click", () => {
    // Increment the counter
    count++

    // Update the counter display
    counterElement.textContent = count

    // Add some visual feedback
    counterElement.style.color = "#4a6fa5"
    setTimeout(() => {
      counterElement.style.color = ""
    }, 200)
  })

  // Mobile Navigation Toggle
  const mobileMenu = document.getElementById("mobile-menu")
  const navMenu = document.getElementById("nav-menu")

  mobileMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Navbar scroll effect
  const navbar = document.getElementById("navbar")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Active navigation link highlighting
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  window.addEventListener("scroll", () => {
    let current = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // Animated counters for statistics
  const animateCounters = () => {
    const counters = document.querySelectorAll(".stat-number")

    counters.forEach((counter) => {
      const target = Number.parseInt(counter.getAttribute("data-target"))
      const increment = target / 100
      let current = 0

      const updateCounter = () => {
        if (current < target) {
          current += increment
          counter.textContent = Math.ceil(current)
          setTimeout(updateCounter, 20)
        } else {
          counter.textContent = target
        }
      }

      updateCounter()
    })
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Animate skill bars
        if (entry.target.classList.contains("skills")) {
          const skillBars = entry.target.querySelectorAll(".skill-progress")
          skillBars.forEach((bar) => {
            const width = bar.getAttribute("data-width")
            setTimeout(() => {
              bar.style.width = width
            }, 200)
          })
        }

        // Animate counters
        if (entry.target.classList.contains("about")) {
          animateCounters()
        }

        // Add fade-in animation to project cards
        if (entry.target.classList.contains("projects")) {
          const projectCards = entry.target.querySelectorAll(".project-card")
          projectCards.forEach((card, index) => {
            setTimeout(() => {
              card.style.opacity = "1"
              card.style.transform = "translateY(0)"
            }, index * 200)
          })
        }
      }
    })
  }, observerOptions)

  // Observe sections for animations
  sections.forEach((section) => {
    observer.observe(section)
  })

  // Initialize project cards for animation
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  })

  // Contact form handling
  const contactForm = document.getElementById("contact-form")
  const formStatus = document.getElementById("form-status")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const name = formData.get("name").trim()
    const email = formData.get("email").trim()
    const message = formData.get("message").trim()

    // Clear previous errors
    clearErrors()

    // Validate form
    let isValid = true

    if (name === "") {
      showError("name-error", "Name is required")
      isValid = false
    }

    if (email === "") {
      showError("email-error", "Email is required")
      isValid = false
    } else if (!isValidEmail(email)) {
      showError("email-error", "Please enter a valid email")
      isValid = false
    }

    if (message === "") {
      showError("message-error", "Message is required")
      isValid = false
    }

    if (isValid) {
      // Simulate form submission
      showFormStatus("success", "Thank you! Your message has been sent successfully.")
      contactForm.reset()

      // In a real application, you would send the data to a server here
      console.log("Form submitted:", { name, email, message })
    }
  })

  // Helper functions for form validation
  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId)
    errorElement.textContent = message
  }

  function clearErrors() {
    const errorElements = document.querySelectorAll(".error-message")
    errorElements.forEach((element) => {
      element.textContent = ""
    })
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function showFormStatus(type, message) {
    formStatus.className = `form-status ${type}`
    formStatus.textContent = message
    formStatus.style.display = "block"

    // Hide status after 5 seconds
    setTimeout(() => {
      formStatus.style.display = "none"
    }, 5000)
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault()
      const target = document.querySelector(anchor.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add typing effect to hero title
  const heroTitle = document.querySelector(".hero-title")
  const titleText = heroTitle.innerHTML
  heroTitle.innerHTML = ""

  let i = 0
  const typeWriter = () => {
    if (i < titleText.length) {
      heroTitle.innerHTML += titleText.charAt(i)
      i++
      setTimeout(typeWriter, 100)
    }
  }

  // Start typing effect after a short delay
  setTimeout(typeWriter, 1000)
})
