import './App.css'
import FetchPackages from './services/FetchPackages';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisplayPackages from './components/DisplayPackages/DisplayPackages';

function App() {

    const getPackageData = async () => {
        try {
            const Response = await FetchPackages();
            console.log(Response);
            console.log("Places Package Data successfully");
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
                <h1>Package Manager</h1>
            </div>
            <Routes>
                <Route path="/" element={<DisplayPackages />} />
            </Routes>
        </Router>
  )
}

export default App
