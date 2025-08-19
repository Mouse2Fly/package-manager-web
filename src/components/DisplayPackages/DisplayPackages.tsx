import "./DisplayPackages.css"
import OnePackage from "../OnePackage/OnePackage";
import { useEffect, useState } from "react";
import type { PackageData } from "../OnePackage/OnePackage";

interface DisplayPackagesProps {
    packageSent?: PackageData[];
    fetchFunc?: () => void;
}

const DisplayPackages = ({ packageSent, fetchFunc }: DisplayPackagesProps) => {

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchOption, setSearchOption] = useState<boolean>(true);
    const [fileteredPackages, setFilteredPackages] = useState<PackageData[]>();

    useEffect(() => {
        setFilteredPackages(packageSent);
    }, [packageSent]);

    const handleSearchChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.match(/[a-zA-Z]/g)) {
            return;
        }
        setSearchTerm(e.target.value);
        const filtered = packageSent?.filter((onePackage) => {
            return onePackage.trackingNumber.toString().startsWith(e.target.value);
        });
        setFilteredPackages(filtered);
        if (e.target.value === "") {
            setFilteredPackages(packageSent);
        } 
    }

    const handleSearchChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchTerm(e.target.value)
        const filtered = packageSent?.filter((onePackage) => {
            return onePackage.currentStatus[0].toLowerCase() === e.target.value.toLowerCase();
        });
        setFilteredPackages(filtered);
        if (e.target.value === "") {
            setFilteredPackages(packageSent);
        }   
    }

    const handleSearchOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.value === "trackingOption") {
            setSearchOption(true);
            setSearchTerm("");
            setFilteredPackages(packageSent);
        }
        else if(e.target.value === "statusOption") {
            setSearchOption(false);
            setSearchTerm("");
            setFilteredPackages(packageSent);
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
                {
                    (fileteredPackages ?? []).map((onePackage: PackageData, i) => (
                        <OnePackage key={i} onePackageData={onePackage} fetchFunc={fetchFunc ?? (() => {})}/>
                    ))
                }
            </div>   
        </div>
    )

}

export default DisplayPackages;