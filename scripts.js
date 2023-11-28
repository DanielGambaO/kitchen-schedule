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

function fillTableWithNamesAndColors(data, tableId) {
    // Loop through the data and fill the table
    data.forEach((employee, index) => {
        const row = $('<tr>');

        const nameCell = $('<td>').text(`${employee["first_name"]} ${employee["last_name"]}`);
        const colorCell = $('<td>');
        const colorSquare = $('<div>').addClass('color-square').css('background-color', employee['identifier_color']);

        colorCell.append(colorSquare);
        row.append(nameCell, colorCell);
        tableId.append(row);

    });
}