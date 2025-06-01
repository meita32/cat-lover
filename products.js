document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    let activeFilters = new Set();

    // Function to update product visibility based on active filters
    function updateProducts() {
        productCards.forEach(card => {
            const categories = card.dataset.categories.split(' ');
            
            // If no filters are active, show all products
            if (activeFilters.size === 0) {
                card.classList.remove('hidden');
                return;
            }

            // Check if the product matches any active filter
            const shouldShow = Array.from(activeFilters).some(filter => 
                categories.includes(filter)
            );

            if (shouldShow) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Toggle active state of the button
            button.classList.toggle('active');
            
            // Update active filters set
            if (button.classList.contains('active')) {
                activeFilters.add(filter);
            } else {
                activeFilters.delete(filter);
            }
            
            // Update product visibility
            updateProducts();
        });
    });

    // Add clear filters functionality
    function clearFilters() {
        activeFilters.clear();
        filterButtons.forEach(button => button.classList.remove('active'));
        updateProducts();
    }

    // Add clear filters button
    const filtersSection = document.querySelector('.filters');
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear Filters';
    clearButton.classList.add('clear-filters-btn');
    clearButton.addEventListener('click', clearFilters);
    filtersSection.appendChild(clearButton);
}); 