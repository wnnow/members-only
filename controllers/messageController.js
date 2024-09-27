const db = require("../database/queryMessage");

async function getMessages(req, res) {
  try {
    const messages = await db.getMessagesAndUserInfo();
    res.render("index.ejs", {
      title: "Board",
      messages: messages,
      user: req.user,
    });
  } catch (err) {
    console.error("Error occurred while getMessage controller:", err);
  }
}

async function deleteMessage(req, res) {
  try {
    const { id } = req.params;
    await db.deleteMessage(id);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error occurred while deleting message in controller:", err);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
}

async function addMessage(req, res) {
  try {
    const { title, text } = req.body;

    await db.insertMessage(title, text, req.user.id);
    res.redirect("/");
  } catch (err) {
    console.error("Error occurred while add message in controller:", err);
  }
}

module.exports = {
  getMessages,
  deleteMessage,
  addMessage,
};
