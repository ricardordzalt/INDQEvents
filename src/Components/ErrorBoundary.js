import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {   
    this.setState({ hasError: true });  
  }  
  render() {
    if (this.state.hasError) {      // You can render any custom fallback UI      
      window.location.reload(false);
      this.setState({ hasError: false })
      return <Redirect to='/'/> 
    }
    else{}
        return this.props.children;
  }
}

export default ErrorBoundary;