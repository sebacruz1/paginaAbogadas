document.addEventListener('DOMContentLoaded', function () {
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
        // Start with the menu hidden
        if (opciones.classList.contains('show')) {
            opciones.classList.remove('show');
        } else {
            // opciones.classList.add('show');
            opciones.style.top = `${menuToggle.getBoundingClientRect().bottom}px`;
        }


        // Toggle mobile menu visibility
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent clicks from propagating
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
        const handleDropdownToggle = () => {
            const isMobile = window.matchMedia('(max-width: 768px)').matches;

            if (isMobile) {
                // Mobile behavior: Click to toggle
                dropdownToggle.removeEventListener('click', toggleDropdown);
                dropdownToggle.addEventListener('click', toggleDropdown);
            } else {
                dropdownToggle.removeEventListener('mouseover', showDropdown);
                dropdownToggle.removeEventListener('mouseleave', hideDropdown);
                dropdown.removeEventListener('mouseleave', hideDropdown);

                dropdownToggle.addEventListener('mouseover', showDropdown);
                dropdownToggle.addEventListener('mouseleave', function () {
                    setTimeout(() => {
                        if (!dropdown.matches(':hover') && !dropdownToggle.matches(':hover')) {
                            hideDropdown();
                        }
                    }, 200);
                });

                dropdown.addEventListener('mouseover', showDropdown);
                dropdown.addEventListener('mouseleave', function () {
                    setTimeout(() => {
                        if (!dropdown.matches(':hover') && !dropdownToggle.matches(':hover')) {
                            hideDropdown();
                        }
                    }, 200);
                });
            }



        };

        const toggleDropdown = (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        };

        const showDropdown = () => dropdown.classList.add('show');
        const hideDropdown = () => dropdown.classList.remove('show');

        handleDropdownToggle();

        // Adjust behavior on window resize
        window.addEventListener('resize', handleDropdownToggle);

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && !dropdownToggle.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    }
}

