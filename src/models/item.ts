export default class Item {
  itemId: number;
  name: string;
  price: number;
  nature: string;

  constructor(
    itemId: number = 0,
    name: string = "",
    price: number = 0,
    nature: string = ""
  ) {
    this.itemId = itemId;
    this.name = name;
    this.price = price;
    this.nature = nature;
  }
}
