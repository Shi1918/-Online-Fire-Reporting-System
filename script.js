document.addEventListener('DOMContentLoaded', function () {
    const reportForm = document.getElementById('reportForm');
    const reportStatus = document.getElementById('reportStatus');
    const teamList = document.getElementById('teamList');
    const addTeamForm = document.getElementById('addTeamForm');

    // Load fire fighter teams from local storage
    function loadTeams() {
        const teams = JSON.parse(localStorage.getItem('teams')) || [];
        teamList.innerHTML = '';
        teams.forEach(team => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = team;
            teamList.appendChild(li);
        });
    }

    loadTeams();

    // Handle form submission
    reportForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const location = document.getElementById('incidentLocation').value;
        const description = document.getElementById('incidentDescription').value;

        fetch('/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ location, description })
        })
        .then(response => response.json())
        .then(data => {
            reportStatus.textContent = `Fire incident reported successfully: ${data.message}`;
            reportForm.reset();
        })
        .catch(error => {
            reportStatus.textContent = 'Error reporting incident.';
            console.error('Error:', error);
        });
    });

    // Handle add team form submission
    addTeamForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const teamName = document.getElementById('teamName').value;
        const teams = JSON.parse(localStorage.getItem('teams')) || [];
        teams.push(teamName);
        localStorage.setItem('teams', JSON.stringify(teams));
        loadTeams();
        $('#addTeamModal').modal('hide');
    });
});
