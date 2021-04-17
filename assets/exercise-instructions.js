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
]

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
]

function addToDom(list, item) {
  list.forEach((exercise) => {
    item.append(`
      <li class="exercise-item">
      <h4 class="toggle-trigger">${exercise.title}</h4>
      <ol class="content">
        ${exercise.extra ? `<p><strong>${exercise.extra}</strong><p>` : ``}
        ${exercise.instructions.map((instruction) =>
      `<li>${instruction}</li>`
      ).join("")}
        <button class="my-button workout-add">Add to workout!</button>
      </ol>
      </li >
    `)
  });
}

addToDom(warmUp, $("#warm-up"))
addToDom(upperBody, $("#upper-body"))
addToDom(core, $("#core"))
addToDom(lowerBody, $("#lower-body"))