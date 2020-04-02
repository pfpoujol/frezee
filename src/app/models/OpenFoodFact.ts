export interface OpenFoodFact {
    product: Product;
    code: string;
    status: number;
    status_verbose: string;
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
