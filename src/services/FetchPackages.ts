const FetchPackages = async () => {
    const response = await fetch(`http://localhost:5009/package`);
    const data = await response.json();

    if (!data) {
        throw new Error(`Error fetching places`);
    }


    return data;

}

export default FetchPackages;