export class Article {
  constructor(
    public title: string,
    public price: number,
    public image: string,
    public description: string,
    public quantity: number
  ) {
    this.title = title;
    this.price = price;
    this.image = image;
    this.description = description;
    this.quantity = quantity;
  }
}
