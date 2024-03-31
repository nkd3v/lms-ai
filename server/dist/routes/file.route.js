"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRouter = void 0;
const express_1 = require("express");
const multer_middleware_1 = require("../middleware/multer.middleware");
const router = (0, express_1.Router)();
exports.FileRouter = router;
router.post('/upload', multer_middleware_1.upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('here');
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }
        const imageUrl = `http://localhost:3000/api/v1/uploads/${req.file.filename}`;
        res.status(201).json({ imageUrl });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading image' });
    }
}));
