document.addEventListener('DOMContentLoaded', function () {
    // Load the header dynamically
    fetch('../html/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error loading header: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Insert header into the DOM
            document.body.insertAdjacentHTML('afterbegin', data);

            // Initialize functionality after the header is loaded
            initHeader();
        })
        .catch(error => console.error('Error:', error));
});

function initHeader() {
    const menuToggle = document.querySelector('.menu-toggle');
    const opciones = document.querySelector('.opciones');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');

    if (menuToggle && opciones) {
        // Toggle mobile menu visibility
        menuToggle.addEventListener('click', function () {
            opciones.classList.toggle('show');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!opciones.contains(e.target) && !menuToggle.contains(e.target)) {
                opciones.classList.remove('show');
            }
        });
    }

    if (dropdownToggle && dropdown) {
        // Toggle dropdown menu visibility on mouseover
        dropdownToggle.addEventListener('mouseover', function (e) {
            e.stopPropagation();
            dropdown.classList.add('show');
        });

        // Keep dropdown open when interacting with its contents
        dropdown.addEventListener('mouseover', function () {
            dropdown.classList.add('show');
        });

        // Close dropdown menu when mouse leaves both the toggle button and dropdown
        dropdownToggle.addEventListener('mouseleave', function () {
            setTimeout(() => {
                if (!dropdown.matches(':hover') && !dropdownToggle.matches(':hover')) {
                    dropdown.classList.remove('show');
                }
            }, 200);
        });

        dropdown.addEventListener('mouseleave', function () {
            setTimeout(() => {
                if (!dropdown.matches(':hover') && !dropdownToggle.matches(':hover')) {
                    dropdown.classList.remove('show');
                }
            }, 200);
        });
    }
}
