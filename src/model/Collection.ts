export class Collection{
    constructor(
    private id: string,
    private title: string,
    private subtitle: string,
    private image?: string
    ){}

    getId(){
        return this.id;
    }

    getTitle(){
        return this.title;
    }

    getSubtitle(){
        return this.subtitle;
    }

    getImage(){
        return this.image;
    }

    setId(){
        return this.id;
    }

    setTitle(){
        return this.title;
    }

    setSubtitle(){
        return this.subtitle;
    }

    setImage(){
        return this.image;
    }

    static toCollectionModel(collection: any): Collection {
        return new Collection(collection.id, collection.title, collection.subtitle, collection.image);
    }
}

export interface CollectionInputDTO {
    title: string,
    subtitle: string,
    image?: string
}