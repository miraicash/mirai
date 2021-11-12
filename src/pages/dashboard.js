import React from "react";
import Metrics from "../components/Metrics/Metrics";
import SidebarDash from "../components/SidebarDash/SidebarDash";
import "../scss/Styles.scss";

function DashboardPage() {
    return (
        <div className="dashboard">
            <SidebarDash />
            <Metrics />
        </div>
    );
}

export default DashboardPage;
