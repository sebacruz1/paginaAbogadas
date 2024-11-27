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
        .catch(error => console.error('Error loading header:', error));

    // Load the footer dynamically
    fetch('../html/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error loading footer: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Insert footer into the DOM
            document.body.insertAdjacentHTML('beforeend', data);

            // Add dynamic year to footer
            updateFooterYear();
        })
        .catch(error => console.error('Error loading footer:', error));
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

    // Dropdown Menu
    if (dropdownToggle && dropdown) {
        const toggleDropdown = (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        };

        const closeDropdown = () => dropdown.classList.remove('show');

        const adjustDropdownBehavior = () => {
            const isMobile = window.matchMedia('(max-width: 768px)').matches;

            if (isMobile) {
                // Mobile: Click to toggle
                dropdownToggle.removeEventListener('mouseover', showDropdown);
                dropdown.removeEventListener('mouseleave', closeDropdown);
                dropdownToggle.addEventListener('click', toggleDropdown);
            } else {
                // Desktop: Hover to toggle
                dropdownToggle.addEventListener('mouseover', showDropdown);
                dropdown.addEventListener('mouseleave', closeDropdown);
                dropdownToggle.removeEventListener('click', toggleDropdown);
            }
        };

        const showDropdown = () => dropdown.classList.add('show');

        // Initialize dropdown behavior based on screen size
        adjustDropdownBehavior();

        // Adjust dropdown behavior on window resize
        window.addEventListener('resize', adjustDropdownBehavior);

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && !dropdownToggle.contains(e.target)) {
                closeDropdown();
            }
        });
    }
}

function updateFooterYear() {
    // Locate the span where the year will be displayed
    const yearSpan = document.querySelector('.year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
