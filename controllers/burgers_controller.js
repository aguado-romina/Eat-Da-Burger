let express = require("express");

let burger = require("../models/burger.js");

let router = express.Router();

router.get("/", function (req, res) {
  burger.all(function (data) {
    // console.log(data);
    let hbsObject = {
      burgers: data,
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/burgers", function (req, res) {
  console.log(req.body);
  burger.create(["burger_name"], [req.body.burger_name], function () {
    // Send back the ID of the new quote
    res.redirect("/");
  });
});

router.put("/burgers/:id", function (req, res) {
  // let condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update(
    {
      devoured: req.body.devoured,
    },
    condition,
    function (result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

// router.delete("/api/burgers/:id", function (req, res) {
//   let condition = "id = " + req.params.id;

//   burger.delete(condition, function (result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// Export routes for server.js to use.
module.exports = router;
