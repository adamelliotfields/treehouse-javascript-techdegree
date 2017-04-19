// Global variable to cache search results
let results;

// Album search submit handler
$('.search-form').on('submit', (event) => {
  // Prevent page refresh on submit
  event.preventDefault();
  // Clear the albums div before appending results
  $('#albums').empty();
  
  const query = $('#search').val();
  
  // AJAX GET request
  $.getJSON(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album`, (json) => {
    // If there are matches, append each as a li
    if (json.albums.items.length > 0) {
      // Cache json in results variable
      results = json;
      
      $(results.albums.items).each((i, item) => {
        $('#albums').append(`
          <li>
            <div class="album-wrap">
              <a href="#album"><img class="album-art" id="${item.id}" src="${item.images[0].url}"></a>
            </div>
            <span class="album-title">${item.name}</span>
            <span class="album-artist">${item.artists[0].name}</span>
          </li>
        `);
      });
    // If there are no matches, append the no albums found message
    } else {
      $('#albums').append(`
        <li class='no-albums desc'>
          <i class='material-icons icon-help'>help_outline</i>No albums found that match: ${query}.
        </li>
      `);
    }
  });
  // Clear search input field
  $('#search').val('');
});

// Album detail click handler
$('#albums').on('click', 'a[href="#album"]', (event) => {
  // Clear albums div
  $('#albums').empty();
  
  // AJAX GET request
  $.getJSON(`https://api.spotify.com/v1/albums/${$(event.target).attr('id')}`, (json) => {
    // Append album details
    $('#albums').append(`
      <a href="#results" style="color: #222"><p>Back to results</p></a>
      <h2>${json.artists[0].name}</h2>
      <a href="${json.external_urls.spotify}" target="_blank"><img src="${json.images[0].url}" style="width: 350px"></a>
      <button class="spotify" id="show">Show Player</button>
      <iframe src="https://embed.spotify.com/?uri=spotify:album:${json.id}" width="350" height="0" frameborder="0" allowtransparency="true"></iframe>
      <a href="${json.external_urls.spotify}" target="_blank" style="color: #222"><h2>${json.name} (${json.release_date.slice(0, 4)})</h2></a>
    `);
    // Append track list
    $(json.tracks.items).each((i, item) => {
      $('#albums').append(`<p>${item.track_number} - ${item.name}</p>`);
    });
  });
});

// Back to results click handler
$('#albums').on('click', 'a[href="#results"]', () => {
  // Clear albums div
  $('#albums').empty();
  
  // Append previously cached search results
  $(results.albums.items).each((i, item) => {
    $('#albums').append(`
      <li>
        <div class="album-wrap">
          <a href="#album"><img class="album-art" id="${item.id}" src="${item.images[0].url}"></a>
        </div>
        <span class="album-title">${item.name}</span>
        <span class="album-artist">${item.artists[0].name}</span>
      </li>
    `);
  });
});

// Spotify player toggler
$('#albums').on('click', '.spotify', (event) => {
  if ($(event.target).attr('id') === 'show') {
    $('iframe').height(80);
    $(event.target).text('Hide Player').attr('id', 'hide');
  } else if ($(event.target).attr('id') === 'hide') {
    $('iframe').height(0);
    $(event.target).text('Show Player').attr('id', 'show');
  }
});
