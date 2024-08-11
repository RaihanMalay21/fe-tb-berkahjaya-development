import "../App.css"
import React from "react"
import { useNavigate } from "react-router-dom"

function SideBare() {
    const navigate = useNavigate();

    const style = {
        containerSideBare: {
            position: 'fixed',
            width: '18%',
            fontFamily: 'Arial, sans-serif',
            padding: '20px 25px',
            backgroundColor: '#006664',
            color: 'white',
            height: '100%',
            zIndex: '9999',
        },
        containerHead: {
            display: 'flex',
            paddingBottom: '20px'
        },
        containerFillSideBare: {
            display: 'block',
            borderBottom: '0.2px solid white',
            margin: '20px 0',
            paddingBottom: '20px'
        },
        containerbodySideBare: {
            paddingTop: '10px',
        },
        p: {
            textAlign: 'start',
            color: 'white'
        },
        aLink: {
            display: 'block',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
        },
        aLinkHead: {
            fontSize: '20px',
            color: 'white',
            marginBottom: '10px',
            cursor: 'pointer',
        },
        svg: {
            marginRight: '10',
        }
    }

    const handleNavigatePageBarang = () => {
        navigate("/berkahjaya/adminside/barang");
    }

    const handleNavigatePageInputBarang = () => {
        navigate("/berkahjaya/adminside/barang/input");
    }

    const handleNavigatePageHadiah = () => {
        navigate("/berkahjaya/adminside/hadiah");
    }

    const handleNavigatePageInputHadiah = () => {
        navigate("/berkahjaya/adminside/hadiah/input");
    }
    
    const handleNavigatePoin = () => {
        navigate("/berkahjaya/adminside/poin");
    }

    const handleNavigateHadiahUsers = () => {
        navigate("/berkahjaya/adminside/hadiah/users");
    }
 
    return (
        <div className="container-side-bare" style={style.containerSideBare}>
            <div className="container-head" style={style.containerHead}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-houses-fill" viewBox="0 0 16 16">
                <path d="M7.207 1a1 1 0 0 0-1.414 0L.146 6.646a.5.5 0 0 0 .708.708L1 7.207V12.5A1.5 1.5 0 0 0 2.5 14h.55a2.5 2.5 0 0 1-.05-.5V9.415a1.5 1.5 0 0 1-.56-2.475l5.353-5.354z"/>
                <path d="M8.793 2a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708z"/>
                </svg>
                <h3 style={{marginTop: '0.6rem', marginLeft: '1rem', fontFamily: 'constania', fontSize: '34px'}}>Admin</h3>
            </div>
            <div style={style.containerbodySideBare}>
                <div style={style.containerFillSideBare}>
                    <p style={style.p}>Barang</p>
                    <div>
                        <div style={style.aLinkHead}>
                            <a onClick={handleNavigatePageBarang} style={{ color: 'white'}}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" class="bi bi-box2-fill" viewBox="0 0 16 16" style={ style.svg }>
                            <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4zM15 4.667V5H1v-.333L1.5 4h6V1h1v3h6z"/>
                            </svg>Barang</a>
                        </div>
                        <div style={style.aLink}>
                            <a onClick={handleNavigatePageInputBarang} style={{ color: 'white'}}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16" style={ style.svg }>
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
                            </svg>Tambah</a>
                        </div>
                    </div>
                </div>
                <div style={style.containerFillSideBare}>
                    <p style={style.p}>Hadiah</p>
                    <div>
                        <div style={style.aLinkHead}>
                            <a onClick={handleNavigatePageHadiah} style={{ color: 'white'}}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" class="bi bi-gift-fill" viewBox="0 0 16 16"  style={ style.svg }>
                            <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A3 3 0 0 1 3 2.506zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43zM9 3h2.932l.023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0zm6 4v7.5a1.5 1.5 0 0 1-1.5 1.5H9V7zM2.5 16A1.5 1.5 0 0 1 1 14.5V7h6v9z"/>
                            </svg>Hadiah</a>
                        </div>
                        <div style={style.aLink}>
                            <a onClick={handleNavigatePageInputHadiah} style={{ color: 'white'}}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16"  style={ style.svg }>
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
                            </svg>Tambah</a>
                        </div>
                    </div>
                </div> 
                <div style={style.containerFillSideBare}>
                    <p style={style.p}>verification</p>
                    <div>
                        <div style={style.aLinkHead}>
                            <a onClick={handleNavigatePoin} style={{ color: 'white'}}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16" style={ style.svg }>
                            <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z"/>
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12"/>
                            </svg>Poin</a>
                        </div>
                        <div style={style.aLink}>
                            <a href="#" onClick={handleNavigateHadiahUsers} style={{ color: 'white'}}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" class="bi bi-patch-check-fill" viewBox="0 0 16 16"  style={ style.svg }>
                            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                            </svg>Hadiah</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBare;