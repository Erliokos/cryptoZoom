const router = require("express").Router();
const { User } = require("../../db/models");

router.route("/").get(async (req, res) => {
  const monitor = [
    { name: "монитор1" },
    { name: "монитор2" },
    { name: "монитор3" },
    { name: "монитор4" },
    { name: "монитор5" },
    { name: "монитор6" },
    { name: "монитор7" },
    { name: "монитор8" },
  ];
  res.render("index", { monitor });
});

router.route("/lk").get(async (req, res) => {
  const id = req.session.user.id;
  const user = await User.findOne({ where: { id } });
  res.render("lk", { user });
});

module.exports = router;
