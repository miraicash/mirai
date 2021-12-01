import React, { useState, useEffect } from "react";
import Metrics from "../components/Metrics/Metrics";
import SidebarDash from "../components/SidebarDash/SidebarDash";
import "../scss/Styles.scss";

function DashboardPage() {
    let [userData, setUserData] = useState({});
    let [dataRecieved, setDataRecieved] = useState(0);
    const [globalState, setGlobalState] = useState(0);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL || "http://localhost:3001"}/users/info`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((res) => {
                if (res.status === 200) return res;
                else throw new Error(res);
            })
            .then((res) => res.json())
            .then((json) => {
                setUserData(json);
                setDataRecieved(1);
            })
            .catch((error) => {
                console.error("Failed to get user data");
                setDataRecieved(2);
            });
    }, [globalState]);
    return (
        <>
            {dataRecieved === 1 ? (
                <div className="dashboard">
                    <SidebarDash data={userData.user} />
                    <Metrics data={userData} stateChanger={setGlobalState} />
                </div>
            ) : (
                <div>{dataRecieved === 0 ? "Loading..." : "Unauthorized access"}</div>
            )}
        </>
    );
}

export default DashboardPage;
