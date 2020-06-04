import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Collapse from 'react-bootstrap/Collapse';

const Header = props => {
    const API_KEY = "AIzaSyDH-HR5yQ6uFjjTH51J8q39pG6O46Ag29Q"
    return(
        <div className=" header text-right border border-dark">
            <div className="row justify-content-end">
                <div className="col-12 col-sm-12 col-md-4 p-2 mt-3">
                    <input
                        value={props.search}
                        onChange={props.handleSearch}
                        type="search" 
                        className="form-control" 
                        id="searchInput" 
                        placeholder="Buscar..."
                    />
                </div>
                <div className="col-12 col-sm-12 col-md-4 col-btns">
                    <Button
                        className="btn-userName border border-dark btn btn-secondary"
                        onClick={props.open}
                        aria-controls="example-collapse-text"
                        aria-expanded={props.isOpen}
                        key="btn-1"
                    >
                        <strong>&lt;{props.firstName} {props.lastName}&gt;</strong>
                        <i className={"ml-3 " + (props.isOpen ? "fa fa-chevron-down" : "fa fa-chevron-right")}/>
                    </Button>
                    <Collapse in={props.isOpen}>
                        <div id="example-collapse-text align-items-start">
                            <div><Button  key="btn-2" onClick={props.openModal} className="btn btn-light border border-secondary btn-sm">Agregar evento</Button></div>
                            <div><Button key="btn-3" onClick={props.logout} className="btn btn-light border border-secondary btn-sm">Cerrar sesión</Button></div>
                        </div>
                    </Collapse>
                </div>
            </div>

            <Modal size="lg" show={props.isModal} onHide={props.openModal2}>

                <Modal.Header closeButton>
                    <p className="h4">INDQ Events</p><p className="h6">Agregar evento</p>
                </Modal.Header>
                <form onSubmit={props.submitEvent}>
                    <Modal.Body>
                        <div className="row justify-content-center ml-0 mr-0">
                            <div className="col-6 text-center p-2">
                                <div className="mb-2">
                                    <label className="float-left" htmlFor="eventTitle">Título</label>
                                    <input 
                                        required
                                        className="form-control" 
                                        id="eventTitle" 
                                        placeholder="Ingresa título del evento"
                                        value={props.eventTitle}
                                        onChange={props.handleEventTitle}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="float-left" htmlFor="exampleFormControlTextarea1">Descripción</label>
                                    <textarea
                                        required
                                        className="form-control" 
                                        id="exampleFormControlTextarea1" 
                                        rows="3"
                                        placeholder="Ingresa descripción del evento"
                                        value={props.eventDescription}
                                        onChange={props.handleEventDescription}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="float-left" htmlFor="eventDate">
                                        Fecha
                                        <img width="25px" height="30px" src="calendar.png" alt="calendar"/>
                                    </label>
                                    <input
                                        required
                                        type="date"
                                        className="form-control" 
                                        id="eventDate" 
                                        value={props.eventDate}
                                        onChange={props.handleEventDate}
                                    />
                                    <p className="text-danger">{ props.dateError }</p>
                                </div>
                            </div>
                            <div className="col-6 text-center p-2">
                            <div>
                                <img className="img-fluid" width="300px" height="auto" src={props.file} alt="Imagen a subir"/>
                                <input required type="file" accept=".jpg, .jpeg, .png" onChange={props.handleFile}/>
                            </div>
                            </div>
                            <div className="col-12 pb-2">
                                    <div className="d-flex ">
                                        <input
                                            required
                                            className="form-control mb-2" 
                                            id="eventLocation" 
                                            value={props.eventLocation}
                                            onChange={props.handleEventLocation}
                                            placeholder="ej: 25.7910583,-108.9864715"
                                        />
                                        <Button
                                            size="sm"
                                            className="btn-userName border border-dark btn btn-secondary"
                                            onClick={props.submitLocation}
                                            key="btn-4"
                                        >
                                                Buscar
                                        </Button>
                                    </div>
                                    <iframe
                                        width="100%"
                                        className="responsive-iframe iframe-map" 
                                        title="event-location" name="gMap" 
                                        src={`https://www.google.com/maps/embed/v1/place?q=${props.readyLocation}&key=${API_KEY}`}
                                    />
                            </div>
                        </div>

                    </Modal.Body>

                    <Modal.Footer className="text-center">
                        <Button variant="outline-secondary" onClick={props.openModal2}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="dark">
                            Registrar
                        </Button>
                    </Modal.Footer>
                </form>

            </Modal>

            <Modal show={props.isModal2} onHide={props.closeModal2}>
                <Modal.Body>Si continua con la navegación perderá lo capturado. ¿Desea continuar?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.closeModal2}>
                        No
                    </Button>
                    <Button variant="light" onClick={props.closeModals}>
                        Si
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Header;
