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

  const listAmenities = {};

  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      listAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete listAmenities[$(this).attr('data-id')];
    }
    $('.amenities H4').text(Object.values(listAmenities).join(', '));
  });

  const urlPlaces = 'http://' + window.location.hostname + ':5001/api/v1/places_search/';
  $.ajax({
    url: urlPlaces,
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: newPlaces
  });

  function newPlaces(data) {
    $('SECTION.places').empty();
    $('SECTION.places').append(data.map(place => {
      return `<ARTICLE>
              <DIV class="title">
                <H2>${place.name}</H2>
                  <DIV class="price_by_night">
                    $${place.price_by_night}
                  </DIV>
                </DIV>
                <DIV class="information">
                  <DIV class="max_guest">
                    <I class="fa fa-users fa-3x" aria-hidden="true"></I>
                    </BR>
                    ${place.max_guest} Guests
                  </DIV>
                  <DIV class="number_rooms">
                    <I class="fa fa-bed fa-3x" aria-hidden="true"></I>
                    </BR>
                    ${place.number_rooms} Bedrooms
                  </DIV>
                  <DIV class="number_bathrooms">
                    <I class="fa fa-bath fa-3x" aria-hidden="true"></I>
                    </BR>
                    ${place.number_bathrooms} Bathrooms
                  </DIV>
                </DIV>
                <DIV class="description">
                  ${place.description}
                </DIV>
              </ARTICLE>`;
    }));

    $('button').click(function () {
      $.ajax({
        url: urlPlaces,
        type: 'POST',
        data: JSON.stringify({ 'amenities': Object.keys(listAmenities) }),
        contentType: 'application/json',
        dataType: 'json',
        success: newPlaces
      },
      )
    });

  }
});
