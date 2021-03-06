export interface IBook {
    id?: string;
    volumeInfo?: IBookdetails;
    saleInfo?: IBookPriceDetails;
}

export interface IBookdetails {
    title?: string;
    subtitle?: string;
    authors?: string;
    publisher?: string;
    publishedDate?: string;
    description?: string;
    imageLinks?: string;
}

export interface IBookPriceDetails {
    listPrice?: string;
    country?: string;
}
