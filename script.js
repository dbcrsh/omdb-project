
var myKey = "6494350e"; 

window.onload = function() {
    var lastMovie = localStorage.getItem("storedMovie");
    if (lastMovie) {
        document.getElementById("movieInput").value = lastMovie;
        runSearch(lastMovie);
    }
};

document.getElementById("searchButton").onclick = function() {
    var title = document.getElementById("movieInput").value;
    if (title == "") {
        alert("Enter a title");
    } else {
        localStorage.setItem("storedMovie", title);
        runSearch(title);
    }
};

function runSearch(movieName) {
    var queryUrl = "https://www.omdbapi.com/?t=" + movieName + "&apikey=" + myKey;

    fetch(queryUrl)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        var resultDiv = document.getElementById("displayResult");
        
        if (data.Response == "True") {
            var output = "<div class='result-card'>";
            output += "<h2>" + data.Title + " (" + data.Year + ")</h2>";
            output += "<img src='" + data.Poster + "'>";
            output += "<p><strong>Director:</strong> " + data.Director + "</p>";
            output += "<p><strong>Genre:</strong> " + data.Genre + "</p>";
            output += "<p><strong>Story:</strong> " + data.Plot + "</p>";
            output += "</div>";
            resultDiv.innerHTML = output;
        } else {
            resultDiv.innerHTML = "<p style='color:red;'>Could not find movie!</p>";
        }
    });
}