import { useState } from "react";
import { useLocation } from "react-router-dom";
import QuaterlySales from "./QuaterlySales";
import SalesByCity from "./SalesByCity";
import SalesByRoute from "./SalesByRoute";
import WorkingHours from "./WorkingHours";

function AdminPage() {
  const [reportType, setReportType] = useState("0");
  const username = useLocation().state.username;
  console.log(username);
  return (
    <div>
      <h1>Admin Page. Welcome {username} </h1>
      <div className="col m-5">
        <select
          className="form-select align-center"
          id="validationCustom04"
          required
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="0" selected disabled>
            Choose the report type
          </option>
          <option value="1">Quaterly sales</option>
          <option value="2">Sales by the route</option>
          <option value="3">Sales by the city</option>
          <option value="4">Working hours</option>
        </select>
      </div>
      <div>
        {(() => {
          switch (reportType) {
            case "1":
              return <QuaterlySales />;
            case "2":
              return <SalesByRoute />;
            case "3":
              return <SalesByCity />;
            case "4":
              return <WorkingHours />;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}
export default AdminPage;
