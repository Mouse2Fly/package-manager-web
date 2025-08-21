import axios from "axios";

const ChangeState = async(newStatus: string, packageID: number) => {

    try {
        
        //console.log(`Changing state of package ${packageID} to ${newStatus}`);
        
        const response = axios.put(`http://localhost:5009/package/status/${packageID}`, 
            {
                "newStatus": newStatus
            });

        return response;
    }
    catch (error) {
        console.error("Error changing package state:", error);
        if (axios.isAxiosError(error)) {
            return error.response;
        }
        return null;
    }
}

export default ChangeState;