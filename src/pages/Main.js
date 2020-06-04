import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import Event from '../Components/Event';
import Pagination from '../Components/Pagination';
import socketIOClient from "socket.io-client";

const ENDPOINT = "https://api.events.indqtech.com";

const API_URL = 'https://api.events.indqtech.com'

class Main extends Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            pages: 0,
            data: [],
            open: false,
            toLogin: false,
            modal: false,
            modal2: false,
            eventTitle: '',
            eventDescription: '',
            eventDate: '',
            eventLocation: '',
            readyLocation: '25.7910583,-108.9864715',
            file: null,
            fileId: '',
            fileImage: '',
            dateError: '',
            search: '',
        }
        this.getEvents = this.getEvents.bind(this);
        this.getEventsFiltered = this.getEventsFiltered.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.checkAssist = this.checkAssist.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openModal2 = this.openModal2.bind(this);
        this.closeModal2 = this.closeModal2.bind(this);
        this.closeModals = this.closeModals.bind(this);
        this.handleEventTitle = this.handleEventTitle.bind(this);
        this.handleEventDescription = this.handleEventDescription.bind(this);
        this.handleEventDate = this.handleEventDate.bind(this);
        this.handleEventLocation = this.handleEventLocation.bind(this);
        this.submitLocation = this.submitLocation.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.submitFile = this.submitFile.bind(this);
        this.submitEvent = this.submitEvent.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    componentDidMount() {
        this.getEvents();
    };

    componentDidUpdate() {
        const socket = socketIOClient(ENDPOINT);
        socket.on("events", data => {
            this.getEvents();
        });
    };

    getEvents(){
        const url = `${API_URL}/events/?page=${this.state.page}`;
        const request = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': this.props.location.state.token }
        };
        fetch(url, request)
            .then(response => response.json())
            .then(data => {
                this.setState({ data: data.items, pages: data.pages, page: data.page });
            })
            .catch(error => {
        });
    };

    getEventsFiltered(){
        let location = this.state.search.split(',', 2);
        const url = `${API_URL}/events/?lat=${location[0]}&lng=${location[1]}`;
        const request = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': this.props.location.state.token }
        };
        fetch(url, request)
            .then(response => {
                return response.status === 500 || response.status === 401 ? response.text().then(res => this.setState({ failAlert: res })) : response.json();
            })
            .then(data => {
                if(data){
                    this.setState({ data: data.items, pages: data.pages, page: data.page });
                }
            })
            .catch(error => console.log(error));
    };

    handlePage = e => {
        this.setState({ page: e.target.value }, this.getEvents);
        window.scrollTo(0, 0)
        ;
    };

    handleOpen = e => {
        e.preventDefault();
        this.setState({ open: !this.state.open })
    };

    handleLogout() {
        this.setState({ toLogin: true })
    };

    checkAssist = e => {
        e.preventDefault();
        const url = `${API_URL}/events/attendance/${e.currentTarget.value}`;
        let method = e.target.getAttribute('data-value') === "true" ? "DELETE" : "POST";
        const request = {
            method: method,
            headers: { 'Content-Type': 'application/json', 'Authorization': this.props.location.state.token }
        };
        fetch(url, request)
            .then(response => response.json())
            .catch(error => {
        }, );
    };

    submitFile = e => {
        let formData = new FormData();
        formData.append('file', e.target.files[0]);
        const url = API_URL + '/images';
        const request = {
            method: 'POST',
            headers: {'Authorization': this.props.location.state.token },
            body: formData
        };
        fetch(url, request)
            .then(response => response.json())
            .then(data => this.setState({ fileId: data.id, fileImage: data.fileName }))
            .catch(err => console.log('error', err));
    };

    openModal = e => {
        if(e){
            e.preventDefault();
        }
        this.setState({ modal: true });
    };


    openModal2 = e => {
        if(e){
            e.preventDefault();
        }
        this.setState({ modal2: true });
    };

    closeModal2 = e => {
        if(e){
            e.preventDefault();
        }
        this.setState({ modal2: false });
    };

    closeModals = e => {
        if(e){
            e.preventDefault();
        }
        this.setState({ modal: false, modal2: false });
    };

    handleEventTitle = e => {
        this.setState({ eventTitle: e.target.value })
    };

    handleEventDescription = e => {
        this.setState({ eventDescription: e.target.value })
    };

    submitEvent = e => {
        e.preventDefault();
        const url = API_URL + '/events';
        let location = this.state.eventLocation.split(',', 2).map(Number);
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': this.props.location.state.token },
            body: JSON.stringify({
                "id": this.state.fileId,
                "title": this.state.eventTitle,
                "description": this.state.eventDescription,
                "date": this.state.eventDate,
                "image": this.state.fileImage,
                "attendances": 0,
                "willYouAttend": true,
                "location": location
            })
        };
        fetch(url, request)
            .then(response => response.json())
            .then(data => {
                alert("Evento registrado correctamente");
            })
            .catch(err => {
                alert("Error al registrar un evento. Intente de nuevo más tarde");
            });
        this.closeModals();
    };

    handleEventDate = e => {
        let dateSelected = e.target.value;
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let yearS = parseInt(dateSelected.slice(0, 4));
        let monthS = parseInt(dateSelected.slice(5, 7));
        let dateS = parseInt(dateSelected.slice(8, 10));
        if((yearS < year) || (yearS === year && monthS < month) || (yearS === year && monthS === month && dateS < date)){
            this.setState({ dateError: 'La fecha del evento no debe ser menor al día de hoy' });
            this.setState({ eventDate: null });
        }
        else{
            this.setState({ dateError: '' });
            this.setState({ eventDate: dateSelected });
        };
    };
    //2020-03-04

    handleEventLocation = e => {
        this.setState({ eventLocation: e.target.value });
    };;

    submitLocation = () => {
        this.setState({ readyLocation: this.state.eventLocation });
    };

    handleFile = e => {
        this.setState({ file: URL.createObjectURL(e.target.files[0]) });
        this.submitFile(e);
    };

    handleSearch = e => {
        this.setState({ search: e.target.value }, this.getEventsFiltered);
        
    };

    render() {
        if (this.state.toLogin === true) {
            return <Redirect to="/"
                    />
        };

        return (
            <div>
                <Event data={this.state.data} assist={this.checkAssist}/>
                <Header 
                    firstName={this.props.location.state.firstName} 
                    lastName={this.props.location.state.lastName}
                    open={this.handleOpen}
                    logout={this.handleLogout}
                    isOpen={this.state.open}
                    isModal={this.state.modal}
                    openModal={this.openModal}
                    isModal2={this.state.modal2}
                    openModal2={this.openModal2}
                    closeModal2={this.closeModal2}
                    eventTitle={this.state.eventTitle}
                    eventDescription={this.state.eventDescription}
                    eventDate={this.state.eventDate}
                    handleEventTitle={this.handleEventTitle}
                    handleEventDescription={this.handleEventDescription}
                    handleEventDate={this.handleEventDate}
                    eventLocation={this.state.eventLocation}
                    handleEventLocation={this.handleEventLocation}
                    readyLocation={this.state.readyLocation}
                    submitLocation={this.submitLocation}
                    file={this.state.file}
                    handleFile={this.handleFile}
                    closeModals={this.closeModals}
                    dateError={this.state.dateError}
                    submitEvent={this.submitEvent}
                    search={this.state.search}
                    handleSearch={this.handleSearch}
                />
                <Pagination pages={this.state.pages} action={this.handlePage} page={this.state.page}/>
            </div>
        );
    };
};
// 
export default Main;