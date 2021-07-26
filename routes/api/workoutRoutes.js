const router = require("express").Router();
const Workouts = require("../../models/Workout");
const mongojs = require("mongojs");

router.get("/workouts", (req, res) => {
  Workouts.find({}, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
});
router.post("/workouts", ({ body }, res) => {
  Workouts.create(body)
    .then((newWorkout) => {
      res.json(newWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.put("/workouts/:id", (req, res) => {
  Workouts.findOneAndUpdate(
    { _id: req.params.id },
    {
      $inc: { totalDuration: req.body.duration },
      $push: { exercises: req.body },
    },
    { new: true }
  )
    .then((updatedWorkout) => {
      res.json(updatedWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.get("/workouts/range", (req, res) => {
  Workouts.find({})
    .limit(5)
    .then((rangeWorkouts) => {
      res.json(rangeWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.post("/workouts/range", (req, res) => {
  Workouts.create({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
