import { useState } from "react";

function OrderPage() {
  const items = [
    { id: 1, name: "Bottle", price: 10 },
    { id: 2, name: "Pen", price: 5 },
    { id: 3, name: "Pencil", price: 2 },
  ];
  const [cart, setCart] = useState([]);
  const updateCart = (id, value) => {
    id = parseInt(id);
    const newCart = [];
    let isfound = false;
    for (const item of cart) {
      if (item.id == id) {
        item.quantity = value;
        isfound = true;
        if (value == 0) {
          continue;
        }
      }
      newCart.push(item);
    }
    if (!isfound) {
      newCart.push({ id: id, quantity: value });
    }
    console.log(newCart);
    setCart(newCart);
  };
  const placeOrder = () => {
    console.log("Order Placed");
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <table className="table table-hover">
        <thead className="thead light">
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
        </thead>
        <tbody>
          {items.map((item, key) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => updateCart(item.id, e.target.value)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <h1>Cart</h1>
        <table className="table table-hover">
          <thead className="thead light">
            <th>ID</th>
            <th>Qantity</th>
          </thead>
          <tbody>
            {cart.map((item, key) => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <button className="btn btn-success" onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}
export default OrderPage;
