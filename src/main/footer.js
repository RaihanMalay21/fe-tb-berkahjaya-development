import React from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
    // inialisai redirect
    const navigate = useNavigate();

    // navigate to main page
    const handleHomePageClick = () => {
        navigate('/berkahjaya', {replace: true});
        window.scrollTo(0, 0);
    };

    
    // navigate to login
    const handleLoginClick = (e) => {
        e.preventDefault(); // mencegah default action dari achor tag
        navigate('/login'); // menggunkan navigate untuk berpindah halaman
    };
        
    // navigate signup
    const handleSignUpClick = (e) => {
        e.preventDefault();
        navigate('/signup')
    }
            
    // open location in google maps
    const openLocation = () => {
        const urlLocation = 'https://maps.app.goo.gl/KMFvHxy8oqCyxQUU7'
        window.location.href = urlLocation;
    };

    // open whatshapp
    const phoneNumber = '6281317134070';

    const openWhatsApp = () => {
        const isMobile = /iphone|ipad|ipod|Android/i.test(navigator.userAgent);
        const url = isMobile
            ? `whatsapp://send?phone=${phoneNumber}`
            : `https://web.whatsapp.com/send?phone=${phoneNumber}`;

        window.location.href = url;
    };


    return(
        <div className="container-footer"> 
            <div className="container-fill-footer">
                <div className="container-footer-company">
                    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" class="bi bi-body-text" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5m0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                    </svg>
                </div>
                <div className="container-footer-contact">
                    <h5>Contact</h5>
                    <div className="footer-contact">
                        <div className="footer-fill-contact">
                            <h6>Whatshapp</h6>
                            <a className="WAnumber-toko" onClick={() => openWhatsApp()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#006664" class="bi bi-whatsapp" viewBox="0 0 16 16" style={{ marginRight: '5px'}}>
                                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                                </svg>
                                +62 813 1713 4070
                            </a>
                        </div>
                        <div className="footer-fill-contact">
                            <h6>Telephone</h6>
                            <div class="footer-telephone">
                                <div style={{marginBottom: '10px'}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#006664" class="bi bi-telephone" viewBox="0 0 16 16" style={{ marginRight: '5px'}}>
                                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                                    </svg>
                                    +62 813 1713 4070
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#006664" class="bi bi-telephone" viewBox="0 0 16 16" style={{ marginRight: '5px'}}>
                                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                                    </svg>
                                    +62 877 7166 6291
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-footer-navigation">
                    <h5>Navigation</h5>
                    <div className="footer-navigation">
                        <a className="nav-link" onClick={() => handleHomePageClick()}>Home</a>
                        <a className="nav-link" onClick={(e) => handleLoginClick(e)}>Login</a>
                        <a className="nav-link" onClick={(e) => handleSignUpClick(e)}>Daftar</a>
                    </div>
                </div>
                <div className="container-footer-addres">
                    <h5>Address</h5>
                    <div className="footer-address">
                        <a onClick={() => openLocation()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#006664" class="bi bi-geo-alt" viewBox="0 0 16 16" style={{ marginRight: '5px'}}>
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                            </svg>
                            Lebakwana, Kec. Kramatwatu, Kabupaten Serang, Banten
                        </a>
                    </div>
                </div>
            </div>
            <div style={{ textAlign: 'center'}}>
                ©2024 All Rights Reserved
            </div>
        </div>
    )
}

export default Footer