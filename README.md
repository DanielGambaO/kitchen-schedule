# kitchen-schedule
Developers:
    Daniel Gamba
    Carlos Barrios
    Santiago Achury


With this app we are not actually updating the json file because is not allowed to update data from the client side due to security policies, if we wanted to actually do it we would need a server side to handle these actions.

That said here's a function that would create a file with an actual update of the data and would download a new file with the updates in case you want to try it

Simulation function:

function submit(data, selectedEmployeeName, selectedDay, newHours) {
    const employeeIndex = data.findIndex((employee) => `${employee.first_name} ${employee.last_name}` === selectedEmployeeName);

    if (employeeIndex !== -1) {
        data[employeeIndex].schedule[selectedDay] = newHours;

        // Convert the updated data to JSON
        const updatedJson = JSON.stringify(data);

        // Create a Blob from the JSON string
        const blob = new Blob([updatedJson], { type: 'application/json' });

        // Create a data URI for the Blob
        const dataUri = URL.createObjectURL(blob);

        // Create a downloadable link
        const downloadLink = document.createElement('a');
        downloadLink.href = dataUri;
        downloadLink.download = 'updated_schedule.json';
        document.body.appendChild(downloadLink);

        // Trigger a click on the link to start the download
        downloadLink.click();

        // Remove the link from the DOM
        document.body.removeChild(downloadLink);

        // Optionally, update the displayed schedule on the page
        fillFullSchedule(data, data[employeeIndex].section);
    } else {
        console.error("Selected employee not found in the data.");
    }
}