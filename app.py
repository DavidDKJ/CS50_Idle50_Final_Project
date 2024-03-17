# Importing Flask
from flask import Flask, redirect, render_template, request, session
from flask_session import Session

# Global list
COMPLETION = {"tasks": []}

# Configure application
app = Flask(__name__)

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


# Borrowing cache prevention from week 9
@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
def index():
    """Show home (tutorial/info) page"""

    # Redirect if the user managed to get here via POST
    if request.method == "POST":
        return redirect("/")

    # Game Display
    else:
        return render_template("layout.html")


@app.route("/update", methods=["GET", "POST"])
def update():
    """Update game completion"""

    # When sent a POST, look for game progression data and update
    if request.method == "POST":
        info = request.json
        week = info.get("week")
        task = info.get("completed")
        if task not in COMPLETION["tasks"]:
            COMPLETION["tasks"].append(task)
        if week in COMPLETION:
            COMPLETION[week] += 1
        else:
            COMPLETION[week] = 1
        return info

    # On GET, return game progression
    else:
        return COMPLETION
