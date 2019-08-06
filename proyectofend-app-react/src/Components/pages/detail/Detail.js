import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
class Detail extends Component{
    constructor(){
        super();
        this.state = {
            detail: null,
            isLoading: false,
            hasErrors: false,
            message : ''
        }
        this.componentDelete = this.componentDelete.bind(this);
    }

    componentDidMount(){
        let {itemid} = this.props.match.params;
        axios.get(`/api/things/byid/${itemid}`)
        .then((resp)=>{
            this.setState({detail:resp.data, isLoading:false, hasErrors: false});
        })
        .catch((err)=>{
            this.setState({detail:null, isLoading:false, hasErrors:err});
        })
    }
    componentDelete(){
        let {itemid} = this.props.match.params;
        axios.delete(`/api/things/delete/${itemid}`)
        .then((resp)=>{
            alert("Elemento Eliminado Satisfactoriamente");
            console.log("Elemento Eliminado Satisfactoriamente");
            
        })
        .catch((err)=>{
           console.log("Error al Eliminar el elemento");
        })
    }
    render(){
        let itemId = this.props.match.params.itemid;
        let itemBody = null;
        if(this.state.detail){
            let {desc, due, author} = this.state.detail;
            itemBody = (
           <div>
              <h1>{itemId}</h1>
              <b>{desc}</b><br/>
              <b>{due}</b><br/>
              <b>{author}</b><br/>
            </div>
            );
        }
        
        return (
            <div>
                {itemBody}
            <button onClick={this.componentDelete}>Eliminar Elemento</button>
            <br/>  
            <Link to="/list">Regresar</Link>
            <br/>
            </div>
        );
    }

    
}
export default Detail;