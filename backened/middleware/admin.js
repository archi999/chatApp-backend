import User from "../models/user.js";

const adminAuth = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user || !user.isAdmin) {
        return res.status(403).json({ msg: 'Admin access required' });
    }
    next();
};

export  {adminAuth}