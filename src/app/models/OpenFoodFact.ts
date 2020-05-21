export interface OpenFoodFact {
    product: Product;
    code: string;
    status: 0 | 1;
    status_verbose: 'product found' | 'product not found';
}
interface Product {
    code: string;
    brands: string;
    product_name: string;
    product_name_fr: string;
    product_quantity: string;
    categories: string;
    quantity: string;
    image_url: string;
    categories_hierarchy: Array<string>;
}
