import React, {Component} from  'react';
import Header from '../../generics/header/Header';
import Body from '../../generics/body/Body';
import Input from '../../generics/input/Input';

import axios from 'axios';
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
                   <button onClick={this.onClickHandler}>Login</button>
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
            {...this.state}
            ).then((resp)=>{
                alert(resp)
            }).catch((err) =>{
                alert(err)
            });
    }
}

export default Login;