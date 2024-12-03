document.addEventListener('DOMContentLoaded', function () {
    fetch('../html/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error loading header: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);

            initHeader();
        })
        .catch(error => console.error('Error loading header:', error));

    fetch('../html/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error loading footer: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);

            updateFooterYear();
        })
        .catch(error => console.error('Error loading footer:', error));
});

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

function updateFooterYear() {
    const yearSpan = document.querySelector('.year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
