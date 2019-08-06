import React, {Component} from 'react';
import Header from '../../generics/header/Header';
import Body from '../../generics/body/Body';
import Input from '../../generics/input/Input';
import {Redirect, Link} from 'react-router-dom';
import axios from 'axios';
class Signin extends Component{
    constructor(){
        super();
        this.state = {
            "txtPswd":"",
            "txtEmail":""
        }
        this.onChangehandler = this.onChangehandler.bind(this);
        this.onClickSignIn = this.onClickSignIn.bind(this);
      
    }
    render(){
        if(this.state.redirecto && true){
            return (<Redirect to = {this.props.location.state.from.pathname}/>);
        }
        return (
            <div>
            <Header   title = "Crear Nueva Cuenta"></Header>
           
               <Body>
                   <Input
                     inputLabel="Correo Electrónico"
                     inputName="txtEmail"
                     inputType="email"
                     inputPlaceHolder="Correo Electrónico"
                     inputValue={this.state.txtEmail}
                     inputErrorMsg=""
                     inputChangeHandler={this.onChangehandler}
                   />
                    <Input
                     inputLabel="Contraseña"
                     inputName="txtPswd"
                     inputType="Password" 
                     inputPlaceHolder="Contraseña"
                     inputValue={this.state.txtPswd}
                     inputErrorMsg=""
                     inputChangeHandler={this.onChangehandler}
                   />
                   <button onClick={this.onClickSignIn} className = "botonLogin">Aceptar</button>
                   <br/>
                   <br/>
                   <br/>
               </Body>
            </div>
        );
    }
    onChangehandler(e){
        const {name, value} = e.currentTarget; //ES5 destructor de objetos || destructoring
        this.setState({...this.state, [name]:value});  
     }


     onClickSignIn(e){
        e.preventDefault();
        e.stopPropagation();
        const {email, password} = this.state;
        axios.post(
            '/api/users/login', 
            {"email": this.state.txtEmail, "password" : this.state.txtPswd}
            ).then(
                (resp)=>{
                    this.props.auth.setAuthState(
                        {
                            "isAuthenticated" : true,
                            "users" : this.state.txtEmail,
                            "firstVerified" : true
                        }
                    );
                    this.setState({"redirecto" : true});
            }).catch((error)=>{
                console.log(error);
                this.setState({error:"Error al crear cuenta. Intente nuevamente."})
              })
    }
}
export default Signin;