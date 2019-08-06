import React, {Component} from  'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import PrivateRoute from './Components/generics/privateroute/PrivateRoute';
//import logo from './logo.svg';
import Login from './Components/pages/login/Login';
import Signin from './Components/pages/signin/Signin';
import Footer from './Components/generics/footer/Footer';
import Detail from './Components/pages/detail/Detail';
import List from './Components/pages/list/List';
import NewItem from './Components/pages/newItem/NewItem';
import './pagePri.css';
import './App.css';

function Home(){
    return (
       <div> 
            <h1 className = "pagePri" className = "image1">"Pagina Principal"</h1>
       </div>
    );
}
class App extends Component{
    constructor(){
        super();
        this.state = {
        isAuthenticated : false,
        users : null,
        firsVerified : false
    }
    this.setAuthState = this.setAuthState.bind(this);
}
setAuthState(authProps){
    this.setState(authProps);
}
    render(){
        return (
            <Router>
            <br/>
            <div className="App">
            <hr/>
            <Route path = "/" exact component = {Home} />
            <Route path = "/login"  render = {(p)=>(<Login {...p} auth={{...this.state, setAuthState:this.setAuthState}}/>)} />
            <Route path = "/signin"  component = {Signin} />
            <PrivateRoute path = "/list"  component = {List} auth = {this.state} />
            <PrivateRoute path = "/addnew"  component = {NewItem} auth = {this.state}/>
            <PrivateRoute path = "/detail/:itemid"  component = {Detail} auth = {this.state}/>
            <nav className = "nav1">
                <li className = "li"><Link to = "/" className = "text1" >Pagina Principal</Link></li>
                <li className = "li"><Link to = "/login" className = "text1" >Login</Link></li>
                <li className = "li"><Link to = "/signin" className = "text1">SignIn</Link></li>
                <li className = "li"><Link to = "/list" className = "text1">lista</Link></li>
            </nav>
            <Footer></Footer>
            </div>
            </Router>
        );
    }
}

export default App;
