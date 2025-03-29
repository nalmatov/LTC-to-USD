document.addEventListener('DOMContentLoaded', function() {
    // Handle active navigation links
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.includes(linkPath) && linkPath !== 'index.html') {
            link.parentElement.classList.add('active');
        } else if (currentLocation.endsWith('/') && linkPath === 'index.html') {
            link.parentElement.classList.add('active');
        }
    });

    // Simulate price updates (in a real app, this would come from an API)
    function updatePrice() {
        const currentPrice = parseFloat(document.getElementById('h-course').innerText.split('$')[1]);
        const randomChange = (Math.random() * 0.2 - 0.1) * currentPrice;
        const newPrice = (currentPrice + randomChange).toFixed(3);

        document.getElementById('h-course').innerText = `1 LTC = $${newPrice}`;

        const percentElement = document.getElementById('h-procent');
        const percentChange = (randomChange / currentPrice * 100).toFixed(2);

        if (percentChange >= 0) {
            percentElement.innerHTML = `<span class="graph-up wth-icon"> +${percentChange}%</span>`;
        } else {
            percentElement.innerHTML = `<span class="graph-down wth-icon"> ${percentChange}%</span>`;
        }
    }

    // Update price every 30 seconds
    setInterval(updatePrice, 30000);
});
