import { IBlog } from '../interfaces/blog.interface';

export class Blog implements IBlog {
    constructor(
        public id: number,
        public title: string,
        public text: string,
        public count: number,
        public date: Date
    ){}
}
