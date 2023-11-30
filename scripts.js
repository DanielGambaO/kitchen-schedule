// Function to read JSON data
function readJsonData(callback) {
  $.ajax({
    url: "data.json",
    dataType: "json",
    success: function (data) {
      callback(data);
    },
    error: function (error) {
      console.error("Error fetching JSON:", error);
    },
  });
}

// JSON data and store it in the variable
function getJsonData() {
  let jsonData = null;

  // Use a synchronous AJAX request to fetch JSON data and store it in the variable
  $.ajax({
    url: "data.json",
    dataType: "json",
    async: false, // Make the request synchronous
    success: function (data) {
      jsonData = data;
    },
    error: function (error) {
      console.error("Error fetching JSON:", error);
    },
  });

  return jsonData;
}

function fillTableWithNamesAndColors(data, tableId, filterPosition) {
  tableId.empty();

  data.forEach((employee, index) => {
    if (
      !filterPosition ||
      (employee["section"] &&
        employee["section"].toLowerCase() === filterPosition.toLowerCase())
    ) {
      const row = $("<tr>");

      const nameCell = $("<td>").text(
        `${employee["first_name"]} ${employee["last_name"]}`
      );
      const colorCell = $("<td>");
      const colorSquare = $("<div>")
        .addClass("color-square")
        .css("background-color", employee["identifier_color"]);

      colorCell.append(colorSquare);
      row.append(nameCell, colorCell);
      tableId.append(row);
    }
  });
}

// Updated fillFullSchedule function
function fillFullSchedule(data, filterSection) {
  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  // Iterate over each day of the week
  daysOfWeek.forEach((day) => {
    // Iterate over each time range
    for (let i = 7; i <= 16; i++) {
      const timeRange = `${i}-${i + 1}`;
      const cellId = `${day.substring(0, 2)}${i}-${i + 1}`;

      // Find the employees scheduled for this time and day
      const employees = data.filter(
        (emp) =>
          emp.schedule[day]?.includes(timeRange) &&
          emp.section === filterSection
      );

      // Update the table cell with the employees' names and colors
      const cell = $(`#${cellId}`);
      if (employees.length > 0) {
        // Create a div for each employee with name and color box
        const contentDiv = $("<div>")
          .addClass("color-square-container")
          .css("width", "30px")
          .css("display", "flex");
        employees.forEach((emp) => {
          const colorBox = $("<div>")
            .addClass("color-square")
            .css("background-color", emp.identifier_color);
          const employeeDiv = $("<div>").append(colorBox);
          contentDiv.append(employeeDiv);
        });

        // Set the content and background color of the cell
        cell.html(contentDiv);
        cell.css("background-color", "white"); // Set a default background color
      } else {
        cell.html("-");
        cell.css("background-color", "white"); // Set a default background color
      }
    }
  });
}

function fillSelectWithNames(data, selectId, section) {
  // Clear existing options
  selectId.empty();

  // Filter employees by section
  const employeesInSection = data.filter(
    (employee) => employee.section === section
  );

  const def = $("<option>")
    .val("")
    .text('Employees')
    .prop('selected', true)
    .prop('disabled', true)
    .prop('hidden', true);
  selectId.append(def);

  // Populate the select element with options
  employeesInSection.forEach((employee) => {
    const option = $("<option>")
      .val(employee.employee_id)
      .text(`${employee.first_name} ${employee.last_name}`);
    selectId.append(option);
  });
}

function fillDropDowns(data, dropdownsList) {

    // Iterar sobre cada empleado en la data
    data.forEach(function (employee) {
        // Obtener la sección del empleado
        var section = employee.section;

        // Encontrar el índice del dropdown correspondiente en dropdownsList
        var dropdownIndex = -1;
        if (section === 'cook') {
            dropdownIndex = 0;
        } else if (section === 'server') {
            dropdownIndex = 1;
        } else if (section === 'cashier') {
            dropdownIndex = 2;
        }

        // Verificar si se encontró un índice válido
        if (dropdownIndex !== -1) {
            // Obtener el dropdown correspondiente
            var dropdown = dropdownsList[dropdownIndex];

            // Crear un nuevo elemento div para el empleado
            var employeeDiv = $('<a>', {
                class: 'dItem',
                id: 'file',
                href: 'schedule.html?section=' + section + '&name=' + employee.first_name + ' ' + employee.last_name,
                text: employee.first_name + ' ' + employee.last_name
            });

            // Agregar el nuevo elemento al dropdown
            dropdown.append(employeeDiv);
        }
    });

}
