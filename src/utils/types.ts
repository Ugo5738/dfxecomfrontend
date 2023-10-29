import { MutableRefObject } from "react";

export interface RegisterPayloadType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  profile: {
    country: string;
  };
}

export interface LoginPayloadType {
  email: string;
  password: string;
}

export interface SignUpFormType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  phone: string;
}

export interface LoginFormType {
  email: string;
  password: string;
}

export interface CheckoutType {
  cvv: number;
  email: string;
  card_number: number;
  expiry_date: string;
  promo_code?: string;
}

export type ColorObject = Record<string, Record<string, string>>;

export interface InventoryType {
  id: number;
  name: string;
  image: string;
}

export interface ShopCategoriesType {
  id: number;
  name: string;
  sample_product: {
    id: number;
    name: string;
    image: string;
  };
}

export interface ProductResultType {
  sku: string;
  product_name: string;
  store_price: string;
  sale_price?: string;
  discount_store_price?: string;
  default_image: string;
  condition: string;
}

export interface ProductType {
  count: number;
  next: string;
  previous: string;
  results: ProductResultType[];
}

export interface ParamsType {
  category?: string;
  search?: string;
  product_name?: string;
  brand_name?: string;
  color?: string;
  storage?: string;
  attribute?: string;
  price_min?: string;
  price_max?: string;
  condition?: "new" | "used" | "";
  page?: number;
  page_size?: number;
}

export interface ParentRefType extends MutableRefObject<null> {
  scrollWidth: number;
  clientWidth: number;
  scrollLeft: number;
}

export interface ErrorPropsType extends Error {
  statusText: string;
  data: string;
  message: string;
  status: number;
  error?: Record<string, string>;
}

export interface SearchProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export interface ProductDetailType {
  attribute_values: Record<string, string>;
  brand_name: string;
  color_name?: string;
  storage_size?: string;
  banner_image?: string;
  shipping?: boolean;
  onsite_pickup?: boolean;
  condition: string;
  discount_store_price: string;
  images: {
    alt_text: string | null;
    image: string;
    is_feature: boolean;
  }[];
  is_active: boolean;
  is_default: boolean;
  name: string | null;
  product_details: {
    category: number[];
    description: string;
    formatted_description?: string[];
    name: string;
    slug: string;
    web_id: string;
  };
  product_type: number;
  sale_price: string;
  seo_feature: string | null;
  sku: string;
  store_price: string;
  upc: string;
  updated_at: string;
  variants: Record<
    string,
    {
      available_storage: Record<string, string>;
      hex_code: string;
    }
  >;
  weight: number | null;
}

export interface UserType {
  accepts_newsletters: boolean;
  accepts_terms_and_conditions: boolean;
  created_at: string;
  date_joined: string;
  email: string;
  email_verified: boolean;
  first_name: string;
  full_name: string;
  id: number;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: string | null;
  last_name: string;
  phone: string;
  referral_code: string;
  updated_at: string;
  username: string | null;
}

export interface OrderType {
  id: number;
  ordered: boolean;
  quantity: number;
  product: ProductResultType;
}

export interface OrderSummaryType {
  address: string | null;
  coupon: string | null;
  id: number;
  ordered: boolean;
  ordered_date: string | null;
  payment: string | null;
  products: OrderType[];
  start_date: string;
  sub_total: number;
  total: number;
  user: number;
}

export interface ColorsType {
  bg: {
    main: string;
    light: string;
    dark: string;
    nav: string;
    opaque: string;
    blue: string;
  };
  brand: {
    main: string;
    light: string;
    dark: string;
    orange: string;
  };
  typography: {
    dark: string;
    red: string;
    ash: string;
  };
  shadow: {
    main: string;
  };
}

export interface BrandType {
  count: number;
  next: string;
  previous: string | null;
  results: {
    id: number;
    name: string;
  }[];
}

export interface CategoryTypeChildren {
  id: number;
  name: string;
  is_active: boolean;
  is_trending: boolean;
  children?: CategoryTypeChildren[];
}

export interface CategoryType {
  id: number;
  name: string;
  is_active: boolean;
  is_trending: boolean;
  children: CategoryTypeChildren[];
}
