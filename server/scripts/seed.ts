// scripts/seed.ts
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jifywigs';

// Define enums locally to avoid import issues
enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  MANAGER = 'manager',
  TECHNICIAN = 'technician',
  SUPER_ADMIN = 'super_admin',
}

enum ProductType {
  WIG = 'wig',
  ACCESSORY = 'accessory',
  HAIR_TOOL = 'hair_tool',
}

enum WigLaceType {
  FRONTAL = 'frontal',
  CLOSURE = 'closure',
  GLUELESS = 'glueless',
  FULL_LACE = 'full_lace',
}

enum WigLength {
  SHORT = 'short',
  MEDIUM = 'medium',
  LONG = 'long',
  EXTRA_LONG = 'extra_long',
}

// Define schemas
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  role: { type: String, enum: Object.values(UserRole), default: UserRole.CUSTOMER },
  loginMethod: { type: String, default: 'email' },
  profilePicture: { type: String, default: '' },
  isGoogleAuth: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  shippingAddress: {
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    country: { type: String, default: 'Nigeria' },
    postalCode: { type: String, default: '' },
  },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: [] }],
}, { timestamps: true });

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  discountPrice: { type: Number, min: 0 },
  type: { type: String, enum: Object.values(ProductType), default: ProductType.WIG },
  category: { type: String, required: true },
  color: { type: String, required: true },
  length: { type: String, enum: Object.values(WigLength), required: true },
  density: { type: Number, required: true, min: 100, max: 250 },
  laceType: { type: String, enum: Object.values(WigLaceType), required: true },
  inStock: { type: Boolean, default: true },
  stockCount: { type: Number, default: 0 },
  isPreOrder: { type: Boolean, default: false },
  images: [{ type: String, required: true }],
  videoUrl: { type: String },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
}, { timestamps: true });

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  basePrice: { type: Number, required: true, min: 0 },
  durationMins: { type: Number, required: true, min: 1 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true },
      image: { type: String },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  shippingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String },
    phone: { type: String, required: true },
  },
  trackingNumber: { type: String, required: true, unique: true },
}, { timestamps: true });

// Auto-generate tracking number
OrderSchema.pre('save', function (next) {
  if (this.isNew && !this.trackingNumber) {
    this.trackingNumber = 'JW' + Date.now().toString(36).toUpperCase();
  }
  next();
});

const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);
const Service = mongoose.model('Service', ServiceSchema);
const Order = mongoose.model('Order', OrderSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear collections
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Service.deleteMany({}),
      Order.deleteMany({}),
    ]);
    console.log('🧹 Collections cleared');

    // Create Admin User
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin Jify',
      email: 'admin@jifywigs.com',
      password: hashedPassword,
      phone: '+2348100000000',
      role: UserRole.SUPER_ADMIN,
      loginMethod: 'email',
      profilePicture: '',
      isActive: true,
      shippingAddress: {
        street: '123 Admin Street',
        city: 'Lagos',
        state: 'Lagos',
        country: 'Nigeria',
        postalCode: '100001',
      },
    });

    // Create Regular User
    const userPassword = await bcrypt.hash('user123', 10);
    const regularUser = await User.create({
      name: 'John Doe',
      email: 'customer@example.com',
      password: userPassword,
      phone: '+2348111111111',
      role: UserRole.CUSTOMER,
      loginMethod: 'email',
      profilePicture: '',
      isActive: true,
      shippingAddress: {
        street: '456 Customer Avenue',
        city: 'Abuja',
        state: 'FCT',
        country: 'Nigeria',
        postalCode: '900001',
      },
    });

    console.log('👤 Users created');

    // ==================== PRODUCTS ====================

    // Bone Straight Wigs
    const boneStraightProducts = [
      {
        name: 'Premium Glueless Bone Straight Frontal Wig',
        slug: 'premium-glueless-bone-straight-frontal',
        description: '180% density, 22 inches, natural black, tangle-free, glossy finish',
        price: 52000,
        discountPrice: 45000,
        type: ProductType.WIG,
        category: 'bone_straight',
        color: 'Natural Black',
        length: WigLength.LONG,
        density: 180,
        laceType: WigLaceType.FRONTAL,
        inStock: true,
        stockCount: 15,
        isPreOrder: false,
        images: ['https://placehold.co/600x600/EEE/999?text=Bone+Straight+1'],
        rating: 4.9,
        reviewCount: 124,
      },
      {
        name: 'Luxury Bone Straight Closure Wig',
        slug: 'luxury-bone-straight-closure',
        description: '160% density, 20 inches, jet black, soft and silky',
        price: 38000,
        discountPrice: 32000,
        type: ProductType.WIG,
        category: 'bone_straight',
        color: 'Jet Black',
        length: WigLength.MEDIUM,
        density: 160,
        laceType: WigLaceType.CLOSURE,
        inStock: true,
        stockCount: 8,
        isPreOrder: false,
        images: ['https://placehold.co/600x600/EEE/999?text=Bone+Straight+2'],
        rating: 4.7,
        reviewCount: 89,
      },
      {
        name: 'Short Bob Bone Straight Wig',
        slug: 'short-bob-bone-straight-wig',
        description: '150% density, 14 inches, with bangs, ready to wear',
        price: 28000,
        type: ProductType.WIG,
        category: 'bone_straight',
        color: 'Off Black',
        length: WigLength.SHORT,
        density: 150,
        laceType: WigLaceType.GLUELESS,
        inStock: true,
        stockCount: 12,
        isPreOrder: false,
        images: ['https://placehold.co/600x600/EEE/999?text=Bone+Straight+3'],
        rating: 4.8,
        reviewCount: 67,
      },
      {
        name: 'Bone Straight Full Lace Wig',
        slug: 'bone-straight-full-lace-wig',
        description: '200% density, 24 inches, can be parted anywhere',
        price: 68000,
        type: ProductType.WIG,
        category: 'bone_straight',
        color: 'Natural Black',
        length: WigLength.EXTRA_LONG,
        density: 200,
        laceType: WigLaceType.FULL_LACE,
        inStock: true,
        stockCount: 5,
        isPreOrder: true,
        images: ['https://placehold.co/600x600/EEE/999?text=Bone+Straight+4'],
        rating: 4.9,
        reviewCount: 42,
      },
    ];

    // Curly Wigs
    const curlyProducts = [
      {
        name: 'Water Wave Curly Frontal Wig',
        slug: 'water-wave-curly-frontal',
        description: '180% density, 22 inches, defined water wave pattern',
        price: 48000,
        discountPrice: 42000,
        type: ProductType.WIG,
        category: 'curly',
        color: 'Dark Brown',
        length: WigLength.LONG,
        density: 180,
        laceType: WigLaceType.FRONTAL,
        inStock: true,
        stockCount: 10,
        isPreOrder: false,
        images: ['https://placehold.co/600x600/EEE/999?text=Curly+1'],
        rating: 4.8,
        reviewCount: 96,
      },
      {
        name: 'Deep Curly Closure Wig',
        slug: 'deep-curly-closure',
        description: '170% density, 20 inches, tight spiral curls',
        price: 42000,
        type: ProductType.WIG,
        category: 'curly',
        color: 'Natural Black',
        length: WigLength.MEDIUM,
        density: 170,
        laceType: WigLaceType.CLOSURE,
        inStock: true,
        stockCount: 7,
        isPreOrder: false,
        images: ['https://placehold.co/600x600/EEE/999?text=Curly+2'],
        rating: 4.6,
        reviewCount: 53,
      },
      {
        name: 'Loose Curly Glueless Wig',
        slug: 'loose-curly-glueless-wig',
        description: '160% density, 18 inches, soft loose curls',
        price: 35000,
        type: ProductType.WIG,
        category: 'curly',
        color: 'Brown',
        length: WigLength.MEDIUM,
        density: 160,
        laceType: WigLaceType.GLUELESS,
        inStock: true,
        stockCount: 14,
        isPreOrder: false,
        images: ['https://placehold.co/600x600/EEE/999?text=Curly+3'],
        rating: 4.7,
        reviewCount: 78,
      },
    ];

    // Colored Wigs
    const coloredProducts = [
      {
        name: 'Rose Gold Balayage Wig',
        slug: 'rose-gold-balayage-wig',
        description: '180% density, 22 inches, rose gold highlights',
        price: 58000,
        type: ProductType.WIG,
        category: 'colored',
        color: 'Rose Gold/Black',
        length: WigLength.LONG,
        density: 180,
        laceType: WigLaceType.FRONTAL,
        inStock: true,
        stockCount: 6,
        isPreOrder: true,
        images: ['https://placehold.co/600x600/EEE/999?text=Colored+1'],
        rating: 4.9,
        reviewCount: 31,
      },
      {
        name: 'Honey Blonde Colored Wig',
        slug: 'honey-blonde-colored-wig',
        description: '170% density, 20 inches, warm honey blonde',
        price: 55000,
        discountPrice: 48000,
        type: ProductType.WIG,
        category: 'colored',
        color: 'Honey Blonde',
        length: WigLength.MEDIUM,
        density: 170,
        laceType: WigLaceType.CLOSURE,
        inStock: true,
        stockCount: 4,
        isPreOrder: false,
        images: ['https://placehold.co/600x600/EEE/999?text=Colored+2'],
        rating: 4.8,
        reviewCount: 45,
      },
      {
        name: 'Burgundy Colored Wig',
        slug: 'burgundy-colored-wig',
        description: '160% density, 18 inches, deep burgundy color',
        price: 52000,
        type: ProductType.WIG,
        category: 'colored',
        color: 'Burgundy',
        length: WigLength.MEDIUM,
        density: 160,
        laceType: WigLaceType.FRONTAL,
        inStock: true,
        stockCount: 8,
        isPreOrder: false,
        images: ['https://placehold.co/600x600/EEE/999?text=Colored+3'],
        rating: 4.7,
        reviewCount: 39,
      },
    ];

    // Frontal Wigs
    const frontalProducts = [
      {
        name: 'HD Frontal Lace Wig',
        slug: 'hd-frontal-lace-wig',
        description: '180% density, 22 inches, HD transparent lace',
        price: 55000,
        discountPrice: 48000,
        type: ProductType.WIG,
        category: 'frontal',
        color: 'Natural Black',
        length: WigLength.LONG,
        density: 180,
        laceType: WigLaceType.FRONTAL,
        inStock: true,
        stockCount: 9,
        isPreOrder: false,
        images: ['https://placehold.co/600x600/EEE/999?text=Frontal+1'],
        rating: 4.9,
        reviewCount: 112,
      },
      {
        name: 'Swiss Lace Frontal Wig',
        slug: 'swiss-lace-frontal-wig',
        description: '170% density, 20 inches, ultra-thin Swiss lace',
        price: 60000,
        type: ProductType.WIG,
        category: 'frontal',
        color: 'Off Black',
        length: WigLength.MEDIUM,
        density: 170,
        laceType: WigLaceType.FRONTAL,
        inStock: true,
        stockCount: 6,
        isPreOrder: false,
        images: ['https://placehold.co/600x600/EEE/999?text=Frontal+2'],
        rating: 4.8,
        reviewCount: 87,
      },
    ];

    // Closure Wigs
    const closureProducts = [
      {
        name: '4x4 Closure Wig',
        slug: '4x4-closure-wig',
        description: '160% density, 20 inches, 4x4 closure lace',
        price: 35000,
        discountPrice: 29500,
        type: ProductType.WIG,
        category: 'closure',
        color: 'Natural Black',
        length: WigLength.MEDIUM,
        density: 160,
        laceType: WigLaceType.CLOSURE,
        inStock: true,
        stockCount: 15,
        isPreOrder: false,
        images: ['https://placehold.co/600x600/EEE/999?text=Closure+1'],
        rating: 4.7,
        reviewCount: 94,
      },
      {
        name: '5x5 Silk Base Closure',
        slug: '5x5-silk-base-closure',
        description: '170% density, 22 inches, silk base for natural scalp',
        price: 42000,
        type: ProductType.WIG,
        category: 'closure',
        color: 'Dark Brown',
        length: WigLength.LONG,
        density: 170,
        laceType: WigLaceType.CLOSURE,
        inStock: true,
        stockCount: 8,
        isPreOrder: false,
        images: ['https://placehold.co/600x600/EEE/999?text=Closure+2'],
        rating: 4.9,
        reviewCount: 63,
      },
    ];

    // Braided Wigs
    const braidedProducts = [
      {
        name: 'Box Braids Wig',
        slug: 'box-braids-wig',
        description: 'Medium box braids, 22 inches, ready to wear',
        price: 45000,
        type: ProductType.WIG,
        category: 'braided',
        color: 'Black',
        length: WigLength.LONG,
        density: 160,
        laceType: WigLaceType.GLUELESS,
        inStock: true,
        stockCount: 10,
        isPreOrder: false,
        images: ['https://placehold.co/600x600/EEE/999?text=Braided+1'],
        rating: 4.8,
        reviewCount: 71,
      },
      {
        name: 'Knotless Braids Wig',
        slug: 'knotless-braids-wig',
        description: 'Knotless braids, 24 inches, lightweight',
        price: 50000,
        discountPrice: 45000,
        type: ProductType.WIG,
        category: 'braided',
        color: 'Brown',
        length: WigLength.EXTRA_LONG,
        density: 150,
        laceType: WigLaceType.GLUELESS,
        inStock: true,
        stockCount: 7,
        isPreOrder: false,
        images: ['https://placehold.co/600x600/EEE/999?text=Braided+2'],
        rating: 4.9,
        reviewCount: 58,
      },
    ];

    // Men's Hair
    const mensProducts = [
      {
        name: "Men's Frontal Hair Piece",
        slug: 'mens-frontal-hair-piece',
        description: 'Natural hairline, 12 inches, for men',
        price: 32000,
        type: ProductType.WIG,
        category: 'mens',
        color: 'Natural Black',
        length: WigLength.SHORT,
        density: 140,
        laceType: WigLaceType.FRONTAL,
        inStock: true,
        stockCount: 8,
        isPreOrder: false,
        images: ['https://placehold.co/600x600/EEE/999?text=Mens+1'],
        rating: 4.7,
        reviewCount: 42,
      },
      {
        name: "Men's Closure Hair System",
        slug: 'mens-closure-hair-system',
        description: 'Realistic scalp, 14 inches, easy to install',
        price: 38000,
        type: ProductType.WIG,
        category: 'mens',
        color: 'Dark Brown',
        length: WigLength.MEDIUM,
        density: 150,
        laceType: WigLaceType.CLOSURE,
        inStock: true,
        stockCount: 6,
        isPreOrder: false,
        images: ['https://placehold.co/600x600/EEE/999?text=Mens+2'],
        rating: 4.8,
        reviewCount: 36,
      },
    ];

    // Wig Accessories
    const accessoryProducts = [
      {
        name: 'Wig Grip Band',
        slug: 'wig-grip-band',
        description: 'Non-slip wig grip band for secure fit',
        price: 2500,
        type: ProductType.ACCESSORY,
        category: 'accessories',
        color: 'Black',
        length: WigLength.SHORT,
        density: 100,
        laceType: WigLaceType.GLUELESS,
        inStock: true,
        stockCount: 50,
        isPreOrder: false,
        images: ['https://placehold.co/600x600/EEE/999?text=Accessory+1'],
        rating: 4.6,
        reviewCount: 89,
      },
      {
        name: 'Wig Cap (Black)',
        slug: 'wig-cap-black',
        description: 'Breathable wig cap, pack of 3',
        price: 1500,
        type: ProductType.ACCESSORY,
        category: 'accessories',
        color: 'Black',
        length: WigLength.SHORT,
        density: 100,
        laceType: WigLaceType.GLUELESS,
        inStock: true,
        stockCount: 100,
        isPreOrder: false,
        images: ['https://placehold.co/600x600/EEE/999?text=Accessory+2'],
        rating: 4.5,
        reviewCount: 124,
      },
      {
        name: 'Wig Stand',
        slug: 'wig-stand',
        description: 'Adjustable wig stand for storage and styling',
        price: 4500,
        type: ProductType.ACCESSORY,
        category: 'accessories',
        color: 'White',
        length: WigLength.SHORT,
        density: 100,
        laceType: WigLaceType.GLUELESS,
        inStock: true,
        stockCount: 25,
        isPreOrder: false,
        images: ['https://placehold.co/600x600/EEE/999?text=Accessory+3'],
        rating: 4.7,
        reviewCount: 67,
      },
      {
        name: 'Wig Brush',
        slug: 'wig-brush',
        description: 'Detangling brush for wigs and extensions',
        price: 3000,
        type: ProductType.ACCESSORY,
        category: 'accessories',
        color: 'Pink',
        length: WigLength.SHORT,
        density: 100,
        laceType: WigLaceType.GLUELESS,
        inStock: true,
        stockCount: 40,
        isPreOrder: false,
        images: ['https://placehold.co/600x600/EEE/999?text=Accessory+4'],
        rating: 4.8,
        reviewCount: 92,
      },
    ];

    // Hair Tools
    const hairToolProducts = [
      {
        name: 'Professional Hair Steamer',
        slug: 'professional-hair-steamer',
        description: 'Steam conditioning for deep moisture',
        price: 25000,
        type: ProductType.HAIR_TOOL,
        category: 'tools',
        color: 'White',
        length: WigLength.SHORT,
        density: 100,
        laceType: WigLaceType.GLUELESS,
        inStock: true,
        stockCount: 12,
        isPreOrder: false,
        images: ['https://placehold.co/600x600/EEE/999?text=Tool+1'],
        rating: 4.9,
        reviewCount: 45,
      },
      {
        name: 'Wig Mannequin Head',
        slug: 'wig-mannequin-head',
        description: 'Styling head with clamp',
        price: 8000,
        type: ProductType.HAIR_TOOL,
        category: 'tools',
        color: 'Beige',
        length: WigLength.SHORT,
        density: 100,
        laceType: WigLaceType.GLUELESS,
        inStock: true,
        stockCount: 20,
        isPreOrder: false,
        images: ['https://placehold.co/600x600/EEE/999?text=Tool+2'],
        rating: 4.7,
        reviewCount: 38,
      },
    ];

    // Insert all products
    const allProducts = [
      ...boneStraightProducts,
      ...curlyProducts,
      ...coloredProducts,
      ...frontalProducts,
      ...closureProducts,
      ...braidedProducts,
      ...mensProducts,
      ...accessoryProducts,
      ...hairToolProducts,
    ];

    await Product.insertMany(allProducts);
    console.log(`📦 ${allProducts.length} products created`);

    // ==================== SERVICES ====================

    const services = [
      {
        name: 'Wig Washing & Conditioning',
        slug: 'wig-washing-conditioning',
        description: 'Deep cleaning, detangling, and conditioning treatment',
        basePrice: 3500,
        durationMins: 60,
        isActive: true,
      },
      {
        name: 'Wig Revamp Service',
        slug: 'wig-revamp-service',
        description: 'Complete wig restoration: wash, style, trim & reset',
        basePrice: 12000,
        durationMins: 180,
        isActive: true,
      },
      {
        name: 'Color Refresh & Dye',
        slug: 'color-refresh-dye',
        description: 'Revive faded color or complete color change',
        basePrice: 8000,
        durationMins: 120,
        isActive: true,
      },
      {
        name: 'Lace Ventilation Repair',
        slug: 'lace-ventilation-repair',
        description: 'Fix torn lace and ventilation issues',
        basePrice: 6000,
        durationMins: 90,
        isActive: true,
      },
      {
        name: 'Wig Styling & Cutting',
        slug: 'wig-styling-cutting',
        description: 'Custom styling, trimming, and shaping',
        basePrice: 5000,
        durationMins: 60,
        isActive: true,
      },
      {
        name: 'Wig Customization',
        slug: 'wig-customization',
        description: 'Custom lace tinting, bleaching, and customization',
        basePrice: 10000,
        durationMins: 150,
        isActive: true,
      },
    ];

    await Service.insertMany(services);
    console.log(`🔧 ${services.length} services created`);

    // ==================== SAMPLE ORDER ====================

    const createdProducts = await Product.find().limit(2);
    
    if (createdProducts.length >= 2) {
      await Order.create({
        userId: regularUser._id,
        items: [
          {
            productId: createdProducts[0]._id,
            name: createdProducts[0].name,
            price: createdProducts[0].discountPrice || createdProducts[0].price,
            qty: 1,
            image: createdProducts[0].images[0],
          },
          {
            productId: createdProducts[1]._id,
            name: createdProducts[1].name,
            price: createdProducts[1].discountPrice || createdProducts[1].price,
            qty: 2,
            image: createdProducts[1].images[0],
          },
        ],
        totalAmount: (createdProducts[0].discountPrice || createdProducts[0].price) + 
                     ((createdProducts[1].discountPrice || createdProducts[1].price) * 2),
        status: 'delivered',
        shippingAddress: {
          firstName: 'John',
          lastName: 'Doe',
          address: '456 Customer Avenue',
          city: 'Abuja',
          state: 'FCT',
          postalCode: '900001',
          phone: '+2348111111111',
        },
        trackingNumber: 'JW' + Date.now().toString(36).toUpperCase(),
      });

      console.log('📦 Sample order created');
    }

    // Update user wishlist
    await User.findByIdAndUpdate(regularUser._id, {
      wishlist: createdProducts.map(p => p._id)
    });

    console.log('❤️ Wishlist updated');

    console.log('\n========== SEED COMPLETED ==========');
    console.log('👑 Admin login: admin@jifywigs.com / admin123');
    console.log('👤 User login: customer@example.com / user123');
    console.log('📦 Products created: ' + allProducts.length);
    console.log('🔧 Services created: ' + services.length);
    console.log('====================================\n');

  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the seed
seed();