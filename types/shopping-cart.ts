export interface ShoppingCartItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  in_stock: number;
  parts_manufacturer: string;
  boiler_manufacturer: string;
  count: number;
  total_price: number;
  userId: number;
  partId: number;
}

export interface AddToCartFxProps {
  url: string;
  username: string;
  partId: number;
}

export interface UpdateCartItemFxProps {
  url: string;
  payload: {
    total_price?: number;
    count?: number;
  };
}

export interface CartItemCounterProps {
  totalCount: number;
  partId: number;
  initialCount: number;
  increasePrice: VoidFunction;
  decreasePrice: VoidFunction;
}
