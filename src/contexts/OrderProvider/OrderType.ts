export interface OrderType {
  id: number;
  admin_graphql_api_id: string;
  app_id: number;
  browser_ip: string;
  buyer_accepts_marketing: boolean;
  cancel_reason: null;
  cancelled_at: null;
  cart_token: null;
  checkout_id: number;
  checkout_token: string;
  client_details: ClientDetails;
  closed_at: Date;
  company: null;
  confirmation_number: string;
  confirmed: boolean;
  contact_email: string;
  created_at: Date;
  currency: Currency;
  current_subtotal_price: string;
  current_subtotal_price_set: Set;
  current_total_additional_fees_set: null;
  current_total_discounts: string;
  current_total_discounts_set: Set;
  current_total_duties_set: null;
  current_total_price: string;
  current_total_price_set: Set;
  current_total_tax: string;
  current_total_tax_set: Set;
  customer_locale: string;
  device_id: null;
  discount_codes: any[];
  email: string;
  estimated_taxes: boolean;
  financial_status: string;
  fulfillment_status: FulfillmentStatus;
  landing_site: null;
  landing_site_ref: null;
  location_id: null;
  merchant_of_record_app_id: null;
  name: string;
  note: null;
  note_attributes: any[];
  number: number;
  order_number: number;
  order_status_url: string;
  original_total_additional_fees_set: null;
  original_total_duties_set: null;
  payment_gateway_names: PaymentGatewayName[];
  phone: null;
  po_number: null;
  presentment_currency: Currency;
  processed_at: Date;
  reference: string;
  referring_site: null;
  source_identifier: string;
  source_name: string;
  source_url: null;
  subtotal_price: string;
  subtotal_price_set: Set;
  tags: string;
  tax_exempt: boolean;
  tax_lines: TaxLine[];
  taxes_included: boolean;
  test: boolean;
  token: string;
  total_discounts: string;
  total_discounts_set: Set;
  total_line_items_price: string;
  total_line_items_price_set: Set;
  total_outstanding: string;
  total_price: string;
  total_price_set: Set;
  total_shipping_price_set: Set;
  total_tax: string;
  total_tax_set: Set;
  total_tip_received: string;
  total_weight: number;
  updated_at: Date;
  user_id: number;
  billing_address: Address;
  customer: Customer;
  discount_applications: any[];
  fulfillments: Fulfillment[];
  line_items: LineItem[];
  payment_terms: PaymentTerms;
  refunds: any[];
  shipping_address: Address;
  shipping_lines: any[];
}

export interface Address {
  first_name: string;
  address1: string;
  phone: string;
  city: string;
  zip: string;
  province: string;
  country: string;
  last_name: string;
  address2: string;
  company: null | string;
  latitude?: number | null;
  longitude?: number | null;
  name: string;
  country_code: string;
  province_code: string;
  id?: number;
  customer_id?: number;
  country_name?: string;
  default?: boolean;
}

export interface ClientDetails {
  accept_language: null;
  browser_height: null;
  browser_ip: string;
  browser_width: null;
  session_hash: null;
  user_agent: string;
}

export enum Currency {
  Brl = 'BRL',
}

export interface Set {
  shop_money: Money;
  presentment_money: Money;
}

export interface Money {
  amount: string;
  currency_code: Currency;
}

export interface Customer {
  id: number;
  email: string;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  last_name: string;
  state: string;
  note: null;
  verified_email: boolean;
  multipass_identifier: null;
  tax_exempt: boolean;
  phone: null;
  email_marketing_consent: EmailMarketingConsent;
  sms_marketing_consent: null;
  tags: string;
  currency: Currency;
  tax_exemptions: any[];
  admin_graphql_api_id: string;
  default_address: Address;
}

export interface EmailMarketingConsent {
  state: string;
  opt_in_level: string;
  consent_updated_at: null;
}

export enum FulfillmentStatus {
  Fulfilled = 'fulfilled',
}

export interface Fulfillment {
  id: number;
  admin_graphql_api_id: string;
  created_at: Date;
  location_id: number;
  name: string;
  order_id: number;
  origin_address: OriginAddress;
  receipt: OriginAddress;
  service: PaymentGatewayName;
  shipment_status: null;
  status: string;
  tracking_company: string;
  tracking_number: string;
  tracking_numbers: string[];
  tracking_url: string;
  tracking_urls: string[];
  updated_at: Date;
  line_items: LineItem[];
}

export interface LineItem {
  id: number;
  admin_graphql_api_id: string;
  current_quantity: number;
  fulfillable_quantity: number;
  fulfillment_service: PaymentGatewayName;
  fulfillment_status: FulfillmentStatus;
  gift_card: boolean;
  grams: number;
  name: string;
  price: string;
  price_set: Set;
  product_exists: boolean;
  product_id: number;
  properties: any[];
  quantity: number;
  requires_shipping: boolean;
  sku: string;
  taxable: boolean;
  title: string;
  total_discount: string;
  total_discount_set: Set;
  variant_id: number;
  variant_inventory_management: null;
  variant_title: null | string;
  vendor: Vendor;
  tax_lines: TaxLine[];
  duties: any[];
  discount_allocations: any[];
}

export enum PaymentGatewayName {
  Manual = 'manual',
}

export interface TaxLine {
  channel_liable: boolean;
  price: string;
  price_set: Set;
  rate: number;
  title: Title;
}

export enum Title {
  Vat = 'VAT',
}

export enum Vendor {
  Send4Avaliação = 'Send4 Avaliação',
}

export interface OriginAddress {}

export interface PaymentTerms {
  id: number;
  created_at: Date;
  due_in_days: null;
  payment_schedules: PaymentSchedule[];
  payment_terms_name: string;
  payment_terms_type: string;
  updated_at: Date;
}

export interface PaymentSchedule {
  id: number;
  amount: string;
  currency: Currency;
  issued_at: null;
  due_at: null;
  completed_at: Date;
  created_at: Date;
  updated_at: Date;
}
