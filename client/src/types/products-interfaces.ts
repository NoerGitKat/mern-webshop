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

export type { IProduct, IProductAction };
