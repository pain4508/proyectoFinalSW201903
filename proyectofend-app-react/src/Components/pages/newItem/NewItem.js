import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Body from '../../generics/body/Body';
import Input from '../../generics/input/Input';
import './NewItem.css';
class NewItem extends Component{
    constructor(){
        super();
        this.state = {
            txtDesc : "",
            txtDescError : "",
            txtAutor : "",
            txtAutorError : "",
            txtTipo : "",
            txtTipoError : "",
            redirectTo : "",
            error : ""
        }
        this.onChangehandler = this.onChangehandler.bind(this);
        this.onBlurHandler = this.onBlurHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onChangehandler(e){
        let {name, value} = e.currentTarget;
        this.setState({[name]:value});
    }
    onBlurHandler(e){
        let {name, value} = e.currentTarget;
    }

    onClickHandler(e){
        e.preventDefault();
        e.stopPropagation();
        axios.post(
            `/api/things/new`,
            {
                desc:this.state.txtDesc,
                author:this.state.txtAutor,
                type:this.state.txtTipo
            }).then(
                (resp)=>{
                    this.setState({redirectTo : "/list"});
                }
            )
            .catch(
                (err)=>{
                    this.setState({error : err});
                }
            );
    }
    render(){
        if(this.state.redirectTo!==""){
            return (
                <div>
                    <Link to = {this.state.redirectTo}>Item Agregado Satisfactoriamente</Link>
                </div>
            )
        }
        return(
            <div>
                <h1 className = "newElement">Nuevo Elemento</h1>
                <Body>
                    <Input
                    inputLabel         ="Descripción"
                    inputName          ="txtDesc"
                    inputType          ="text"
                    inputPlaceHolder   ="Descripción de la tarea a realizar"
                    inputValue         ={this.state.txtDesc || null}
                    inputErrorMsg      ={this.state.txtDescError || null}
                    inputChangeHandler ={this.onChangehandler}
                    inputBlurHandler   ={this.onBlurHandler}
                    />
                    <Input
                    inputLabel         ="Author"
                    inputName          ="txtAutor"
                    inputType          ="text"
                    inputPlaceHolder   ="Author de la tarea"
                    inputValue         ={this.state.txtAutor || null}
                    inputErrorMsg      ={this.state.txtDescError || null}
                    inputChangeHandler ={this.onChangehandler}
                    inputBlurHandler   ={this.onBlurHandler}
                    />
                    <Input
                    inputLabel         ="Tipo"
                    inputName          ="txtTipo"
                    inputType          ="text"
                    inputPlaceHolder   ="Small || Big"
                    inputValue         ={this.state.txtTipo || null}
                    inputErrorMsg      ={this.state.txtTipoError || null}
                    inputChangeHandler ={this.onChangehandler}
                    inputBlurHandler   ={this.onBlurHandler}
                    />
                    <br/>
                    <button className = "botonNew" onClick = {this.onClickHandler}>Agregar</button>
                    <div>
                        {this.state.error}
                    </div>
                </Body>
            </div>
        );
    }
}

export default NewItem;
