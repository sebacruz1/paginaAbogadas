document.addEventListener('DOMContentLoaded', function () {
    // Fetch header and footer simultaneously
    const headerFetch = fetch('../html/header.html').then(response => {
        if (!response.ok) throw new Error(`Error loading header: ${response.status}`);
        return response.text();
    });

    const footerFetch = fetch('../html/footer.html').then(response => {
        if (!response.ok) throw new Error(`Error loading footer: ${response.status}`);
        return response.text();
    });

    // Use Promise.all to wait for both fetches to complete
    Promise.all([headerFetch, footerFetch])
        .then(([headerData, footerData]) => {
            // Insert header at the beginning of the body
            document.body.insertAdjacentHTML('afterbegin', headerData);
            initHeader();

            // Insert footer at the end of the body
            document.body.insertAdjacentHTML('beforeend', footerData);
            updateFooterYear();
        })
        .catch(error => console.error('Error loading content:', error));
});

// Initialize header functionality
function initHeader() {
    const menuToggle = document.querySelector('.menu-toggle');
    const opciones = document.querySelector('.opciones');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');

    if (menuToggle && opciones) {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            opciones.classList.toggle('show');
        });

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
                dropdownToggle.removeEventListener('mouseover', showDropdown);
                dropdown.removeEventListener('mouseleave', closeDropdown);
                dropdownToggle.addEventListener('click', toggleDropdown);
            } else {
                dropdownToggle.addEventListener('mouseover', showDropdown);
                dropdown.addEventListener('mouseleave', closeDropdown);
                dropdownToggle.removeEventListener('click', toggleDropdown);
            }
        };

        const showDropdown = () => dropdown.classList.add('show');

        adjustDropdownBehavior();

        window.addEventListener('resize', adjustDropdownBehavior);

        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && !dropdownToggle.contains(e.target)) {
                closeDropdown();
            }
        });
    }
}

// Update footer year dynamically
function updateFooterYear() {
    const yearSpan = document.querySelector('.year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
