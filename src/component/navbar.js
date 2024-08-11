import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const Navbar = ({ onSearch, judulNav }) => {

    const handleSeacrh = (e) => {
        const searchTerm = e.target.value;
        onSearch(searchTerm);
    }
    
    return (
            <nav class="navbar navbar-expand-lg" style={{ backgroundColor: 'white', padding: '15px 0', zIndex: '9999', fontFamily: 'constania'}}>
                <div class="container-fluid">
                    <div class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                        <form class="d-flex" role="search" style={{ marginLeft: '0.8rem'}}>
                            <input placeholder="Seacrh..." onChange={handleSeacrh} class="form-control me-2" type="search" aria-label="Search" />
                            <button  class="btn btn-outline-success border-light" type="button" style={{ backgroundColor: '#006664', color: 'white'}}>Search</button>
                        </form>
                        <h2 style={{ color: '#006664', fontWeight: 'bold', marginRight: '0.8rem'}}>{judulNav}</h2>
                    </div>
                </div>
            </nav>
    )
}

export default Navbar;
