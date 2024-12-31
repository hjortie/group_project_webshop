export class Article {
  constructor(
    public title: string,
    public price: number,
    public image: string,
    public description: string,
    public quantity: number,
    public isS: boolean,
    public isM: boolean,
    public isL: boolean
  ) {
    this.title = title;
    this.price = price;
    this.image = image;
    this.description = description;
    this.quantity = quantity;
    this.isS = isS;
    this.isM = isM;
    this.isL = isL;
  }
}
