"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    category: { type: String },
    laceType: { type: String },
    density: { type: Number },
    length: { type: String },
    color: { type: String },
    images: [{ type: String }],
    inStock: { type: Boolean, default: true },
    stockCount: { type: Number, default: 0 },
    isNewProduct: { type: Boolean, default: false }, // Changed from `isNew`
    isFeatured: { type: Boolean, default: false },
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
// Remove the duplicate index - keep only one of these:
// Option 1: Remove this line if you have `unique: true` above
// Option 2: Remove `unique: true` from the slug field and keep this
ProductSchema.index({ slug: 1 }, { unique: true });
// Virtual for current price (discounted or regular)
ProductSchema.virtual('currentPrice').get(function () {
    return this.discountPrice || this.price;
});
// Check if product is on sale
ProductSchema.virtual('isOnSale').get(function () {
    return !!this.discountPrice;
});
// Calculate discount percentage
ProductSchema.virtual('discountPercent').get(function () {
    if (!this.discountPrice || !this.price)
        return 0;
    return Math.round(((this.price - this.discountPrice) / this.price) * 100);
});
// Pre-save middleware to generate slug if not provided
ProductSchema.pre('save', function (next) {
    if (!this.slug && this.name) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    next();
});
exports.Product = mongoose_1.models.Product || (0, mongoose_1.model)('Product', ProductSchema);
exports.default = exports.Product;
//# sourceMappingURL=Product.js.map