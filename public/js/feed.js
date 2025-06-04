// script.js
function incrementNumbers() {
    const projects = document.getElementById('projects');
    const clients = document.getElementById('clients');
    const satisfaction = document.getElementById('satisfaction');
    const team = document.getElementById('team');

    let projectCount = 0;
    let clientCount = 0;
    let satisfactionPercent = 0;
    let teamCount = 0;

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

        if (teamCount <= 30) {
            team.textContent = `${teamCount}`;
            teamCount++;
        }

        // Stop incrementing when all values are reached
        if (projectCount > 100 && clientCount > 200 && satisfactionPercent > 98 && teamCount > 30) {
            clearInterval(interval);
        }
    }, 100); // Adjust speed by changing interval time
}

// Start incrementing numbers when the page loads
window.onload = incrementNumbers;
