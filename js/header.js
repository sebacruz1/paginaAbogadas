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

    // Hamburger Menu
    if (menuToggle && opciones) {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent event bubbling
            opciones.classList.toggle('show'); // Toggle visibility
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!opciones.contains(e.target) && !menuToggle.contains(e.target)) {
                opciones.classList.remove('show');
            }
        });
    }

    if (dropdownToggle && dropdown) {
        const toggleDropdown = (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        };

        const closeDropdown = () => dropdown.classList.remove('show');

        const adjustDropdownBehavior = () => {
            const isMobile = window.matchMedia('(max-width: 768px)').matches;

            if (isMobile) {
                dropdownToggle.addEventListener('click', toggleDropdown);
                dropdownToggle.removeEventListener('mouseover', showDropdown);
                dropdown.removeEventListener('mouseleave', closeDropdown);
            } else {
                dropdownToggle.addEventListener('mouseover', showDropdown);
                dropdown.addEventListener('mouseleave', closeDropdown);
                dropdownToggle.removeEventListener('click', toggleDropdown);
            }
        };

        const showDropdown = () => dropdown.classList.add('show');

        adjustDropdownBehavior();

        // Adjust behavior on window resize
        window.addEventListener('resize', adjustDropdownBehavior);

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && !dropdownToggle.contains(e.target)) {
                closeDropdown();
            }
        });
    }
}
