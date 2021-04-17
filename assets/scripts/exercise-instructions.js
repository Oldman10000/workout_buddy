// warmup exercise instructions
const warmUp = [
  {
    title: "High Knees",
    extra: false,
    instructions: [
      "Begin Jogging on the spot, lifting your knees as high as you can.",
      "Try to lift your knees up to hip level but keep the core tight to support your back.",
      "For a more advanced move, hold your hands straight at hip level and try to touch the knees to your hands as you lift them."
    ]
  },

  {
    title: "Hip Rotations",
    extra: false,
    instructions: [
      "Stand still with your hands on your hips.",
      "Slowly push your hips out to the front and rotate them 360 degrees.",
      "Then rotate them again 360 degrees in the other direction."
    ]
  },

  {
    title: "Arm Rotations",
    extra: false,
    instructions: [
      "Stand still with your hands on your hips.",
      "Slowly push your hips out to the front and rotate them 360 degrees.",
      "Then rotate them again 360 degrees in the other direction."
    ]
  },

  {
    title: "Jumping Jacks",
    extra: false,
    instructions: [
      "Stand with your feet shoulder-width apart and extend yoru arms parallel to the floor.",
      "Circle your arms forward using small controlled motions, gradually making the circles bigger.",
      "Change direction of the circles every ten seconds or so."
    ]
  },

  {
    title: "Leg Swings",
    extra: false,
    instructions: [
      "Stand straight with your feet hip-width apart and hold onto a wall.",
      "Keeping one leg stationary, slowly swing the opposite leg forward and backward in a single smooth movement.",
      "Switch sides and repeat until set is complete."
    ]
  }
];

// upper body exercise instructions
const upperBody = [
  {
    title: "Press Ups",
    extra: false,
    instructions: [
      "Set up prone, with your weight supported on your toes and hands beneath your shoulders, body straight.",
      "Keep your core locked so a straight line forms between your head, glutes and heels. Lower your body until your chest is an inch from the ground then explosively drive up by fully extending your arms.",
      "For a more advanced move, hold your hands straight at hip level and try to touch the knees to your hands as you lift them."
    
    ]
  },

  {
    title: "Pull Ups",
    extra: "For this exercise you will require a pull up bar.",
    instructions: [
      "Start with your hands on the bar approximately shoulder-width apart with your palms facing forward.",
      "With arms extended above you, stick your chest out and curve your back slightly. That is your starting position.",
      "Pull yourself up towards the bar using your back until the bar is at chest level while breathing out.",
      "Slowly lower yourself to the starting position while breathing in. That is one rep."
    ]
  },

  {
    title: "Bicep Curls",
    extra: "For this exercise you will require dumbbells. Filled water bottles can be useful substitutes.",
    instructions: [
      "Stand straight with a dumbbell in each hand, your feet shoulder width and hadns by your sides.",
      "Squeeze the biceps and lift the dumbbells, keeping your elbows close to your body and the upper arms stationary.",
      "Once the dumbbells are at shoulder level, slowly lower your arms to the starting position."
    ]
  },

  {
    title: "Tricep Dips",
    extra: false,
    instructions: [
      "Place your hands behind you onto a chair, with your fingers facing forward.",
      "Extend your legs and start bending your elbows.",
      "Lower your body until your arms are at a 90 degree angle.",
      "Lift your body back up until your arms are straight."
    ]
  },

  {
    title: "Pike Push Ups",
    extra: false,
    instructions: [
      "Set up prone, with your weight supported on your toes and hands beneath your shoulders, hips up.",
      "Bend your elbows until your arms form a 90 degree angle, and bring your head close to the mat.",
      "Straighten your elbows, pushing your body away from the mat and return to the starting position."
    ]
  }
];

// core exercise instructions
const core = [
  {
    title: "Sit Ups",
    extra: false,
    instructions: [
      "Lie down on your back, keep your knees bent and your back and feet flat on the mat.",
      "Slowly lift your torso and sit up.",
      "Return to the starting position by rolling down one vertebrae at a time."
    ]
  },

  {
    title: "Plank",
    extra: false,
    instructions: [
      "Set up prone, with your weight supported on your toes and forearms.",
      "Keep your back straight with an engaged core.",
      "Hold this position for the duration of the exercise."
    ]
  },

  {
    title: "Flutter Kicks",
    extra: false,
    instructions: [
      "Lie on your back with your hands by your sides or place them underneath your glutes.",
      "Alternate stacking your feet on top of each other for the duration, keeping your core engaged throughout.",
    ]
  },

  {
    title: "Russian Twists",
    extra: false,
    instructions: [
      "Sit up with your legs bent at the knees. Your upper body should create a V shape with your thighs.",
      "Twist your torso to the right, then reverse the motion, twisting it to the left.",
      "Repeat this action for the duration, keeping your back straight and core engaged throughout."
    ]
  },

  {
    title: "Jackknife",
    extra: false,
    instructions: [
      "Lie flat on your back with your arms extended above your head.",
      "Hover your arms and legs a few inches off the mat, pressing your tailbone into the mat.",
      "Take a deep breath, and on your exhale, keeping your limbs straight, lift your head and pull your arms and legs up into a V-shape roughly 30-45 degrees away from the mat.",
      "Lower back down to your starting position."
    ]
  }
];

// lower body exercise instructions
const lowerBody = [
  {
    title: "Squats",
    extra: "For an extra challenge, try this while holding dumbbells or filled water bottles in your hands!",
    instructions: [
      "Stand up with your feet shoulder-width apart.",
      "Bend your knees, press your hips back and stop the movement once the hip joing is slightly lower than the knees.",
      "Press your heels into the floor to return to the starting position."
    ]
  },

  {
    title: "Lunges",
    extra: false,
    instructions: [
      "Stand with your feet hip width apart, back straight, shoulders back and abs tight.",
      "Take a step forward, slowly bending the knees until yoru back knee is just above the floor.",
      "Stand up. reversing the movement.",
      "Repeat, alternating legs for the duration."
    ]
  },

  {
    title: "Step Up Knee Raise",
    extra: false,
    instructions: [
      "Place a box or step in front of you and stand up straight.",
      "Step onto the box with your left foot and drive your right knee up.",
      "Step down with your right foot and alternate legs for the duration."
    ]
  },

  {
    title: "Box Jumps",
    extra: "This exercise requires a box, or alternatively a strong chair. For an extra challenge use bigger boxes as you get fitter!",
    instructions: [
      "Place a box or step in front of you and stand up straight.",
      "Jump forwards and up onto the box, landing smoothly on both feet.",
      "Step back down behind you and repeat action for the duration.",
    ]
  },

  {
    title: "Sumo Squats",
    extra: false,
    instructions: [
      "Stand with your feet wider than your shoulders and your arms at your sides. Turn your feet slightly outward.",
      "Keeping your chest up and core engaged, push your hips back, bend your knees, and lower your body until your thighs are at least parallel to the floor. As you squat down, bring your hands together in front of your chest.",
      "Pause, and then return to the starting position."
    ]
  }
];

// adds each exercise instructions to html file
function addToDom(list, item) {
  list.forEach((exercise) => {
    item.append(`
      <li class="exercise-item">
        <h4 class="toggle-trigger">${exercise.title}</h4>
        <ol class="content">
          <div class="instructions">
            ${exercise.extra ? `<p><strong>${exercise.extra}</strong><p>` : ``}
            ${exercise.instructions.map((instruction) =>
            `<li>${instruction}</li>`
            ).join("")}
          </div>
          <button class="my-button workout-add">Add to workout!</button>
        </ol>
      </li >
    `);
  });
}

addToDom(warmUp, $("#warm-up"));
addToDom(upperBody, $("#upper-body"));
addToDom(core, $("#core"));
addToDom(lowerBody, $("#lower-body"));