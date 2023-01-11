const { isValidObjectId } = require("mongoose");
const PasswordResetToken = require("../models/PasswordResetToken");
const { sendError } = require("../utils/helper");
exports.isValidPassResetToken = async (req, res, next) => {
     const { token, userId } = req.body;
     console.log(token)

    if (!token.trim() || !isValidObjectId(userId))
        return sendError(res, "Invalid request!");

    const resetToken = await PasswordResetToken.findOne({ owner: userId });
    if (!resetToken)
        return sendError(res, "Unauthorized access, invalid request!");

    const matched = await resetToken.compaireToken(token);
    if (!matched) return sendError(res, "Unauthorized access, invalid request!");

    req.resetToken = resetToken;
    next();
};