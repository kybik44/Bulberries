import { Schema, model } from 'mongoose';

export interface ISeller {
    userId: Schema.Types.ObjectId;
    licenseId: string;
}

const sellerSchema = new Schema<ISeller>(
    {
        userId: {
            type: Schema.Types.ObjectId,
        },
        licenseId: {
            type: String,
            required: [true, 'License Id is required'],
        },
    },
    { timestamps: true }
);

const Seller = model<ISeller>('seller', sellerSchema);

export default Seller;
