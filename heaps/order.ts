class Order {
    public name: string;
    public stocks: number;
    public price: number;
    public type: boolean; // false para las órdenes de venta y true para las órdenes de compra

    constructor(name: string, stocks: number, price: number, type: boolean){
        this.name = name;
        this.stocks = stocks;
        this.price = price;
        this.type = type;
    }
}

export default Order;
