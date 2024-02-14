export const apiRoute = {
    signIn: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signin`,
    becomeSeller: `${process.env.NEXT_PUBLIC_API_BASE_URL}/client/becomeSeller`,
    addProduct: `${process.env.NEXT_PUBLIC_API_BASE_URL}/seller/addProduct`,
    getProducts: `${process.env.NEXT_PUBLIC_API_BASE_URL}/seller/getProducts?pageNumber=1&limit=10`,
    removeProduct: `${process.env.NEXT_PUBLIC_API_BASE_URL}/seller/deleteProduct`,
    getProductList: `${process.env.NEXT_PUBLIC_API_BASE_URL}/client/getProducts?pageNumber=1&limit=10`,
    addToBasket: `${process.env.NEXT_PUBLIC_API_BASE_URL}/client/updateBasket`,
    basketCount: `${process.env.NEXT_PUBLIC_API_BASE_URL}/client/basketCount`,
    viewBasket: `${process.env.NEXT_PUBLIC_API_BASE_URL}/client/viewBasket`,
};
