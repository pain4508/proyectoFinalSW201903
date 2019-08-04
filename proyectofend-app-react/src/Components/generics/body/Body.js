import React, {Component} from 'react';

class Body extends Component{
render(){
    return(
        <div clasName="main">
        {this.props.children}
        </div>
    );
}
}

export default Body;