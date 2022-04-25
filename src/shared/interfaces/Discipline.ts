import Category from "./Category"

export default interface Discipline {
    name: string;
    categories: Category[];
    open?: boolean;
}