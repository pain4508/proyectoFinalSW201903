import React, {Component} from 'react';
import './Header.css';
class Header extends Component{
    render(){
        return(
            <h1 className="clasic">{this.props.title || 'No Header'}</h1>
        );
    }
}
export default Header;