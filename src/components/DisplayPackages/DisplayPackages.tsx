import "./DisplayPackages.css"
import OnePackage from "../OnePackage/OnePackage";
import { useState } from "react";

const DisplayPackages = () => {

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchOption, setSearchOption] = useState<boolean>(true);

    const handleSearchChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.match(/[a-zA-Z]/g)) {
            setSearchTerm("");
            return;
        }
        setSearchTerm(e.target.value);
        console.log("Search term changed to:", e.target.value);
    }

    const handleSearchChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchTerm(e.target.value)
        console.log("Search term changed to:", e.target.value);
    }

    const handleSearchOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.value === "trackingOption") {
            setSearchOption(true);
            setSearchTerm("");
        }
        else if(e.target.value === "statusOption") {
            setSearchOption(false);
            setSearchTerm("");
        }
        else{
            return;
        }
    }

    return (
        <div className='mainDisplay'>
            <div className="searchBarContainer">
                <select className="searchSelect" onChange={(e)=>handleSearchOptionChange(e)}>
                    <option value="trackingOption">Tracking Number</option>
                    <option value="statusOption">Status</option>
                </select>
                {searchOption ? (
                    <input value={searchTerm} onChange={(e)=>handleSearchChangeNumber(e)} type="text" className="searchBar" placeholder="Search packages..." />
                ) : (
                    <select defaultValue={""} value={searchTerm} onChange={(e)=>handleSearchChangeStatus(e)} className="searchBar">
                        <option hidden value=""></option>
                        <option value="created">Created</option>
                        <option value="sent">Sent</option>
                        <option value="returned">Returned</option>
                        <option value="accepted">Accepted</option>
                        <option value="canceled">Canceled</option>
                    </select>
                )}
                {/* <button className="searchButton">Search</button> */}
            </div>
            <div className="headerInfo">
                <h3 className="packageHeader numberHeader">Tracking number</h3>
                <h3 className="packageHeader">Sender address</h3>
                <h3 className="packageHeader">Receiver address</h3>
                <h3 className="packageHeader dateHeader">Creation date</h3>
                <h3 className="packageHeader">Current status</h3>
                <h3 className="packageHeader">Change status</h3>
            </div>
            <div className="packagesList">
                <OnePackage />
                <OnePackage />
                <OnePackage />
                <OnePackage />
                <OnePackage />
                <OnePackage />
                <OnePackage />
                <OnePackage />
                <OnePackage />
                <OnePackage />
                <OnePackage />
                <OnePackage />
                <OnePackage />
                <OnePackage />
                <OnePackage />
                <OnePackage />
                <OnePackage />
                <OnePackage />
                <OnePackage />
                <OnePackage />
            </div>   
        </div>
    )

}

export default DisplayPackages;