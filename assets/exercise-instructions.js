const warmUpExercises = [

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

warmUpExercises.forEach((warmup) => {
  $("#warm-up").append(`
    <li class="exercise-item">
    <h4 class="toggle-trigger">${warmup.title}</h4>
    <div class="content">
      ${warmup.extra ? '<p><strong>${warmup.extra}</strong><p>' : ``}
      ${warmup.instructions.map((instruction) =>
    `<p>${instruction}</p>`
  ).join("")}
      <button class="my-button workout-add">Add to workout!</button>
    </div >
    </li >
  `)
})