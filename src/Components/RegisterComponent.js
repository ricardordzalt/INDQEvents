import React, { Component } from 'react';
import { Link } from 'react-router-dom'

const API_URL = 'https://api.events.indqtech.com'

class LoginComponent extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            gender: '',
            password: '',
            password2: '',
            alert: '',
            success: ''
        }
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleGender = this.handleGender.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePassword2 = this.handlePassword2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFirstName = e => {
        this.setState({ firstName: e.target.value });
    }

    handleLastName = e => {
        this.setState({ lastName: e.target.value });
    }
    
    handleEmail = e => {
        this.setState({ email: e.target.value });
    }
    
    handleGender = e => {
        this.setState({ gender: e.target.value });
    }
    
    handlePassword = e => {
        this.setState({ password: e.target.value });
    }
    
    handlePassword2 = e => {
        this.setState({ password2: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        if(this.state.password === this.state.password2){
            this.setState({ alert: ""});
            const request = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "firstName": this.state.firstName,
                    "lastName": this.state.lastName,
                    "email": this.state.email,
                    "password": this.state.password,
                    "gender": this.state.gender
                })
            };
            fetch(`${API_URL}/users`, request)
                .then(response => {
                    return response.status === 403 || response === 400 ? response.text().then(res => this.setState({ alert: res, success: '' })) : response.json();
                })
                .then(data => {
                    if(data.id){
                        this.setState({ alert: '', success: 'Usuario registrado correctamente. Proceda al inicio de sesión'})
                    }
                    console.log(data)
                })
                .catch(error => {
                });
        }
        else{
            this.setState({ alert: "La contraseña no coincide"});
        }

    }
    
    render() {
        return (
            <div className="container mt-4 p-2">
                <div className="row justify-content-center ml-0 mr-0">
                    <div className="col-12 col-sm-8 text-center border border-primary p-5">
                        <p className="h2">INDQ Events</p>
                        <p className="h6">Registro</p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row mt-3">
                                <div className="col-12 col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="nameInput" className="float-left">Nombre (s)</label>
                                        <input 
                                            required
                                            type="text" 
                                            className="form-control" 
                                            id="nameInput" 
                                            placeholder="Ingresa tu nombre"
                                            pattern="[A-Z a-záéíóú]+"
                                            value={this.state.firstName}
                                            onChange={this.handleFirstName}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="lastNameInput" className="float-left">Apellido (s)</label>
                                        <input 
                                            required
                                            type="text" 
                                            className="form-control" 
                                            id="lastNameInput" 
                                            placeholder="Ingresa tu apellido"
                                            pattern="[A-Z a-záéíóú]+"
                                            value={this.state.lastName}
                                            onChange={this.handleLastName}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="emailInput" className="float-left">Correo</label>
                                        <input
                                            required
                                            type="email" 
                                            className="form-control" 
                                            id="emailInput" 
                                            placeholder="Ingresa tu correo"
                                            value={this.state.email}
                                            onChange={this.handleEmail}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 text-left">
                                    <label htmlFor="genreInput">Género</label>
                                    <div id="genreInput" className="mt-2" onChange={this.handleGender}>
                                        <div className="form-check form-check-inline">
                                            <input required className="form-check-input" type="radio" name="inlineRadioOptions" id="maleInput" value="male"/>
                                            <label className="form-check-label" htmlFor="maleInput">Masculino</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="femaleInput" value="female"/>
                                            <label className="form-check-label" htmlFor="femaleInput">Femenino</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="passInput" className="float-left">Contraseña</label>
                                        <input
                                            required
                                            type="password" 
                                            className="form-control" 
                                            id="passInput" 
                                            placeholder="Ingresa tu contraseña"
                                            pattern=".{8,}"
                                            value={this.state.password}
                                            onChange={this.handlePassword}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="confirmInput" className="float-left">Confirmar contraseña</label>
                                        <input 
                                            required
                                            type="password" 
                                            className="form-control" 
                                            id="confirmInput" 
                                            placeholder="Ingresa tu contraseña nuevamente"
                                            pattern=".{8,}"
                                            value={this.state.password2}
                                            onChange={this.handlePassword2}
                                        />
                                    </div>
                                </div>
                            </div>
                            <p className="p-3 text-danger">{ this.state.alert }</p>
                            <p className="p-3 text-success">{ this.state.success }</p>
                            <button type="submit" className="btn btn-primary mt-3">Confirmar</button>
                            <div className="mt-3" ><Link to="/">¿Ya eres miembro? Inicia sesión</Link></div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
};

export default LoginComponent;