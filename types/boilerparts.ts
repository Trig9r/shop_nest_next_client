export interface BoilerPartProps {
  id: number;
  boiler_manufacturer: string;
  price: number;
  parts_manufacturer: string;
  vendor_code: string;
  name: string;
  description: string;
  images: string;
  in_stock: string;
  bestsellers: boolean;
  new: boolean;
  popularity: number;
  compatibility: string;
}

export interface BoilerPartsProps {
  count: number;
  rows: BoilerPartProps[];
}
