const emailModel = require("../db/models/emailModel");

exports.subscribe = async (req, res) => {
    const { email } = req.body;

    try {
        const newEmail = new emailModel({
            email
        });

        const existingUser = await emailModel.findOne({ email });
        if (existingUser) {
          return res.status(400).json({
            error: "The email you entered is already associated with an account",
          });
        }

        await newEmail.save();
        res.status(200).json({ email });
    } catch (error) {
        console.error("Error inputting email:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
