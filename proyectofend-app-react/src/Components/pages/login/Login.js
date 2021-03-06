import React, {Component} from  'react';
import Header from '../../generics/header/Header';
import Body from '../../generics/body/Body';
import Input from '../../generics/input/Input';
import {Redirect, Link} from 'react-router-dom';
import axios from 'axios';
import './Login.css';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            "txtPswd":"",
            "txtEmail":""
        }
        this.onChangehandler = this.onChangehandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }
    render(){
        if(this.state.redirecto && true){
            return (<Redirect to = {this.props.location.state.from.pathname}/>);
        }
        return (
            <div>
               <Header title= "Inicio de Sesión"></Header>
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
                   <button onClick={this.onClickHandler} className = "botonLogin">Login</button>
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
    onClickHandler(e){
        e.preventDefault();
        e.stopPropagation();
        //alert("Ohh hice click");
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
            }).catch((err) =>{
                alert(err)
            });
    }
}

export default Login;