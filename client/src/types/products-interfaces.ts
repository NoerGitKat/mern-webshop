interface IProduct {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

interface IProductAction {
  type: string;
  payload: IProduct[];
  error: Error;
}

interface IProductDetails {
  product: IProduct;
  loading: Boolean;
  error: any;
}

interface IProductList {
  products: IProduct[];
  loading: Boolean;
  error: any;
}

export type { IProduct, IProductAction, IProductDetails, IProductList };
