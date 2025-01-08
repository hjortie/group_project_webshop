export class Article {
  constructor(
    public title: string,
    public price: number,
    public image: string,
    public description: string,
    public quantity: number,
    public size: string
  ) {
    this.title = title;
    this.price = price;
    this.image = image;
    this.description = description;
    this.quantity = quantity;
    this.size = size;
  }
}
