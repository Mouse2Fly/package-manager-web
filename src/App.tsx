import './App.css'
import FetchPackages from './services/FetchPackages';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisplayPackages from './components/DisplayPackages/DisplayPackages';
import type { PackageData } from './components/OnePackage/OnePackage';
import CreatePackages from './components/CreatePackages/CreatePage';
import { Link } from 'react-router-dom';
import InspectPackages from './components/InspectPackages/InspectPackages';
import "./assets/Mulish/Mulish-VariableFont_wght.ttf"

function App() {

    const [packages, setPackages] = useState<PackageData[]>();

    const getPackageData = async () => {
        try {
            const Response = await FetchPackages();
            console.log(Response);
            //console.log("Places Package Data successfully");
            setPackages(Response);
        } catch (error) {
            console.error("Error fetching Package Data:", error);
        }
    }

    useEffect(() => {
        getPackageData();
    }, []);

  return (
        <Router>
            <div className='header'>
                <h1 className='webName'>Super Package Tracking</h1>
                <div className='headerLinks'>
                    <Link to="/" className='homePageLink' onClick={getPackageData}>Home</Link>
                    <Link to="/create" className='createPageLink'>Create</Link>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<DisplayPackages packageSent={packages} fetchFunc={getPackageData} />} />
                <Route path="/create" element={<CreatePackages />} />
                <Route path="/inspect" element={<InspectPackages />} />
            </Routes>
        </Router>
  )
}

export default App
