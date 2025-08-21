import './OnePackage.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PackageData {
    trackingNumber: number;
    creationDate: string;
    currentStatus: string[];
    recipientAdress: string;
    recipientName: string;
    recipientPhone: string;
    senderAdress: string;
    senderName: string;
    senderPhone: string;
    statusHistory: string[]
}

interface OnePackageProps {
    onePackageData: PackageData;
    showConfirmBox: () => void;
    packageIDState: (id: number) => void;
    statusState: (status: string) => void;
}

const OnePackage = ({ onePackageData, showConfirmBox, statusState, packageIDState }: OnePackageProps) => {

    const navigate = useNavigate();

    const [stateMode, setStateMode] = useState<string>("created");

    useEffect(() => {
        setStateMode(onePackageData.currentStatus[0].toLowerCase());
    }, [onePackageData]);
    

    const extraPackageInfo = () => {

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

        navigate("/inspect", { state: { onePackageData } });
    }

    interface ChangePackageStatusEvent extends React.MouseEvent<HTMLButtonElement> {
        target: HTMLButtonElement;
    }

    const changePackageStatus = (e: ChangePackageStatusEvent) => {

        const statusButtons = document.querySelectorAll<HTMLButtonElement>(".statusButton");

        statusButtons.forEach((button: HTMLButtonElement) => {
            button.addEventListener("mousedown", (event: MouseEvent) => {
                event.stopPropagation(); // Prevent triggering the parent .onePackage
            });
        });
        statusState(e.target.value);
        packageIDState(onePackageData.trackingNumber);
        showConfirmBox();
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
                    <button value={"Accepted"} className="statusButton statusAccepted" onClick={changePackageStatus}>Accepted</button>
                    <button value={"Returned"} className="statusButton statusReturned" onClick={changePackageStatus}>Returned</button>
                    <button value={"Canceled"} className="statusButton statusCanceled" onClick={changePackageStatus}>Canceled</button>
                </div>
            )
        } else if (stateMode === "created" || stateMode === "returned") {
            return(
                <div className='onePackageBtns'>
                    <button value={"Sent"} className="statusButton statusSent" onClick={changePackageStatus}>Sent</button>
                    <button value={"Canceled"} className="statusButton statusCanceled" onClick={changePackageStatus}>Canceled</button>
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
                <p className="onePackageInfo packageID">{onePackageData.trackingNumber}</p>
                <p className="onePackageInfo senderInfo">{onePackageData.senderAdress}</p>
                <p className="onePackageInfo receiverInfo">{onePackageData.recipientAdress}</p>
                <p className="onePackageInfo creationTimeBox">{onePackageData.creationDate.substring(0, 10)}</p>
                <div className='onePackageInfo statusBox'>
                    {changeStateText()}
                </div>
            </div>
            {stateModeHandler()}
        </div>

    );
}   

export default OnePackage;
export type { PackageData };