// shared/enums.ts
export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
  MANAGER = 'manager',
  STAFF = 'staff'
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export enum PaymentMethod {
  PAYSTACK = 'paystack',
  STRIPE = 'stripe',
  BANK_TRANSFER = 'bank_transfer',
  CASH = 'cash'
}

export enum TrainingMode {
  PHYSICAL = 'physical',
  ONLINE = 'online',
  HYBRID = 'hybrid'
}

export enum TrainingStatus {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum CertificateStatus {
  PENDING = 'pending',
  ISSUED = 'issued',
  REVOKED = 'revoked'
}

export enum BookingStatus {
  PENDING = 'pending',
  AWAITING_APPROVAL = 'awaiting_approval', // Add this
  CONFIRMED = 'confirmed',
  RECEIVED = 'received',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REJECTED = 'rejected', // Add this
}

export enum ProductStatus {
  IN_STOCK = 'in_stock',
  LOW_STOCK = 'low_stock',
  OUT_OF_STOCK = 'out_of_stock',
  DISCONTINUED = 'discontinued'
}

export enum ReviewStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}
export enum ProductType {
  WIG = 'wig',
  ACCESSORY = 'accessory',
  HAIR_TOOL = 'hair_tool',
}

// shared/enums.ts
export enum WigLaceType {
  FRONTAL = 'frontal',
  CLOSURE = 'closure',
  GLUELESS = 'glueless',
  FULL_LACE = 'full_lace',
}

export enum WigLength {
  SHORT = 'short',
  MEDIUM = 'medium',
  LONG = 'long',
  EXTRA_LONG = 'extra_long',
}
