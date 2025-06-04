// script.js
function incrementNumbers() {
    const projects = document.getElementById('projects');
    const clients = document.getElementById('clients');
    const satisfaction = document.getElementById('satisfaction');

    let projectCount = 0;
    let clientCount = 0;
    let satisfactionPercent = 0;

    const interval = setInterval(() => {
        if (projectCount <= 100) {
            projects.textContent = `${projectCount}+`;
            projectCount++;
        }
        
        if (clientCount <= 100) {
            clients.textContent = `${clientCount}+`;
            clientCount++;
        }

        if (satisfactionPercent <= 100) {
            satisfaction.textContent = `${satisfactionPercent}%`;
            satisfactionPercent++;
        }

        // Stop incrementing when all values are reached
        if (projectCount > 100 && clientCount > 200 && satisfactionPercent > 98) {
            clearInterval(interval);
        }
    }, 100); // Adjust speed by changing interval time
}

// Start incrementing numbers when the page loads
window.onload = incrementNumbers;
