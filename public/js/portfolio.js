// assets/js/portfolio.js

function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');

    // Vérifie le thème stocké ou la préférence système
    if (localStorage.getItem('color-theme') === 'dark' || (!localStorage.getItem('color-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
    }

    // Gestion du clic
    themeToggleBtn.addEventListener('click', function() {
        // Toggle les icônes
        lightIcon.classList.toggle('hidden');
        darkIcon.classList.toggle('hidden');
        
        // Toggle le thème
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    });
}

function setupExperienceFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const proItems = document.querySelectorAll('.pro-item');
    const formationItems = document.querySelectorAll('.formation-item');
    const gridContainer = document.querySelector('#experience .grid');

    // Fonction de filtrage améliorée pour la grille
    function filterItems(filter) {
        let visibleItems = 0;
        
        proItems.forEach(item => {
            if (filter === 'all' || filter === 'pro') {
                item.classList.remove('hidden');
                visibleItems++;
            } else {
                item.classList.add('hidden');
            }
        });

        formationItems.forEach(item => {
            if (filter === 'all' || filter === 'formation') {
                item.classList.remove('hidden');
                visibleItems++;
            } else {
                item.classList.add('hidden');
            }
        });

        // Adapte la grille selon le nombre d'éléments visibles
        if (visibleItems === 1) {
            gridContainer.classList.remove('md:grid-cols-2');
            gridContainer.classList.add('md:grid-cols-1');
        } else {
            gridContainer.classList.remove('md:grid-cols-1');
            gridContainer.classList.add('md:grid-cols-2');
        }

        // Mise à jour des styles des boutons
        filterButtons.forEach(btn => {
            if (btn.dataset.filter === filter) {
                btn.classList.remove('bg-gray-200', 'dark:bg-gray-600');
                btn.classList.add('bg-primary', 'text-white');
            } else {
                btn.classList.add('bg-gray-200', 'dark:bg-gray-600');
                btn.classList.remove('bg-primary', 'text-white');
            }
        });
    }

    // Écouteurs d'événements
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterItems(button.dataset.filter);
        });
    });

    // Activer "Tous" par défaut
    filterItems('all');
}

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();
    setupExperienceFilters();
});
