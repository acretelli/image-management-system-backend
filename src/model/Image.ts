export class Image{
    constructor(
    private id: string,
    private subtitle: string,
    private author: string,
    private date: Date,
    private file: string,
    private tags: string[]
    ){}

    getId(){
        return this.id;
    }

    getSubtitle(){
        return this.subtitle;
    }

    getAuthor(){
        return this.author;
    }

    getDate(){
        return this.date;
    }

    getFile(){
        return this.file;
    }

    getTags(){
        return this.tags;
    }

    setId(){
        return this.id;
    }

    setSubtitle(){
        return this.subtitle;
    }

    setAuthor(){
        return this.author;
    }

    setDate(){
        return this.date;
    }

    setFile(){
        return this.file;
    }

    setTags(){
        return this.tags;
    }

    static toImageModel(image: any): Image {
        return new Image(image.id, image.subtitle, image.author, image.date, image.file, image.tags);
    }
}

export interface ImageInputDTO {
    subtitle: string,
    date: Date,
    file: string,
    tags: string[]
}

export interface SearchImageDTO {
    subtitle: string,
    tag: string,
    orderBy: string,
    orderType: string,
    page: number
}
