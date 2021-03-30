# Workout Buddy

## About

This is my second Milestone Project for my Full Stack Software Development Diploma with Code Institute. I will be using HTML, CSS and JavaScript for this project. The aim is to build on my front end skills by practising my HTML/CSS and implementing JavaScript interactive features. I will also be using the JQuery library for elements.

For this project, I am building a fitness app. The idea is that a user can quickly and easily create a home workout. Included will be some baked in exercises for the user to choose from, and a 'whiteboard' section where the chosen workout exercises will be added to the workout. I also plan to add an option for the user to add their own custom exercise.

The aim is to create a simple app to help people organise their exercise at home, which is more important than ever these days as a lot of us are stuck inside for most of the day.

## UXD

### Strategy

I am looking to cast as wide a net as possible in terms of user base. This app needs to be designed to be used by both fitness newbies and veterans alike.

#### User Stories

I am a fitness beginner and I want:

1. Instructions for how to perform exercises
2. Instructions must not be alienating and explanations should be easy to understand
3. A way to 'progress' their fitness level using the app
4. Positive feedback after completing a workout

I am a fitness 'veteran' and I want:

1. To be able to quickly construct my workout
2. To have a range of exercises to choose from
3. To be able to add my own custom exercises if what I want to do is unavailable
4. To challenge myself
5. For my workout to be saved on the app next time I visit

### Scope

#### Strategy Trade-off Table

Below I have created a trade-off table that addresses the user stories above.

Opportunity/Problem | Importance | Viability
--------------------|------------|-----------
Provide simple exercise instructions in text | 5 | 5
Provide exercise instructions using video | 3 | 1
Add scaling difficulty settings | 4 | 3
Provide users with positive feedback | 3 | 4
Have a large range of exercises baked into the site | 4 | 2
Allow user to add custom exercises on their individual workout | 4 | 4
Create login feature for user profile | 4 | 1
Allow workouts to be stored locally on user browsers | 5 | 5

The website will be built as a Minimum Viable Product. I believe that this project has a great deal of expansion potential, however it will be created with only the most important elements added due to both time constraints as well as my own limitations in terms of knowledge.

For example, it would be useful to create instructional videos for each exercise, however this would be impractical for me to do in terms of time. Instead, I plan to only include textual instructions for the time being.

I will only be adding a relatively small amount of individual exercises baked into the website. This is sensible, as my time is better spent implementing the functionality of the website first. New exercises can always be added later once the functionality is in place.

It would also be useful for a user to be able to create an account and log in. This would then allow them to store their workouts and come back to them. Users could even create their own workout routines and save them on a public server for other users to access. Of course this would involve a great deal of backend development, which is currently outside my skillset. However, a solution for this using JavaScript would be for the workout data to be stored locally to the user's browser, so if they refresh the page or return to it the next day, the workout will still be present.

### Structure

I plan for the website to be structured on one single page. The layout will be simple and responsive as it will be useful for a user to be able to use this on all device types.

The structure will be as simple as possible so as not to overwhelm the user. I want the user to be able to open the website and immediately be able to either create a workout or start their workout with a minimum of fuss. This is especially important for a first time user so as not to create cognitive overload.

The website will conform to web standards in terms of interactive design. Links will be clearly highlighted and signposted.

### Skeleton

The below wireframe gives me an idea of the layout before starting to write any code. It is subject to change if I decide there are better ways of structuring some aspects once the site has been created but I plan to stick to the below as closely as possible.

One element I plan to implement which is slightly different to web standards is that the navbar 'hamburger' element will be on all screen sizes including desktop. My reasoning for this is that it is not so important to have the navigation elements immediately visible on a larger screen - as elements will expand horizontally on larger screens causing the y axis to be much shorter and most of the elements will be already visible on screen. I believe this will result in a more aesthetically pleasing result as I plan for the page to be as minimalist as possible with no visual clutter.

[Wireframe for mobile, tablet, and desktop](documentation/wireframe.pdf)

### Surface

## Issues Overcome

### Timer Function

When starting the project, I knew that my biggest challenge would be implementing the timer feature which plays during the workout. It took me a while to figure out the best strategy to do this (and not without help from the Code Institute Tutor Igor!).

Initially, my plan was to create an empty array for the exercises which would then be pushed to every time the user added a new exercise to their custom workout. Then, the timer function would somehow loop through each item until the end.

This worked well, however there was one problem - deleting items from the array. While I was able to use a splice() method to remove e.g. the last item from the array, I was unable to find a way of removing the CORRECT item from the array.

For example, if the array is as follows: "let exercises = ['pull ups', 'press ups', 'squats']", and the user decides they no longer want to include press ups in their workout, how do I make sure that it is press ups that is removed from the array, rather than simply the last item or the first item?

My initial workaround for this was to simplify the array, and instead of having it be a list of the workout exercises as strings, to simply have it as a numbered list: "let exercises = [1, 2, 3]". This way, it wouldn't matter which item was deleted from the array, the important thing was that it was at least the correct length.

However this method was imperfect. Ideally, I wanted the array to include strings of the exercise names. I could then add each string to the HTML so the user could see which exercise they were meant to be doing as the timer runs. I had to change the way I was thinking about it and start from scratch.

My solution was to trigger a 'getExercises' function every time a new workout was started by the user, rather than at the point where users add each exercise to the workout list on the webpage. So every time a workout starts, each item in the list is immediately pushed to the array, which can then be looped through. This had an added bonus too; as each item is already in local storage, it doesn't matter if the page is refreshed. The array is generated fresh each time a workout is started.

The next difficulty would be to create the timer itself, particularly making it loop correctly through each item in the array. I spent quite some time trying to make it work by looping through each item in the array with a forEach() method, a standard for() method etc but could not figure it out.

Below is the general idea of the code I was using, but this was not working at all, no matter what I tried.

```
let startWorkout = function(sec){
  getExercises();
  exercises.forEach(exercise => {
    timer = function () {
      let timer1 = setInterval(function() {
        $(".modal-content").html(`
          <p class="modal-heading">${exercise}</p>
          <div class="timer">
            <p class="timerdisplay">${sec}</p>
          </div>
        `);
        sec--1;
        if (sec1 < 0) {
        clearInterval(timer1);
      }, 1000)
    }
  })
}
```

In the end, after some advice from Igor at Code Institute, I was once again able to refresh my thinking. I cascaded several functions through each other. The structure of the function goes like the below.

1. The user presses 'start workout'
2. This opens up the modal, and the user selects their difficulty
3. The exercises array is generated from the exercise list as created by the user as described above
4. The timer function is immediately triggered. It takes the first item from the exercises array
5. The timer ticks down for the set time depending on difficulty for that exercise
6. Once complete, the first exercise is removed from the exercises array
7. The code checks if there are any items in the array, if the array is now empty the workout ends, and the modal innerHTML changes to the congratulations screen
8. If there are items still on the array, the restTimer function is triggered, which ticks down for the set amount of time depending on difficulty
9. Once complete the timer function is triggered again from the 'new' first item in the array

## Credits

### Images

* Image of woman performing sit ups taken from [unsplash.com](https://unsplash.com/photos/lrQPTQs7nQQ). Photographer Credit - [Jonathan Borba](https://unsplash.com/@jonathanborba).
* Image of feet walking up concrete steps taken from [unspash.com](https://unsplash.com/photos/PHIgYUGQPvU). Photographer Credit - [Bruno Nascimento](https://unsplash.com/@bruno_nascimento).
* Image of women on yoga mats taken from [unsplash.com](https://unsplash.com/photos/gJtDg6WfMlQ). Photorapher Credit - [Bruce Mars](https://unsplash.com/@brucemars).
* Image of man performing pushups taken from [unsplash.com](https://unsplash.com/photos/zbF-lW3k1QU). Photographer Credit - [Gabe Pierce](https://unsplash.com/@gaberce).
* Champagne bottle SVG in congratulations section from [pixabay.com](https://pixabay.com/vectors/bottle-champagne-1936658/). Image by [succo](https://pixabay.com/users/succo-96729/).

### Audio

* 'Ding' sound effect played at the end of each exercise taken from [freesoundslibrary.com](https://www.freesoundslibrary.com/ding-sound-effect/).
* 'Cheer' sound effect played at the end of the workout taken from [freesoundslibrary.com](https://www.freesoundslibrary.com/big-crowd-cheering/).

### Text

* Exercise instructions text taken and adapted from several websites as needed
  - [healthline.com](https://www.healthline.com/)
  - [spotebi.com](https://www.spotebi.com/)

### Acknowledgements

* Thanks to Code Institute tutor Igor for helping me figure out the best way to implement the timer feature as described in the [Timer Function](#timer-function) section of [Issues Overcome](#issues-overcome).