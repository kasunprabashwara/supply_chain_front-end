import axios from "axios";
import { useEffect, useState } from "react";

function OrderPage() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/products").then((res) => {
      setItems(res.data);
    });
  }, []);

  const [cart, setCart] = useState([]);
  const updateCart = (product, value) => {
    const id = parseInt(product.Product_ID);
    const newCart = [];
    let isfound = false;
    for (const item of cart) {
      if (item.Product_ID == id) {
        item.quantity = value;
        isfound = true;
        if (parseInt(value) <= 0) {
          continue;
        }
      }
      newCart.push(item);
    }
    if (!isfound) {
      newCart.push({ ...product, quantity: value });
    }
    setCart(newCart);
  };
  const placeOrder = () => {
    axios.post("http://localhost:3001/placeOrder", cart).then((res) => {
      if (res) {
        alert("Order Placed Successfully");
      }
    });
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
              <tr key={item.Product_ID}>
                <td>{item.Product_ID}</td>
                <td>{item.Product_Name}</td>
                <td>{item.Price}</td>
                <td>{item.Capasity_consumption}</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => updateCart(item, e.target.value)}
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
            <th>Product Name</th>
            <th>Qantity</th>
          </thead>
          <tbody>
            {cart.map((item, key) => {
              return (
                <tr key={item.Product_ID}>
                  <td>{item.Product_ID}</td>
                  <td>{item.Product_Name}</td>
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
