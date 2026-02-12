export type Product = {
  _id: string;
  title: string;
  price: number;
  imageUrl?: string | null;
  rating?: number | null;
  category?: string | null;
  stock?: number | null;
};

export type ProductsResponse = {
  items: Product[];
  total: number;
};
