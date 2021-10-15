import React, { Component } from 'react';
import './App.css';

function ZipCode(props){
  return(
    <div>
      <li>{props.zip}</li>
    </div>
  );
  
}

function CitySearchField(props) {
  return (
    <div className="city-search-field">
      City Name:
      <input type="text" placeholder="Try Miami" onChange={ props.changeHandler }></input>
    </div>
  );
}

class App extends Component {

  state = {
    resultMessage: '',
    zipCodes: [],
  }

  cityFieldChanged = (event) => {
    let curCity = event.target.value;
    let regex = /^[A-Za-z]/; //only letters in the English alphabets
    this.setState({ resultMessage: curCity })
    if(curCity.length > 2 && regex.test(curCity)){
      fetch(`http://ctp-zip-api.herokuapp.com/city/${curCity.toUpperCase()}`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({ zipCodes: data })
        })
    }
  }

  render(){
    return(
      <div className="container-fluid app">
        <div className="app-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField  resultMessage={ this.state.resultMessage } changeHandler={this.cityFieldChanged}/>
        <div>
          Zip codes that match: {this.state.resultMessage} 
        </div>
        <div>
          {this.state.zipCodes.map((zipcode, i) => <ZipCode zip={zipcode} key={i++}/>)}
        </div>
      </div>
    );
  }
}







export default App;