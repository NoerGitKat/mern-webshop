"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkAdmin = (req, res, next) => {
    var _a;
    if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin) {
        next();
    }
    else {
        return res
            .status(401)
            .json([{ msg: "You should have administrator rights to access." }]);
    }
};
exports.default = checkAdmin;
