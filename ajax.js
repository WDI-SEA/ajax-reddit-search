$(function() {
  $("#loading").hide();
  $("#search-form").on('submit', search);
  $("#clear").on('click', clearSearchResults);
});

function search(event) {
  // Stop the form from changing the page.
  event.preventDefault();

  // Gather the user input from the search box.
  // Get the text the user entered in the search box.
  // If there's no text in there then default to useing the placeholder.
  var input = $("#query");
  var query = input.val() || input.attr('placeholder');

  // manually display a loading message
  $("#loading").show();

  // Initiate the AJAX request
  $.get('https://www.reddit.com/search.json', {
    q: query
  }).done(function(response) {
    // Clear the search results once new results come in.
    clearSearchResults();

    // convert the response to a list of result objects
    var posts = response.data.children;
    posts.map(function(post) {
      return post.data;
    }).forEach(addSearchResult);
  }).always(function() {
    // After the AJAX is finished remove the loading message.
    $("#loading").hide();
  });
}

function clearSearchResults() {
  $("#results").html("");
}

function addSearchResult(post) {
  // create a div to contain the link
  var div = document.createElement("div");

  var span = document.createElement("span");
  span.textContent = "(" + post.ups + " up / " + post.downs + " down)";

  // create the link
  var link = document.createElement("a");
  link.href = post.url;
  link.textContent = post.title;

  // add the span text and link to the div
  $(div).append(span);
  $(div).append(link);

  // add the div to the search results area
  $("#results").append(div);
}
