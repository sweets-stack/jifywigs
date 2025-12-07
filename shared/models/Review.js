"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = exports.ReviewSchema = void 0;
// shared/models/Review.ts
const mongoose_1 = require("mongoose");
exports.ReviewSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    images: [String],
    verified: { type: Boolean, default: false },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });
// Create the Mongoose model
exports.Review = (0, mongoose_1.model)('Review', exports.ReviewSchema);
//# sourceMappingURL=Review.js.map