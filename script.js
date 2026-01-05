const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

form.addEventListener("submit", function(e) {
    e.preventDefault(); // ⛔ default redirect stop

    statusText.textContent = "Sending message...";
    statusText.style.color = "#4b5563";

    const formData = new FormData(form);

    fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json" // ⭐ VERY IMPORTANT
            }
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                statusText.textContent = "✅ Message sent successfully! We will contact you soon.";
                statusText.style.color = "#4f80ff";
                form.reset();
            } else {
                statusText.textContent = "❌ Something went wrong. Please try again.";
                statusText.style.color = "#ff6b6b";
            }
        })
        .catch(() => {
            statusText.textContent = "❌ Network error. Please try later.";
            statusText.style.color = "#ff6b6b";
        });
});

// ===========================================================================

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});
