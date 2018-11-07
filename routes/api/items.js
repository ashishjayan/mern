const express = require("express");
const router = express.Router();

//ITEM database model

const Item = require("../../models/item");

//api endpoints

router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 }) //negative -1 is descending
    .then(items => res.json(items));
});
router.post("/", (req, res) => {
  const newItem = new Item({
    student: req.body.name,
    gpa: req.body.gpa
  });
  newItem.save().then(item => res.json(item));
});

router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
