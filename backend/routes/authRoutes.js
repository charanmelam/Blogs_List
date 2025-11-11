import express from "express";
const router = express.Router();

// Hardcoded admin credentials
const ADMIN = { username: "admin", email: "admin@admin.com", password: "admin123", role: "admin" };

// Admin login only
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN.email && password === ADMIN.password) {
        return res.json({ message: "Admin login successful", user: ADMIN });
    }

    return res.status(403).json({ message: "Invalid credentials" });
});

export default router;