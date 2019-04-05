"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const note_controller_1 = __importDefault(require("./note.controller"));
const title_controller_1 = __importDefault(require("./title.controller"));
const login_controller_1 = __importDefault(require("./login.controller"));
router.use("/note", note_controller_1.default);
router.use("/titles", title_controller_1.default);
router.use("/login", login_controller_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map