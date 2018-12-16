$(function(){
    renderButtons(topics, "searchButton", "#buttons-view");
})


var topics = [
    "cats",
    "dogs",
    "horses",
    "chickens"
];

function renderButtons(topics, classToAdd, areaToAddTo) {
    $("#buttons-view").empty();
    for (i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-animal", topics[i]);
        a.text(topics[i]);
        $(areaToAddTo).append(a);
    };
};

$(document).on("click", ".searchButton", function() {
    $("#searches").empty();    
    var animal = $(this).attr("data-animal");    
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=QJH4zLV4LtO5Z7XXDqViaVxwYp5X3cC9&limit=10";
    
    $.ajax({
    url: queryUrl,
    method: "GET"
}).done(function(response){
    var results = response.data;
        
            for (i = 0; i < results.length; i++){
        var searchDiv = $("<div class='search-item'>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;
        var image = $("<img>");
        image.attr("src", still);
        image.attr("data-still", still);
        image.attr("data-animated", animated);
        image.attr("data-state", "still");
        image.addClass("searchImage");
        searchDiv.append(p);
        searchDiv.append(image);
        $("#searches").append(searchDiv);
    }
  });
});

$(document).on("click", ".searchImage", function(){
    var state = $(this).attr("data-state");
    if(state == "still"){
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

$("#addSearch").on("click", function(){
    var newSearch = $("input").eq(0).val();
    topics.push(newSearch);
    renderButtons(topics, "searchButton", "#buttons-view");
    return false;
})
    
      





