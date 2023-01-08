import { useState } from "react";
import { useLocation } from "react-router-dom";
import Report1 from "./Report1";

function AdminPage() {
  const [reportType, setReportType] = useState("0");
  let username = useLocation().state.username;
  console.log(username);
  const [lastGeneratedReport, setLastGeneratedReport] = useState("-1");
  const generateReport = () => {
    setLastGeneratedReport(reportType);
    console.log(reportType);
  };
  return (
    <div>
      <h1>Admin Page. Welcome {username} </h1>
      <div class="col m-5">
        <select
          className="form-select align-center"
          id="validationCustom04"
          required
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="0" selected>
            Report 1
          </option>
          <option value="1">Report 2</option>
          <option value="2">Report 3</option>
        </select>
        <div class="col align-self-center m-3">
          <button
            className="btn btn-success"
            type="submit"
            onClick={generateReport}
          >
            Generate Report
          </button>
        </div>
      </div>
      <div>
        {(() => {
          switch (lastGeneratedReport) {
            case "0":
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
