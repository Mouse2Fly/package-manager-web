import axios from "axios";

const CreatePackage = async(senderAddres: string, senderName: string, senderPhone: string,
                            recipientAddress: string, recipientName: string, recipientPhone: string) => {

    try {
        
        const response = axios.post(`http://localhost:5009/package`, 
            {
                "SenderAdress": senderAddres,
                "SenderName": senderName,
                "SenderPhone": senderPhone,
                "RecipientAdress": recipientAddress,
                "RecipientName": recipientName,
                "RecipientPhone": recipientPhone
            });

        return response;
    }
    catch (error) {
        console.error("Error creating package:", error);
        if (axios.isAxiosError(error)) {
            return error.response;
        }
        return null;
    }
}

export default CreatePackage;