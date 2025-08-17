import './OnePackage.css'
import { useState } from 'react';

const OnePackage = () => {

    const [stateMode, setStateMode] = useState<string>("created");
    
    const extraPackageInfo = () => {

        console.log("Extra package info clicked");
        const onePackageElements = document.querySelectorAll(".onePackage");
        onePackageElements.forEach((onePackage) => {
        onePackage.addEventListener("mousedown", () => {
            onePackage.classList.add("active");
        });

        onePackage.addEventListener("mouseup", () => {
            onePackage.classList.remove("active");
        });

        onePackage.addEventListener("mouseleave", () => {
            onePackage.classList.remove("active");
        });
    });
    }

    const changePackageStatus = () => {

        console.log("Change package status clicked");
        const statusButtons = document.querySelectorAll(".statusButton");

        statusButtons.forEach((button) => {
        button.addEventListener("mousedown", (event) => {
            event.stopPropagation(); // Prevent triggering the parent .onePackage
        });
    });
    }

    const changeStateText = () => {
        if (stateMode === "created") {
            return <p className="statusName statusCreated">Created</p>
        } else if (stateMode === "sent") {
            return <p className="statusName statusSentColor">Sent</p>
        } else if (stateMode === "accepted") {
            return <p className="statusName statusAcceptedColor">Accepted</p>
        } else if (stateMode === "returned") {
            return <p className="statusName statusReturnedColor">Returned</p>
        } else if (stateMode === "canceled") {
            return <p className="statusName statusCanceledColor">Canceled</p>
        } else {
            return <p className="statusName statusUnknownColor">Unknown</p>
        }
    }

    const stateModeHandler = () => {
        if (stateMode === "sent") {    
            return(
                <div className='onePackageBtns'>
                    <button className="statusButton statusAccepted" onClick={changePackageStatus}>Accept</button>
                    <button className="statusButton statusReturned" onClick={changePackageStatus}>Return</button>
                    <button className="statusButton statusCanceled" onClick={changePackageStatus}>Cancel</button>
                </div>
            )
        } else if (stateMode === "created" || stateMode === "returned") {
            return(
                <div className='onePackageBtns'>
                    <button className="statusButton statusSent" onClick={changePackageStatus}>Send</button>
                    <button className="statusButton statusCanceled" onClick={changePackageStatus}>Cancel</button>
                </div>
            )
        } else if (stateMode === "canceled" || stateMode === "accepted") {
            return(
                <div className='onePackageBtns'>
                    <p className='statusImpossible'>Not possible</p>
                </div>
            ) 
        } else{
            return(
                <div className='onePackageBtns'>
                    <p className='statusUnknown'>Unknown state</p>
                </div>
            )
        }
    }
    
    
    return (
        <div className="onePackage">
            <div className='onePackageLine' onClick={extraPackageInfo}>
                <p className="onePackageInfo packageID">123456</p>
                <p className="onePackageInfo senderInfo">Jonavos g. 5, Kaunas</p>
                <p className="onePackageInfo receiverInfo">Jonavos g. 6, Kaunas</p>
                <p className="onePackageInfo creationTimeBox">2025-08-18</p>
                <div className='onePackageInfo statusBox'>
                    {changeStateText()}
                </div>
            </div>
            {stateModeHandler()}
        </div>

    );
}   

export default OnePackage;