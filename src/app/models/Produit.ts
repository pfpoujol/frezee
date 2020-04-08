export interface Produit {
    code: string;
    brands: string;
    produitName: string;
    category?: string;
    qty: number;
    limitDate: Date;
}
