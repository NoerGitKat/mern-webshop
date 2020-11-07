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
  qty?: number;
}

interface IProductAction {
  type: string;
  payload: IProduct[] | string;
  error: Error;
}

interface IProductDetails {
  product: IProduct;
  loading: boolean;
  error: any;
}

interface IProductList {
  products: IProduct[];
  loading: boolean;
  error: any;
}

export type { IProduct, IProductAction, IProductDetails, IProductList };
