import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "./layout";

function OrderPage() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(0);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(0);
  const customer = useLocation().state.username;
  const customerID = useLocation().state.customerID;

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_DOMAIN_NAME+"/products")
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get(process.env.REACT_APP_DOMAIN_NAME+"/stores")
      .then((res) => {
        console.log(res.data);
        setStores(res.data);
      });
  }, []);
  useEffect(() => {
    axios
      .post(process.env.REACT_APP_DOMAIN_NAME+"/routes", {
        Store_ID: selectedStore,
      })
      .then((res) => {
        console.log(res.data);
        setRoutes(res.data);
      });
  }, [selectedStore]);

  // this function will be called when the user changes the quantity of an item in the cart
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

  // this function will be called when the user clicks on the place order button
  const placeOrder = () => {
    axios
      .post(process.env.REACT_APP_DOMAIN_NAME+"/addorder", {
        order: { customerID: customerID, routeID: selectedRoute },
        items: cart,
      })
      .then((res) => {
        if (res) {
          console.log(res.data);
          alert("Order Successfuly Placed");
        }
      });
  };

  return (
    <Layout>
    <div className="container">
      <div className="row">
        <div className="col-8">
          <h1>Welcome {customer}</h1>
          <h2>Item List</h2>
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
                        min="0"
                        placeholder="0"
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
            <button
              className="btn btn-success"
              onClick={placeOrder}
              disabled={(() => {
                if (selectedRoute && cart.length > 0) {
                  return false;
                } else {
                  return true;
                }
              })()}
            >
              Place Order
            </button>
          </div>
        </div>
        <div className="col-4">
          <label>
            <h5>Select Store</h5>
            <select
              className="form-select m-3"
              id="store"
              required
              onChange={(e) => setSelectedStore(e.target.value)}
            >
              <option key="0" selected disabled>
                Choose the store
              </option>
              {stores.map((store, key) => {
                return (
                  <option key={store.Store_ID} value={store.Store_ID}>
                    {store.City}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            <h5>Select Route</h5>
            <select
              className="form-select m-3"
              id="route"
              required
              onChange={(e) => setSelectedRoute(e.target.value)}
            >
              {routes.map((route, key) => {
                return (
                  <option key={route.Route_ID} value={route.Route_ID}>
                    {route.Route_ID}
                  </option>
                );
              })}
            </select>
          </label>
          <div>
            <h3>Cart</h3>
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
        </div>
      </div>
    </div>
    </Layout>
  );
}
export default OrderPage;
