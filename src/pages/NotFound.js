import React from 'react';
import MyButton from '../Components/MyButton';

const NotFound = (props) => {
    const goBack = () => {
        props.history.goBack();
    }
    return ( 
        <div className="text-center text-primary p-5">
            <div>
                <p className="h1">Error 404 !!</p>
            </div>
            <div>
                <p className="h2">Lo sentimos, página no ha sido encontrada</p>
            </div>
            <MyButton title="Volver hacia atrás" action={goBack}/>
            <img className="img-404 img-fluid" src="indqlogo.jpg" alt="INDQ Logo"/>
        </div>
    );
};

export default NotFound;