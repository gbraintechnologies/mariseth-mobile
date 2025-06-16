type region = {
  code: string;
  id: number;
  name: string;
};

type district = {
  id: number;
  name: string;
};

type createdBy = {
  avatar: string | null;
  date_created: string;
  email: string;
  first_name: string;
  gender: string;
  id: number;
  last_name: string;
  phone_number: string;
  user_type: string;
  username: string;
};

type supportAssistance = {
  areas_of_needed_assistance: string;
  has_received_support: boolean;
};

type leadershipExperience = {
  farming_type: string;
  has_farming_membership: boolean;
  has_received_farming_leadership_training: boolean;
  is_mentoring_other_farmers: boolean;
};

type farm = {
  areas_of_assistance: any[]; // Replace 'any' with specific type if available
  created_by: any[]; // Replace if known
  crops: any[]; // Replace if known
  date_created: string;
  district: any[]; // Replace if known
  farm_id: string;
  farm_type: string;
  farmer: any[] | null; // For lead farmer, this can be null
  farming_methods: any[];
  government_ngo_support: boolean;
  has_access_to_market: boolean;
  id: number;
  irrigation: boolean;
  land_ownership: string;
  livestock: any[];
  livestock_kept: string | null;
  location: string;
  name: string;
  other_specification: string | null;
  provide_training: boolean;
  region: any[]; // Replace if known
  size: number;
  size_metric: string | null | object;
  specify_support: string | null;
  type: string | null;
  use_of_fertilizers: any[];
};

type smallFarmer = {
  access_token: string;
  email: string;
  farmer: {
    address: string;
    country: string;
    created_by: createdBy;
    date_created: string;
    date_of_birth: string;
    district: district;
    email: string;
    farm: farm;
    farmer_id: string;
    first_name: string;
    gender: string;
    id: number;
    id_number: string;
    id_type: string;
    last_name: string;
    lead_farmer: {
      first_name: string;
      id: number;
      last_name: string;
      type: "lead";
    };
    leadership_experience: null;
    other_names: string;
    phone_number: string;
    region: region;
    support_assistance: supportAssistance;
    type: "smallholder";
    village: string;
  };
  first_name: string;
  id: number;
  is_verified: boolean;
  last_name: string;
  phone_number: string;
  refresh_token: string;
  status: string;
  user_type: string;
};

type leadFarmer = {
  access_token: string;
  email: string;
  farmer: {
    address: string;
    country: string;
    created_by: createdBy;
    date_created: string;
    date_of_birth: string;
    district: district;
    email: string;
    farm: farm;
    farmer_id: string;
    first_name: string;
    gender: string;
    id: number;
    id_number: string;
    id_type: string;
    last_name: string;
    lead_farmer: null;
    leadership_experience: leadershipExperience;
    other_names: string;
    phone_number: string;
    region: region;
    support_assistance: supportAssistance;
    type: "lead";
    village: string;
  };
  first_name: string;
  id: number;
  is_verified: boolean;
  last_name: string;
  phone_number: string;
  refresh_token: string;
  status: string;
  user_type: string;
};

export type user = smallFarmer | leadFarmer;
