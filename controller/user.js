const { v4: uuidv4 } = require("uuid");
const User = require("../model/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    try {
        await User.create({ name, email, password });
        return res.render("signup", {
            success: true,
            message: "Signup successful! Redirecting to login page...",
        });
    } catch (err) {
        return res.render("signup", {
            error: "Email already registered. Please login.",
        });
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
        return res.render("login", {
            error: "Invalid Username or Password",
        });
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
};
