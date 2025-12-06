// shared/enums.ts
export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
  MANAGER = 'manager',
  STAFF = 'staff',
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  RECEIVED = 'received',
  IN_PROGRESS = 'in_progress',
  AWAITING_APPROVAL = 'awaiting_approval',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REJECTED = 'rejected',
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
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
export enum TrainingMode {
  ONLINE = 'online',
  PHYSICAL = 'physical',
  HYBRID = 'hybrid',
}