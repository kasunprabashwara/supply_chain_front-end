import { useState } from "react";
import { useLocation } from "react-router-dom";
import Report1 from "./Report1";

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
            Choose
          </option>
          <option value="1">Quaterly Sales</option>
          <option value="2">Report 3</option>
        </select>
      </div>
      <div>
        {(() => {
          switch (reportType) {
            case "1":
              return <Report1 />;
            // case "1":
            //     return <Report2/>
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}
export default AdminPage;
