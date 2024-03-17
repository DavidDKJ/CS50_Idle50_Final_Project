// Load google font
WebFont.load({
    google: {
      families: ['PT Sans', 'PT Sans:bold', 'PT Sans:ital']
    }
});

// Load main content
$(document).ready(function() {
$("#gamespace").load("static/assets/index.html");
});

// Create progress bar (https://progressbarjs.readthedocs.io/en/latest/)
$(document).ready(function() {
    bar = new ProgressBar.Line("#progress", {
        strokeWidth: 1,
        easing: 'linear',
        color: 'white',
        trailColor: 'grey',
        trailWidth: 1,
        svgStyle: {width: '100%', height: '100%'}
      });
});

// Define a function to animate it
function progress(week, course, time) {
    bar.setText(course);
    bar.text.style.fontSize = '1rem';
    bar.animate(1.0, {
        duration: time
    }, function() {
        if (bar.value() == 1) {
            if (course == "Complete CS50") {
                alert("You’re done! Congratulations on finishing CS50! You are officially among those more comfortable now! 🥰");
                return;
            }
            bar.stop();
            bar.set(0);
            bar.setText(null)
            fetch("/update", {
                method: "POST",
                body: JSON.stringify({
                    week: week,
                    completed: course
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        }
    });
};

// Load html when sidebar buttons are clicked
$(document).ready(function() {
    $("#home").click(function(event) {
        $("#gamespace").load("static/assets/index.html");
    });
    $("#scratch").click(function(event) {
        $("#gamespace").load("static/assets/scratch.html");
    });
    $("#c").click(function(event) {
        $("#gamespace").load("static/assets/c.html");
    });
    $("#arrays").click(function(event) {
        $("#gamespace").load("static/assets/arrays.html");
    });
    $("#algos").click(function(event) {
        $("#gamespace").load("static/assets/algos.html");
    });
    $("#memory").click(function(event) {
        $("#gamespace").load("static/assets/memory.html");
    });
    $("#structs").click(function(event) {
        $("#gamespace").load("static/assets/structs.html");
    });
    $("#python").click(function(event) {
        $("#gamespace").load("static/assets/python.html");
    });
    $("#sql").click(function(event) {
        $("#gamespace").load("static/assets/sql.html");
    });
    $("#web").click(function(event) {
        $("#gamespace").load("static/assets/web.html");
    });
    $("#flask").click(function(event) {
        $("#gamespace").load("static/assets/flask.html");
    });
    $("#final").click(function(event) {
        $("#gamespace").load("static/assets/final.html");
    });
});

// Train when a lecture topic is clicked
$(function train() {
    $(document).on('click', ".topic", function(event) {
        // Check that the training hasn't been completed
        let clicked = this.innerText;
        let week = this.parentElement.id;
        $.get( "/update", function(data) {
            if (data["tasks"].includes(clicked)) {
                alert("Already completed!");
                return;
            }
            // Pause or Begin training depending on the current activity
            else if (!bar.text) {
                progress(week, clicked, 1000);
            }
            else if (bar.text.innerText.includes(clicked)) {
                bar.stop();
                bar.set(0);
                bar.setText(null)
            }
            else {
                bar.set(0);
                progress(week, clicked, 1000);
            }
          });
    });
});

// Check course progress when a problem is clicked
$(function check50() {
    $(document).on('click', ".problem", function(event) {
        // Check that the training hasn't been completed
        let clicked = this.innerText;
        let week = this.id[1];
        $.get( "/update", function(data) {
            if (data["tasks"].includes(clicked)) {
                alert("Already completed!");
                return;
            }
            // Pause or Begin training depending on the current activity
            else if (data[week] != 3) {
                alert("You haven't completed the lecture yet!");
                return;
            }
            else if (!bar.text) {
                progress(week, clicked, 1000);
            }
            else if (bar.text.innerText.includes(clicked)) {
                bar.stop();
                bar.set(0);
                bar.setText(null)
            }
            else {
                bar.set(0);
                progress(week, clicked, 1000);
            }
          });
    });
});

// Complete the game!
$(function submit50() {
    $(document).on('click', ".project", function(event) {
        // Check that the training hasn't been completed
        let clicked = this.innerText;
        let week = 10;
        $.get( "/update", function(data) {
            if (data["tasks"].length != 41) {
                alert("You haven't completed all of your other assignments yet!");
                return;
            }
            // Pause or Begin training depending on the current activity
            else if (!bar.text) {
                progress(week, clicked, 1000);
            }
            else if (bar.text.innerText.includes(clicked)) {
                bar.stop();
                bar.set(0);
                bar.setText(null)
            }
            else {
                bar.set(0);
                progress(week, clicked, 1000);
            }
          });
    });
});
