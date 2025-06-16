type productType = "livestock" | "crop";

interface product {
  id: number;
  name: string;
  type: productType;
  status: "active" | "inactive";
}

export interface farmProduct {
  id: number;
  product: product;
  is_main_product: boolean;
}

export interface myFarm {
  id: number;
  farm_id: string;
  farm_type: string;
  type: string | null;
  name: string;
  location: string;
  region: number;
  district: string;
  size: number;
  size_metric: number;
  livestock_kept: string | null;
  has_access_to_market: boolean;
  irrigation: boolean;
  use_of_fertilizers: string[];
  farming_methods: string[];
  provide_training: boolean;
  government_ngo_support: boolean;
  specify_support: string | null;
  areas_of_assistance: string[];
  land_ownership: string;
  other_specification: string | null;
  created_by: number;
  date_created: string;
  products: farmProduct[];
}
