import { Schema, Document } from 'mongoose';
export declare const ReviewSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    comment: string;
    userId: import("mongoose").Types.ObjectId;
    images: string[];
    rating: number;
    status: "pending" | "approved" | "rejected";
    productId: import("mongoose").Types.ObjectId;
    userName: string;
    verified: boolean;
} & import("mongoose").DefaultTimestampProps, Document<unknown, {}, import("mongoose").FlatRecord<{
    comment: string;
    userId: import("mongoose").Types.ObjectId;
    images: string[];
    rating: number;
    status: "pending" | "approved" | "rejected";
    productId: import("mongoose").Types.ObjectId;
    userName: string;
    verified: boolean;
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    comment: string;
    userId: import("mongoose").Types.ObjectId;
    images: string[];
    rating: number;
    status: "pending" | "approved" | "rejected";
    productId: import("mongoose").Types.ObjectId;
    userName: string;
    verified: boolean;
} & import("mongoose").DefaultTimestampProps> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Review: import("mongoose").Model<{
    comment: string;
    userId: import("mongoose").Types.ObjectId;
    images: string[];
    rating: number;
    status: "pending" | "approved" | "rejected";
    productId: import("mongoose").Types.ObjectId;
    userName: string;
    verified: boolean;
} & import("mongoose").DefaultTimestampProps, {}, {}, {}, Document<unknown, {}, {
    comment: string;
    userId: import("mongoose").Types.ObjectId;
    images: string[];
    rating: number;
    status: "pending" | "approved" | "rejected";
    productId: import("mongoose").Types.ObjectId;
    userName: string;
    verified: boolean;
} & import("mongoose").DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    comment: string;
    userId: import("mongoose").Types.ObjectId;
    images: string[];
    rating: number;
    status: "pending" | "approved" | "rejected";
    productId: import("mongoose").Types.ObjectId;
    userName: string;
    verified: boolean;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    comment: string;
    userId: import("mongoose").Types.ObjectId;
    images: string[];
    rating: number;
    status: "pending" | "approved" | "rejected";
    productId: import("mongoose").Types.ObjectId;
    userName: string;
    verified: boolean;
} & import("mongoose").DefaultTimestampProps, Document<unknown, {}, import("mongoose").FlatRecord<{
    comment: string;
    userId: import("mongoose").Types.ObjectId;
    images: string[];
    rating: number;
    status: "pending" | "approved" | "rejected";
    productId: import("mongoose").Types.ObjectId;
    userName: string;
    verified: boolean;
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    comment: string;
    userId: import("mongoose").Types.ObjectId;
    images: string[];
    rating: number;
    status: "pending" | "approved" | "rejected";
    productId: import("mongoose").Types.ObjectId;
    userName: string;
    verified: boolean;
} & import("mongoose").DefaultTimestampProps> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export interface IReviewDocument {
    productId: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    images?: string[];
    verified: boolean;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=Review.d.ts.map