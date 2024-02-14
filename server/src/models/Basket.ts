import { Schema, model } from 'mongoose';

export interface IBasket {
    userId: Schema.Types.ObjectId;
    productId: Schema.Types.ObjectId;
    quantity: number;
}

const basketSchema = new Schema<IBasket>({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'User id is required'],
    },
    productId: {
        type: Schema.Types.ObjectId,
        required: [true, 'Product id is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
    },
});

const Basket = model<IBasket>('basket', basketSchema);

export default Basket;
