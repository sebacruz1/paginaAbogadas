const mapContainer = document.getElementById('mapContainer');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Create and append the iframe when the map comes into view
            const iframe = document.createElement('iframe');
            iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.532586646714!2d-71.55371122447266!3d-33.01609647539951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689dde70710cce5%3A0x3e4b1a37c4d5f6f6!2sEglus!5e0!3m2!1sen!2scl!4v1737436617508!5m2!1sen!2scl";
            iframe.width = "600";
            iframe.height = "450";
            iframe.style.border = "0";
            iframe.allowFullscreen = "";
            iframe.referrerpolicy = "no-referrer-when-downgrade";
            mapContainer.appendChild(iframe);

            observer.unobserve(mapContainer);
        }
    });
}, { threshold: 0.5 }); // Load when 50% of the map container is in view

observer.observe(mapContainer);
