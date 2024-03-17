# Idle50
#### Video Demo:  <https://www.youtube.com/watch?v=0EnyH38V3G8>
#### Description:
Hello! This is a short implementation of something called an idle game - if you're unfamiliar it's a "game" that largely plays itself. You click through various tasks presented to you and either
watch some kind of number(s) go up (think your Cookies in Cookie Clicker, which you might know). In this instance, you are "playing" CS50! You'll go through each of the weeks as you would
in the normal course, completing lectures and problem sets until you've complete the final project - the win condition.

I've implemented this as a browser game, though it is single-player only at the moment (as it normally would be, but it would not currently support mutiple separate sessions due to storing
progression in global variables server-side. I ran out of time to implement a more fully-fleshed out, feature-rich game).

I may return to this to pretty it up; add images for the buttons, introduce more tasks, and more importantly progression gating. I had to cut a skill-progression system due to time constraints that i would actually like to implement with less of a time crunch.

Server side it is running via Flask. With Javascript I've implemented some elements of bootstrap, jquery, and utilized a progress bar library. Each week there are three lecture tasks which fill a progress bar and report to the server their completion. Once these are done, you can complete that week's problem set. After completing all lecture tasks and problem sets, you can complete your final project and win the game!

This was a really fun test of my knowledge and, while stressful and not everything I wanted it to be, I'm happy with it, and somewhat proud.

For a more thorough examination of the code behind it:
Firstly, I've designed a layout that keeps a static sidebar designed to look much like CS50's own sidebar. From there the scripting loads the index html into the contents of <main>.
From there, you can click through any of the weeks on the sidebar. Each is linked to its own html file, which is similarly loaded into main via jquery.

Then, each week contains a lecture: 3 buttons that automatically progress (as you can see in a progress bar, also located on the sidebar). Each reports its task name and week it belongs to by sending a json POST. The server then updates a dictionary containing keys that reflect all completed tasks, and how many tasks in each week have been completed.

Then there are problems sets in each week - these check that you have completed 3 other tasks from the same week (i.e., the entire lecture) before letting you complete it, as an example of progression that might be more fully featured with time.

The final project then checks the length of the completed tasks (stored as a list in the dictionary mentioned above), and as long as it is 41 - 3 lecture tasks and a problem for each week plus one lecture task for the final project - it will allow progress to be completed. Otherwise, it'll yell at your to go finish the rest of your assignments.

And that is idle50!
