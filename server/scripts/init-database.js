// scripts/init-database.js
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://jifywigs_admin:xbtjvt9RwOtoxjk4@jifywigs.nkyabex.mongodb.net/jifywigs?retryWrites=true&w=majority';

// Define schemas directly in the script
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  longDescription: String,
  price: { type: Number, required: true },
  discountPrice: Number,
  type: { type: String, enum: ['wig', 'accessory', 'tool'], default: 'wig' },
  category: { type: String, required: true },
  color: String,
  length: { type: String, enum: ['short', 'medium', 'long', 'extra-long'], default: 'medium' },
  density: Number,
  laceType: { type: String, enum: ['frontal', '360', 'closure', 'none'], default: 'frontal' },
  inStock: { type: Boolean, default: true },
  stockCount: { type: Number, default: 0 },
  isPreOrder: { type: Boolean, default: false },
  images: [String],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  tags: [String],
  viewCount: { type: Number, default: 0 }
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['customer', 'admin', 'super_admin', 'staff', 'manager'], 
    default: 'customer' 
  },
  emailVerified: { type: Boolean, default: false },
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
  }
}, { timestamps: true });

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    quantity: Number,
    price: Number,
    total: Number
  }],
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentMethod: String,
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  shippingAddress: {
    name: String,
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
    phone: String
  }
}, { timestamps: true });

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  service: { type: String, required: true },
  scheduledDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  totalAmount: { type: Number, required: true },
  notes: String
}, { timestamps: true });

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: String,
  category: { 
    type: String, 
    enum: ['installation', 'customization', 'maintenance', 'consultation', 'training']
  },
  inStock: { type: Boolean, default: true },
  requiresAppointment: { type: Boolean, default: true },
  images: [String]
}, { timestamps: true });

const trainingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  courseName: { type: String, required: true },
  price: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['enrolled', 'in_progress', 'completed', 'cancelled'],
    default: 'enrolled'
  },
  enrollmentDate: { type: Date, default: Date.now },
  completionDate: Date
}, { timestamps: true });

// Create models
const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const Service = mongoose.model('Service', serviceSchema);
const Training = mongoose.model('Training', trainingSchema);

const sampleProducts = [
  {
    name: 'Premium Bone Straight Glueless Wig',
    slug: 'premium-bone-straight-glueless',
    description: '180% density, HD frontal lace, glueless installation',
    longDescription: 'High quality glueless wig with HD frontal lace, perfect for daily wear',
    price: 45000,
    discountPrice: 38000,
    type: 'wig',
    category: 'bone_straight',
    color: 'Natural Black',
    length: 'long',
    density: 180,
    laceType: 'frontal',
    inStock: true,
    stockCount: 12,
    images: [],
    tags: ['Best Seller', 'Glueless', 'HD Lace'],
  },
  {
    name: 'Curly Bob Wig',
    slug: 'curly-bob-wig',
    description: '150% density, natural curly pattern',
    longDescription: 'Beautiful curly bob wig with natural hair pattern',
    price: 35000,
    discountPrice: 32000,
    type: 'wig',
    category: 'curly',
    color: 'Natural Black',
    length: 'short',
    density: 150,
    laceType: 'frontal',
    inStock: true,
    stockCount: 8,
    images: [],
    tags: ['Curly', 'Bob', 'Natural'],
  },
  {
    name: 'Colored Blonde Frontal Wig',
    slug: 'colored-blonde-frontal-wig',
    description: '160% density, blonde color, frontal lace',
    price: 50000,
    type: 'wig',
    category: 'colored',
    color: 'Blonde',
    length: 'medium',
    density: 160,
    laceType: 'frontal',
    inStock: true,
    stockCount: 5,
    images: [],
    tags: ['Colored', 'Blonde', 'Frontal'],
  }
];

const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@jifywigs.com',
    password: '$2a$10$ExampleHashedPassword123', // In real app, use bcrypt
    role: 'super_admin',
    emailVerified: true,
    phone: '+2341234567890',
    address: {
      street: '123 Admin Street',
      city: 'Lagos',
      state: 'Lagos',
      country: 'Nigeria',
      postalCode: '100001'
    }
  },
  {
    name: 'John Customer',
    email: 'john@example.com',
    password: '$2a$10$ExampleHashedPassword456',
    role: 'customer',
    emailVerified: true,
    phone: '+2341234567891',
    address: {
      street: '456 Customer Ave',
      city: 'Abuja',
      state: 'FCT',
      country: 'Nigeria',
      postalCode: '900001'
    }
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    password: '$2a$10$ExampleHashedPassword789',
    role: 'customer',
    emailVerified: true,
    phone: '+2341234567892',
    address: {
      street: '789 Customer Lane',
      city: 'Port Harcourt',
      state: 'Rivers',
      country: 'Nigeria',
      postalCode: '500001'
    }
  }
];

const sampleOrders = [
  {
    orderNumber: 'ORD-001',
    items: [
      {
        name: 'Premium Bone Straight Glueless Wig',
        quantity: 1,
        price: 45000,
        total: 45000
      }
    ],
    total: 45000,
    status: 'delivered',
    paymentMethod: 'card',
    shippingAddress: {
      name: 'John Customer',
      street: '456 Customer Ave',
      city: 'Abuja',
      state: 'FCT',
      country: 'Nigeria',
      postalCode: '900001',
      phone: '+2341234567891'
    },
    paymentStatus: 'paid'
  },
  {
    orderNumber: 'ORD-002',
    items: [
      {
        name: 'Curly Bob Wig',
        quantity: 2,
        price: 35000,
        total: 70000
      }
    ],
    total: 70000,
    status: 'processing',
    paymentMethod: 'transfer',
    shippingAddress: {
      name: 'Sarah Johnson',
      street: '789 Customer Lane',
      city: 'Port Harcourt',
      state: 'Rivers',
      country: 'Nigeria',
      postalCode: '500001',
      phone: '+2341234567892'
    },
    paymentStatus: 'paid'
  }
];

const sampleBookings = [
  {
    bookingId: 'BK-001',
    customerName: 'Jane Doe',
    customerEmail: 'jane@example.com',
    customerPhone: '+2341234567892',
    service: 'Wig Installation',
    scheduledDate: new Date(Date.now() + 86400000), // Tomorrow
    status: 'confirmed',
    totalAmount: 15000,
    notes: 'Need custom styling'
  },
  {
    bookingId: 'BK-002',
    customerName: 'Mike Smith',
    customerEmail: 'mike@example.com',
    customerPhone: '+2341234567893',
    service: 'Wig Customization',
    scheduledDate: new Date(Date.now() + 172800000), // Day after tomorrow
    status: 'pending',
    totalAmount: 10000,
    notes: 'Color matching needed'
  }
];

const sampleServices = [
  {
    name: 'Wig Installation & Styling',
    description: 'Professional wig installation with custom styling',
    price: 15000,
    duration: '2-3 hours',
    category: 'installation',
    inStock: true,
    requiresAppointment: true
  },
  {
    name: 'Wig Customization',
    description: 'Custom cutting, coloring, and styling',
    price: 10000,
    duration: '1-2 hours',
    category: 'customization',
    inStock: true,
    requiresAppointment: true
  },
  {
    name: 'Wig Maintenance',
    description: 'Deep cleaning, conditioning, and repair',
    price: 8000,
    duration: '1 hour',
    category: 'maintenance',
    inStock: true,
    requiresAppointment: true
  }
];

async function initDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing data (optional)
    console.log('Clearing existing data...');
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    await Booking.deleteMany({});
    await Service.deleteMany({});
    await Training.deleteMany({});
    console.log('✅ Cleared all collections');
    
    // Create users
    console.log('Creating users...');
    const createdUsers = await User.create(sampleUsers);
    console.log(`✅ Created ${createdUsers.length} users`);
    
    const adminUser = createdUsers.find(u => u.role === 'super_admin');
    const customerUsers = createdUsers.filter(u => u.role === 'customer');
    
    // Create products
    console.log('Creating products...');
    const createdProducts = await Product.create(sampleProducts);
    console.log(`✅ Created ${createdProducts.length} products`);
    
    // Create orders with user IDs
    console.log('Creating orders...');
    const ordersWithUsers = sampleOrders.map((order, index) => ({
      ...order,
      userId: customerUsers[index % customerUsers.length]._id,
      items: order.items.map(item => ({
        ...item,
        productId: createdProducts[0]._id
      }))
    }));
    
    const createdOrders = await Order.create(ordersWithUsers);
    console.log(`✅ Created ${createdOrders.length} orders`);
    
    // Create bookings
    console.log('Creating bookings...');
    const createdBookings = await Booking.create(sampleBookings);
    console.log(`✅ Created ${createdBookings.length} bookings`);
    
    // Create services
    console.log('Creating services...');
    const createdServices = await Service.create(sampleServices);
    console.log(`✅ Created ${createdServices.length} services`);
    
    // Create training enrollments
    console.log('Creating training enrollments...');
    await Training.create([
      {
        userId: customerUsers[0]._id,
        courseName: 'Wig Making Basics',
        price: 25000,
        status: 'completed',
        enrollmentDate: new Date(Date.now() - 86400000 * 7), // 7 days ago
        completionDate: new Date(Date.now() - 86400000 * 2) // 2 days ago
      },
      {
        userId: customerUsers[1]._id,
        courseName: 'Advanced Styling Techniques',
        price: 35000,
        status: 'in_progress',
        enrollmentDate: new Date(Date.now() - 86400000 * 3) // 3 days ago
      }
    ]);
    console.log('✅ Created 2 training enrollments');
    
    console.log('\n✅ Database initialized successfully!');
    console.log('\n📊 Sample Data Created:');
    console.log(`  Products: ${createdProducts.length}`);
    console.log(`  Users: ${createdUsers.length} (1 admin, ${customerUsers.length} customers)`);
    console.log(`  Orders: ${createdOrders.length}`);
    console.log(`  Bookings: ${createdBookings.length}`);
    console.log(`  Services: ${createdServices.length}`);
    console.log(`  Training: 2 enrollments`);
    
    console.log('\n🔑 Admin Login:');
    console.log(`  Email: ${adminUser.email}`);
    console.log(`  Password: password123 (use the actual password you set in your auth system)`);
    console.log(`  Role: ${adminUser.role}`);
    
    console.log('\n👤 Customer Logins:');
    customerUsers.forEach((user, index) => {
      console.log(`  ${index + 1}. Email: ${user.email} | Password: password123`);
    });
    
    console.log('\n📞 Test Bookings:');
    createdBookings.forEach((booking, index) => {
      console.log(`  ${index + 1}. ID: ${booking.bookingId} | Customer: ${booking.customerName} | Status: ${booking.status}`);
    });
    
    console.log('\n🛍️ Test Orders:');
    createdOrders.forEach((order, index) => {
      console.log(`  ${index + 1}. Number: ${order.orderNumber} | Total: ₦${order.total} | Status: ${order.status}`);
    });
    
    console.log('\n🔧 Services Available:');
    createdServices.forEach((service, index) => {
      console.log(`  ${index + 1}. ${service.name}: ₦${service.price}`);
    });
    
    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
    console.log('\n🚀 Next Steps:');
    console.log('  1. Run: npm run dev');
    console.log('  2. Go to: http://localhost:3005/admin/login');
    console.log('  3. Login with admin@jifywigs.com');
    console.log('  4. Check if dashboard shows real data!');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    console.error('Error details:', error.message);
    
    // Try to disconnect if connection was established
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    
    process.exit(1);
  }
}

initDatabase();