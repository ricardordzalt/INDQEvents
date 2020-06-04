import React from 'react';

const Event = props => {
    const fixDate = date => {
        return date.replace('T', ' ').replace(/-/g, '/').slice(0, 16)
    }
    const API_URL = 'https://api.events.indqtech.com/images/'
    const API_KEY = "AIzaSyDH-HR5yQ6uFjjTH51J8q39pG6O46Ag29Q"

    const events = props.data.map((event, idx) => (
        <div key={idx}>
             <div className="container mb-5 p-2">
                <div className="row justify-content-center ml-0 mr-0">
                    <div className="col-12 col-sm-10 col-md-7 text-center border border-dark p-5">
                        <img width="100%" src={`${API_URL}${event.image}`} alt={ event.title }/>
                        <div className="row mt-3 text-center">
                            <div className="col-12 col-sm-6">
                                <p className="h3 mt-4 mb-2 p-4">{ event.title }</p>
                                <p className="h6 p-2">Fecha del evento:</p>
                                <div className="d-flex justify-content-center">
                                    <img width="25px" height="30px" src="calendar.png" alt="calendar"/>
                                    <p className="h6 p-2">{ fixDate(event.date) } hrs</p>
                                </div>
                                <p className="h6 mt-2 mb-2 description">{ event.description }</p>
                            </div>
                            <div className="col-12 col-sm-6">
                                <p className="h5 mt-4 mb-1 p-4">{ event.attendances } personas asistirán</p>
                                <button 
                                    onClick={props.assist} 
                                    data-value={ event.willYouAttend } 
                                    value={ event.id } 
                                    className={"btn " + (event.willYouAttend ? "fa fa-check btn-success" : "fa fa-times btn-danger")
                                    }>
                                        {event.willYouAttend ? "Asistiré" : "Asistir"}
                                </button>
                                <iframe
                                    width="100%"
                                    className="responsive-iframe iframe-map mt-3" 
                                    title={idx} name="gMap" 
                                    src={`https://www.google.com/maps/embed/v1/place?q=${event.location[0]},${event.location[1]}&key=${API_KEY}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));
    return (
        <div className="main">
            { events }
        </div>
        
    );
};

export default Event;