export class AptareRestEntidade {
    constructor(
        public name: String,
        public selectedFields: string[],
        public juncoes: string[],
        public order: string[],
        public filterJson: string        
    ){}
}
