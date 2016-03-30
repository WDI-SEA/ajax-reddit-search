// Set up the page when it loads.
$(function() {
  // attach the form submission to the search function
  $("#search-form").on('submit', search);
});

function search(event) {
  // Stop the form from changing the page.
  event.preventDefault();

  clearSearchResults();

  // Get the users search input and save it in a variable.
  // Use the input placeholder value (like "kittens") as a default value.
  var input = $("#query");
  var userQuery = input.val() || input.attr("placeholder");

  console.log("searching for:", userQuery);

  $.get('https://www.reddit.com/search.json', {
    q: userQuery
  }).done(function(response) {
    console.log(response);

    var results = response.data.children;
    for (var i = 0; i < results.length; i++) {
    	var result = results[i].data;
    	addSearchResult(result);
    }
  });
}

// Clear previous search results.
function clearSearchResults() {
  $("#results").html("");
}

// Adds a single result object to the page.
function addSearchResult(result) {
  // Create a list item to contain the search result link
  var li = document.createElement("li");

  // create an anchor tag
  var link = document.createElement("a");
  link.href = result.url; // reset the value of the the href
  link.textContent = result.title; // set the value of the text in the link

  // put the link inside the list item.
  $(li).append(link);

  // add the list item to the list of search results
  $("#results").append(li);
}
