// addresses
export * from './address/get-address-by-id'
export * from './address/update-address'
export * from './address/create-address'

// clients
export * from './clients/create-client';

// products
export * from './products/create-product';
export * from './products/get-product-by-slug';
export * from './products/get-product-by-id';
export * from './products/get-product-by-model';
export * from './products/update-product';
export * from './products/get-all-products';

// kits
export * from './kits/create-kit';
export * from './kits/get-all-kits';

// products kits
export * from './product-kit/get-product-kit-by-id';

// quotes
export * from './quotes/create-quote'
export * from './quotes/get-quote-by-id'
export * from './quotes/get-all-quotes'
export * from './quotes/cancel-quote'
export * from './quotes/edit-quote'

// quote details
export * from './quotes-details/create-quote-details';
export * from './quotes-details/get-all-details-by-quote-id'
export * from './quotes-details/edit-quote-details'

// technicians
export * from './technicians/create-technician';
export * from './technicians/get-all-technicians';
export * from './technicians/get-technician-by-id';
export * from './technicians/get-technicians-stats';
export * from './technicians/get-technician-stats-by-id';
export * from './technicians/update-technician';
export * from './technicians/desactivate-technician';
export * from './technicians/activate-technician';
export * from './technicians/get-active-technicians';