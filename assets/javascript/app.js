/*getting error Uncaught Reference error
$ is not defined, regarding line 3 of this file*/ 
$(document).ready(function() {

//create an array to hold initial buttons
var animeCharacters = ["Goku", "Naruto", "Saitama", "Ash Ketchum"];

//initially i just plugged animeCharacters straight into the function, however, upon referencing the solution this allows me to add other arrays
function makeButtons(animeArray, addClass, addToDiv){
    $(addToDiv).empty();

    for (var i = 0; i < animeArray.length; i++) {
        var j = $('<button>');
        j.addClass(addClass);
        j.attr('data-type', animeArray[i]);
        j.text(animeArray[j]);
        
        $(addToDiv).append(j);
        }
    }

$(document).on("click", ".animeButton", function(){
    $("#animeChars").empty();
    $(".animeButton").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        var results = response.data;

        for (var i=0; i < results.length; i++) {
            var animeDiv = $("<div class=\'anime-item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var animated = results[i].images.fixed_height.url;
            var still =  results[i].images.fixed_height_still.url;

            var animePic = $("<img>");
            animePic.attr("src", still);
            animePic.attr("data-still", still);
            animePic.attr("data-animate", animated);
            animePic.attr("data-state", "still");
            animePic.addClass("anime-image");

            animeDiv.append(p);
            animeDiv.append(animePic);

            $("#animeChars").append(animeDiv);
        
        }
    });
});

$(document).on("click", ".anime-image", function(){
    var state = $(this).attr("data-state");

    if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src". $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
});

$("#addAnimeChar").on("click", function(event){
    event.preventDefault();
    var newAnime = $("input").eq(0).val();
    if(newAnime.length > 2) {
        animeCharacters.push(newAnime);
    }
    makeButtons(animeCharacters, "animeButton", "#anime-buttons");
});

makeButtons(animeCharacters, "animeButton", "#anime-buttons")

});