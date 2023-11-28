// Function to read JSON data
function readJsonData(callback) {
    $.ajax({
        url: 'data.json',
        dataType: 'json',
        success: function (data) {
            callback(data);
        },
        error: function (error) {
            console.error('Error fetching JSON:', error);
        }
    });
}

// JSON data and store it in the variable
function getJsonData() {
    let jsonData = null;

    // Use a synchronous AJAX request to fetch JSON data and store it in the variable
    $.ajax({
        url: 'data.json',
        dataType: 'json',
        async: false, // Make the request synchronous
        success: function (data) {
            jsonData = data;
        },
        error: function (error) {
            console.error('Error fetching JSON:', error);
        }
    });

    return jsonData;
}

function fillTableWithNamesAndColors(data, tableId, filterPosition) {
    tableId.empty();

    data.forEach((employee, index) => {
        if (!filterPosition || (employee['position'] && employee['position'].toLowerCase() === filterPosition.toLowerCase())) {
            const row = $('<tr>');

            const nameCell = $('<td>').text(`${employee["first_name"]} ${employee["last_name"]}`);
            const colorCell = $('<td>');
            const colorSquare = $('<div>').addClass('color-square').css('background-color', employee['identifier_color']);

            colorCell.append(colorSquare);
            row.append(nameCell, colorCell);
            tableId.append(row);
        }
    });
}

function fillFullSchedule(data) {
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

    // Iterate over each day of the week
    daysOfWeek.forEach((day) => {
        // Iterate over each time range
        for (let i = 7; i <= 16; i++) {
            const timeRange = `${i}-${i + 1}`;
            const cellId = `${day.substring(0, 2)}${i}-${i + 1}`;

            // Find the employees scheduled for this time and day
            const employees = data.filter(emp => emp.schedule[day]?.includes(timeRange));

            // Update the table cell with the employees' names and colors
            const cell = $(`#${cellId}`);
            if (employees.length > 0) {
                // Concatenate names and colors if there are multiple employees
                const names = employees.map(emp => `${emp.first_name} ${emp.last_name}`).join('<br>');
                const colors = employees.map(emp => emp.identifier_color).join(';');
                console.log(colors)
                cell.html(names);
                cell.css('background-color', colors);
            } else {
                cell.html('-');
                cell.css('background-color', 'white'); // Set a default background color
            }
        }
    });
}
