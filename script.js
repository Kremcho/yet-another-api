$(document).ready(() => {
    // Get references to form and results div
    const form = $('#searchForm');
    const resultsDiv = $('#results');

    // Listen for form submit event
    form.submit((e) => {
        e.preventDefault();

        // Get input values
        const countryInput = $('#country');
        const yearInput = $('#year');
        const country = countryInput.val().toUpperCase();
        const year = yearInput.val();

        // Send AJAX request to retrieve holidays
        $.ajax({
            url: `https://calendarific.com/api/v2/holidays?api_key=1ac877abfbb8598395823ac1f337facb7ddc508b&country=${country}&year=${year}`,
            method: 'GET',
            success: (data) => {
                const holidays = data.response.holidays;

                // Display holidays on the page
                displayHolidays(holidays);
            },
            error: (error) => {
                console.error('Error:', error);
                resultsDiv.html('Error retrieving holidays. Please try again.');
            }
        });
    });

    // Function to display holidays
    function displayHolidays(holidays) {
        if (holidays.length === 0) {
            // Display message if no holidays found
            resultsDiv.html('No holidays found.');
        } else {
            // Clear previous results
            resultsDiv.empty();

            // Loop through holidays and create holiday boxes
            holidays.forEach((holiday) => {
                const holidayBox = $('<div>').addClass('holiday-box');

                // Create paragraphs for holiday details
                const dateParagraph = $('<p>').html(`<strong>Date:</strong> ${holiday.date.iso}`);
                const nameParagraph = $('<p>').html(`<strong>Name:</strong> ${holiday.name}`);
                const typeParagraph = $('<p>').html(`<strong>Type:</strong> ${holiday.type[0]}`);
                const descriptionParagraph = $('<p>').html(`<strong>Description:</strong> ${holiday.description}`);

                // Append paragraphs to holiday box
                holidayBox.append(dateParagraph, nameParagraph, typeParagraph, descriptionParagraph);

                // Append holiday box to results div
                resultsDiv.append(holidayBox);
            });
        }
    }
});
