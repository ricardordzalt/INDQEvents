import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'

const API_URL = 'https://api.events.indqtech.com'

class LoginComponent extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            failAlert: '',
            toMain: false,
            token: '',
            firstName: '',
            lastName: ''
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmail = e => {
        this.setState({ email: e.target.value })
    }

    handlePassword = e => {
        this.setState({ password: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault();
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "email": this.state.email, "password": this.state.password })
        };
        fetch(`${API_URL}/users/login`, request)
            .then(response => {
                return response.status === 403 || response.status === 400 ? response.text().then(res => this.setState({ failAlert: res })) : response.json();
            })
            .then(data => {
                if(data.token){
                    this.setState({ token: data.token, toMain: true, firstName: data.firstName, lastName: data.lastName })
                }
            })
            .catch(error => {
            });
    };


    render() {
        if (this.state.toMain === true) {
            return <Redirect to={{
                        pathname: '/main',
                        state: { token: this.state.token, firstName: this.state.firstName, lastName: this.state.lastName }
                    }}
                    />
        };
        
        return (
            <div className="container mt-4 p-2">
                <div className="row justify-content-center ml-0 mr-0">
                    <div className="col-12 col-sm-6 text-center border border-primary p-5">
                        <p className="h2">INDQ Events</p>
                        <p className="h6">Iniciar sesión</p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group mt-3">
                                <label htmlFor="emailInput" className="float-left">Correo</label>
                                <input 
                                    value={this.state.email}
                                    onChange={this.handleEmail}
                                    required
                                    type="email" 
                                    className="form-control" 
                                    id="emailInput" 
                                    placeholder="Ingresa tu correo electrónico"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="passInput" className="float-left">Contraseña</label>
                                <input
                                    value={this.state.password}
                                    onChange={this.handlePassword}
                                    required
                                    type="password" 
                                    className="form-control" 
                                    id="passInput" 
                                    placeholder="Password"
                                />
                            </div>
                            <p className="p-3 text-danger">{this.state.failAlert}</p>
                            <button type="submit" className="btn btn-primary mt-3">Acceder</button>
                        </form>
                        <div className="mt-3" ><Link to="/Register">¿No tienes cuenta? Registrate</Link></div>
                    </div>
                </div>
            </div>
        );
    };
};

export default LoginComponent;