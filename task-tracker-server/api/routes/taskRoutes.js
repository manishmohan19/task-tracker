const router = require("express").Router();
const controller = require("./taskController");

router.get("/", controller.getTasks);

router.get("/:id", controller.getSingleTask);

router.post("/", controller.addTask);

router.put("/:id", controller.toggleTask);

router.delete("/:id", controller.deleteTask);

module.exports = router;
