export interface Product {
  _id?: string;
  productName: string;
  qty: number;
  status: boolean;
  totalBorrow: number;
  categoryID: string;
  imageUrl: string;
}
