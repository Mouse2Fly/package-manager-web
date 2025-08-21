import "./InspectPackages.css"
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ChangeState from '../../services/ChangeState';
import type { PackageData } from "../OnePackage/OnePackage";

const InspectPackages = () => {

    const data = useLocation().state?.onePackageData;

    const [prepedData, setPrepedData] = useState<PackageData>()
    const [newStatus, setNewStatus] = useState<string>("");
    const [packageID, setPackageID] = useState<number>(0);
    const [creationDate, setCreationDate] = useState<Date>()

    useEffect(()=>{
        const dateArray:Date = new Date(data.creationDate);
        setCreationDate(dateArray);
        setPrepedData(data)
    }, [data])
    
    const statusAPI = async (newStatus: string, packageID: number) => {
        const response = await ChangeState(newStatus, packageID);

        if (response && response.status === 200) {
            //console.log("Response from ChangeState:", response);
            setPrepedData(response?.data)
        } else {
            return;
        }
    };

    const stateModeHandler = () => {
        if (!prepedData) return null;

        if (prepedData.currentStatus?.[0].toLowerCase() === "sent") {
        return (
            <div className="detailPackageBtns">
            <button value={"Accepted"} className="statusButton statusAccepted detailButton" onClick={changePackageStatus}>Accepted</button>
            <button value={"Returned"} className="statusButton statusReturned detailButton" onClick={changePackageStatus}>Returned</button>
            <button value={"Canceled"} className="statusButton statusCanceled detailButton" onClick={changePackageStatus}>Canceled</button>
            </div>
        );
        } else if (prepedData.currentStatus?.[0].toLowerCase() === "created" || prepedData.currentStatus?.[0].toLowerCase() === "returned") {
        return (
            <div className="detailPackageBtns">
            <button value={"Sent"} className="statusButton statusSent detailButton" onClick={changePackageStatus}>Sent</button>
            <button value={"Canceled"} className="statusButton statusCanceled detailButton" onClick={changePackageStatus}>Canceled</button>
            </div>
        );
        } else if (prepedData.currentStatus?.[0].toLowerCase() === "canceled" || prepedData.currentStatus?.[0].toLowerCase() === "accepted") {
        return (
            <div className="detailPackageBtns">
            <p className="statusImpossible">Not possible</p>
            </div>
        );
        } else {
        return (
            <div className="detailPackageBtns">
            <p className="statusUnknown">Unknown state</p>
            </div>
        );
        }
    };

    const handleConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const confirm = e.currentTarget.value === "true";
        const confirmBox = document.querySelector(".confirmBox3");
        confirmBox!.classList.add("hideConfirmBox");

        if (confirm) {
        statusAPI(newStatus, packageID);
        }
    };

    const changePackageStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
        const statusButtons = document.querySelectorAll<HTMLButtonElement>(".statusButton");
        statusButtons.forEach((button: HTMLButtonElement) => {
        button.addEventListener("mousedown", (event: MouseEvent) => {
            event.stopPropagation();
        });
        });
        setNewStatus((e.target as HTMLButtonElement).value);
        setPackageID(prepedData!.trackingNumber);
        showConfirmBox();
    };

    const showConfirmBox = () => {
        const confirmBox = document.querySelector(".confirmBox3");
        confirmBox!.classList.remove("hideConfirmBox");
    };

    const buildHistory = (arr?: string[]) => {
        if (!arr || !Array.isArray(arr) || arr.length === 0) return [];
        const out: { status: string; time: string }[] = [];
        for (let i = 0; i < arr.length; i += 2) {
        const status = arr[i] ?? "";
        const time = arr[i + 1] ?? "";
        out.push({ status, time });
        }
        return out;
    };

    const history = buildHistory(prepedData?.statusHistory);
    const lastIndex = history.length - 1;

    const statusClass = (status: string) => {
        if (!status) return "unknown";
        const s = status.toLowerCase().trim();
        if (s.includes("sent")) return "sent";
        if (s.includes("returned")) return "returned";
        if (s.includes("created")) return "created";
        if (s.includes("canceled")) return "canceled";
        if (s.includes("accepted")) return "accepted";
        return "unknown";
    };

    const formatTime = (timeStr?: string): string => {
        if (!timeStr) {
            return "";
        }
        try {

            const d = new Date(timeStr);
            if (isNaN(d.getTime())) {
                const alt = timeStr.replace(" ", "T");
                const d2 = new Date(alt);
                if (!isNaN(d2.getTime())) {
                    return d2.toLocaleString();
                }
                return timeStr;
            }
            return d.toLocaleString();
        } catch (err) {
            console.error(err)
            return timeStr;
        }
    };

  return (
    <div className="inspectPackages">
      <div className="confirmBox3 hideConfirmBox">
        <div className="confirmTextBox">
          <h3 className="confirmText">Are you sure?</h3>
          <div className="choiceBtns">
            <button value={"true"} onClick={handleConfirm} className="confirmBtn">Yes</button>
            <button value={"false"} onClick={handleConfirm} className="cancelBtn">No</button>
          </div>
        </div>
      </div>

      <div className="packageDetails">

        <div className="packageDetailsBox topDetailsBox">
            <h3 className="packageDetailsText">Tracking Number:</h3>
            <hr></hr>
            <p className="packageDetailsText">{prepedData?.trackingNumber ?? ""}</p>
        </div>
        <div className="packageDetailsBox topDetailsBox hideDetailsBox">
            <h3></h3>
            <hr></hr>
            <p></p>
        </div>

        <div className="packageDetailsBox topDetailsBox">
            <h3 className="packageDetailsText">Creation Date:</h3>
            <hr></hr>
            <p className="packageDetailsText">{creationDate?.toLocaleString() ?? ""}</p>
        </div>

        <div className="packageDetailsBox middleDetailsBox">
            <h3 className="packageDetailsText">Sender's Name:</h3>
            <hr></hr>
            <p className="packageDetailsText">{prepedData?.senderName ?? ""}</p>
        </div>

        <div className="packageDetailsBox middleDetailsBox">
            <h3 className="packageDetailsText">Sender's Address:</h3>
            <hr></hr>
            <p className="packageDetailsText">{prepedData?.senderAdress ?? ""}</p>
        </div>

        <div className="packageDetailsBox middleDetailsBox">
            <h3 className="packageDetailsText">Sender's Phone:</h3>
            <hr></hr>
            <p className="packageDetailsText">{prepedData?.senderPhone ?? ""}</p>
        </div>

        <div className="packageDetailsBox bottomDetailsBox">
            <h3 className="packageDetailsText">Receiver's Name:</h3>
            <hr></hr>
            <p className="packageDetailsText">{prepedData?.recipientName ?? ""}</p>
        </div>

        <div className="packageDetailsBox bottomDetailsBox">
            <h3 className="packageDetailsText">Receiver's Address:</h3>
            <hr></hr>
            <p className="packageDetailsText">{prepedData?.recipientAdress ?? ""}</p>
        </div>

        <div className="packageDetailsBox bottomDetailsBox">
            <h3 className="packageDetailsText">Receiver's Phone:</h3>
            <hr></hr>
            <p className="packageDetailsText">{prepedData?.recipientPhone ?? ""}</p>
        </div>

      </div>
      <div className="statusTimeline" aria-label="Status timeline">
        {history.length === 0 ? (
          <p className="noHistory">No status history available</p>
        ) : (
          <ul className="timeline">
            {history.map((item, idx) => (
              <li key={idx} className={`timeline-item ${idx === lastIndex ? "active" : ""}`}>
                <div className="timeline-marker">
                  <span className={`statusBadge ${statusClass(item.status)}`}>{item.status}</span>
                </div>
                <div className="timeline-content">
                  <div className="timeline-time" title={item.time}>
                    {formatTime(item.time)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {stateModeHandler()}
    </div>
  );
}
export default InspectPackages;