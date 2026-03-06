export class ProductModel {
    _id!:string;
    image!: string;
    title!: string;
    price!: number;
    oldPrice!: number;
    credit!: number;
    description!: string;
    calculatedRating!: number;
    advantages!: string;
    disadvatages!: string;
    categories!: string[];
    tags!: string;
    characteristics!: Record<string, string>
}
