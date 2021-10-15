import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (<div className="card mx-auto"> 
      <div className="card-header ">
        { props.cityName }
      </div>
      <div className="card-body text-left">
        <ul>
          <li>State: { props.cState }</li>
          <li>Lat/Long: { props.cCoordinates }</li>
          <li>Population (estimated): { props.cPopulation }</li>
          <li>Total Wages: { props.cWages }</li>
        </ul>
      </div>
    </div>);
}

function ZipSearchField(props) {
  // onChange tracks the events that are occurring in the particular input.
  return (
  <div className="zip-search-field"> 
    Zip Code: 
    <input type="text" placeholder="Try 10460" onChange={ props.changeHandler}/>

  </div>);
}

class App extends Component {

  // You don't need to set up constructor manually. Manipulating the state is also correct.
  state = {
    resultMessage: '',
    cities: [],
  };


  // "Lifting" the function to the parent component because we want "App" to have access to the zip codes and not keep it in the ZipSearchField
  // Also, if the ZipChanged function was a regular function we would need the constructor and use bind. However, with anonymous function there's no need for that.
  ZipChanged = (event) => {
    //console.log(event.target.value)
    let curZip = event.target.value;
    // check before fetching. **Need to check wether zip code is only numbers or not**.
    if(curZip.length === 5 && parseInt(curZip, 10)) {
      //console.log(this.state.cities); 
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${curZip}`)
      .then((reponse) => reponse.json())
      .then((data) => {
        console.log(data)
        this.setState({ resultMessage: '' })
        this.setState({cities: data}) 
      })
      .catch(err => {
        this.setState({ cities: [] })
        this.setState({ resultMessage: 'No results' })
      })
    }
    else {
      this.setState({ cities: [] })
      this.setState({ resultMessage: 'No results' })
    }
    
  }

  render() {
    return (
      <div className="container app" >
        <div className="app-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField resultMessage={this.state.resultMessage} changeHandler={this.ZipChanged}/>
        <div>
          {this.state.resultMessage}
        </div>
        <div>
          { this.state.cities.map((city, i) => <City cityName={city["City"]} cCoordinates={`(${city["Lat"]}, ${city["Long"]})`} cState={city["State"]} cPopulation={city["EstimatedPopulation"]} cWages={"TotalWages"} key={i++}/> ) }
        </div>
      </div>
    );
  }
}

export default App;
