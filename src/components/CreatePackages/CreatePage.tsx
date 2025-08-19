import "./CreatePage.css"
import { useState, useEffect } from "react";
import CreatePackage from "../../services/CreatePackage";

const CreatePage = () => {
    const [senderAddress, setSenderAddress] = useState<string>("");
    const [senderName, setSenderName] = useState<string>("");
    const [senderPhone, setSenderPhone] = useState<string>("");
    const [recipientAddress, setRecipientAddress] = useState<string>("");
    const [recipientName, setRecipientName] = useState<string>("");
    const [recipientPhone, setRecipientPhone] = useState<string>("");

    const pageStart = () => {
        const contextBox = document.querySelector(".contextbox");
        contextBox!.classList.add("hideHole");
        const contextText = document.querySelector(".contextText");
        contextText!.textContent = "";
        setSenderAddress("");
        setSenderName("");
        setSenderPhone("");
        setRecipientAddress("");
        setRecipientName("");
        setRecipientPhone("");
    }

    useEffect(() => {
        pageStart();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        switch (name) {
            case "senderName":
                setSenderName(value);
                break;
            case "senderAddress":
                setSenderAddress(value);
                break;
            case "senderPhone":
                setSenderPhone(value);
                break;
            case "recipientName":
                setRecipientName(value);
                break;
            case "recipientAddress":
                setRecipientAddress(value);
                break;
            case "recipientPhone":
                setRecipientPhone(value);
                break;
            default:
                break;
        }
    };

    const handleCreatePackage = async () => {

        if (!senderAddress || !senderName || !senderPhone || !recipientAddress || !recipientName || !recipientPhone) {
            const contextBox = document.querySelector(".contextbox");
            contextBox!.classList.remove("hideHole");
            document.querySelector(".contextText")!.textContent = "All fields are required.";
            return;
        }

        try{
            const response = await CreatePackage(senderAddress, senderName, senderPhone, recipientAddress, recipientName, recipientPhone);

            if (response && response.status === 201) {
                console.log("Package created successfully:", response.data);

                setSenderAddress("");
                setSenderName("");
                setSenderPhone("");
                setRecipientAddress("");
                setRecipientName("");
                setRecipientPhone("");

                console.log("Response from CreatePackage:", response);
                const contextBox = document.querySelector(".contextbox");
                contextBox!.classList.add("hideHole");
                document.querySelector(".contextText")!.textContent = "";
            } else {
                console.log("Response from CreatePackage:", response);
                const contextBox = document.querySelector(".contextbox");
                contextBox!.classList.remove("hideHole");
                document.querySelector(".contextText")!.textContent = "An error occurred while creating the package. Please try again.";
            }
        }
        catch (error) {
            console.error("Error creating package:", error);
            const contextBox = document.querySelector(".contextbox");
            contextBox!.classList.remove("hideHole");
            document.querySelector(".contextText")!.textContent = "Package creation failed. Check the input data.";
        }
    }

    return (
        <div className='createPackages'>
            <div className="contextbox">
                <h2 className="contextText"></h2>
            </div>
            <form className="createForm">
                <div className="senderDiv">
                    <label htmlFor="senderName" className="senderNameLabel">Sender Name:</label>
                    <input
                        type="text"
                        className="senderName"
                        name="senderName"
                        value={senderName}
                        onChange={handleInputChange}
                        required
                    />
                    
                    <label htmlFor="senderAddress" className="senderAddressLabel">Sender Address:</label>
                    <input
                        type="text"
                        className="senderAddress"
                        name="senderAddress"
                        value={senderAddress}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="senderPhone" className="senderPhoneLabel">Sender Phone:</label>
                    <input
                        type="text"
                        className="senderPhone"
                        name="senderPhone"
                        value={senderPhone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="recipientDiv">
                    <label htmlFor="recipientName" className="recipientNameLabel">Recipient Name:</label>
                    <input
                        type="text"
                        className="recipientName"
                        name="recipientName"
                        value={recipientName}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="recipientAddress" className="recipientAddressLabel">Recipient Address:</label>
                    <input
                        type="text"
                        className="recipientAddress"
                        name="recipientAddress"
                        value={recipientAddress}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="recipientPhone" className="recipientPhoneLabel">Recipient Phone:</label>
                    <input
                        type="text"
                        className="recipientPhone"
                        name="recipientPhone"
                        value={recipientPhone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </form>
            <button onClick={handleCreatePackage} className="createBtn">Create Package</button>
        </div>
    );
}

export default CreatePage;