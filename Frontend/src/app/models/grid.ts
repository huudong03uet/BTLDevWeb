import { Pen } from "./pen";
import { User } from "./user";

export interface Grid {
    pen: Pen;
    user: User;
    likes: number;
    comments: number;
    views: number
}