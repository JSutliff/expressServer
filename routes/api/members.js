const express = require("express");
const router = express.Router();
const members = require("../../Members");

router.get("/", (req, res) => {
  res.json(members);
});

//Get single member
router.get("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json(
      members.filter(member => {
        return member.id === parseInt(req.params.id);
      })
    );
  } else {
    res.status(400).json({
      msg: "Member not found"
    });
  }
});

//Create Member
router.post("/", (req, res) => {
  const newMember = {
    name: req.body.name,
    email: req.body.email,
    status: "active"
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "please include name and email" });
  }

  members.push(newMember);

  res.json(members);
});

//Update Member
router.put("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    const updateMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;
        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    res.status(400).json({
      msg: "Member not found"
    });
  }
});

//Delete Member
router.delete("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "Member Deleted",
      members: members.filter(member => {
        return member.id !== parseInt(req.params.id);
      })
    });
  } else {
    res.status(400).json({
      msg: "Member not found"
    });
  }
});

module.exports = router;
