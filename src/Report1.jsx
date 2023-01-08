import { useState, useEffect } from "react";
import Axios from "axios";
function Report1() {
  const [reportData, setReportData] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setReportData(response.data[0]);
      console.log(reportData);
    });
  }, []);
  return (
    <div>
      <h1>Report1</h1>
      <table className="table table-bordered table-hover">
        <thead className="thead light">
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Total Sales Price</th>
          </tr>
          {reportData.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.Product_ID}</td>
                <td>{val.Product_Name}</td>
                <td>{val.Quantity}</td>
                <td>{val.Total_Sales_Price}</td>
              </tr>
            );
          })}
        </thead>
      </table>
    </div>
  );
}
export default Report1;
