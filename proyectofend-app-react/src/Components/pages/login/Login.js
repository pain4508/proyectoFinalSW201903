import React, {Component} from  'react';
import Header from '../../generics/header/Header';
import Body from '../../generics/body/Body';
import Input from '../../generics/input/Input';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            "txtEmail":"",
            "txtPassword":""
        }
        this.onChangehandler = this.onChangehandler.bind(this);
    }
    render(){
        return (
            <div>
               <Header title= "Inicio de Sesión"></Header>
               <Body>
                   <Input
                     inputLabel = "Correo Electrónico"
                     inputName = "txtEmail"
                     inputType = "email"
                     inputPlaceHolder = "Correo Electrónico"
                     inputValue = {this.state.txtEmail}
                     inputErrorMsg = ""
                     inputChangeHandler = {this.onChangehandler}
                   />
                    <Input
                     inputLabel = "Contraseña"
                     inputName = "txtPassword"
                     inputType = "Password"
                     inputPlaceHolder = "Contraseña"
                     inputValue = {this.state.txtPassword}
                     inputErrorMsg = ""
                     inputChangeHandler = {this.onChangehandler}
                   />
               </Body>
            </div>
        );
    }
    onChangehandler(e){
       const {inputName, value} = e.currentTarjet; //ES5 destructor de objetos || destructoring
       this.setState({...this.state, [inputName]:value});  
    }
}

export default Login;