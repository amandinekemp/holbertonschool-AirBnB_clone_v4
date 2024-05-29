#!/usr/bin/node
// Wait until the document is fully loaded
$('document').ready(function () {
  // Set the API status check URL
  const url = 'http://' + window.location.hostname + ':5001/api/v1/status/';
  
  // Perform a GET request to check the API status
  $.get(url, function (response) {
    // If the status is 'OK', add the 'available' class to the API status div
    if (response.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      // Otherwise, remove the 'available' class
      $('DIV#api_status').removeClass('available');
    }
  });

  // Initialize an empty object to store selected amenities
  const listAmenities = {};
  
  // Listen for changes on checkbox inputs
  $('input[type="checkbox"]').change(function () {
    // If the checkbox is checked, add the amenity to the list
    if ($(this).is(':checked')) {
      listAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      // If the checkbox is unchecked, remove the amenity from the list
      delete listAmenities[$(this).attr('data-id')];
    }
    // Update the text of the amenities H4 element to show selected amenities
    $('.amenities H4').text(Object.values(listAmenities).join(', '));
  });
});
