import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import NewsComponent from './components/NewsComponent';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";

export default class App extends Component {
  pageSize = 6;
  apiKey = process.env.REACT_APP_NEWS_API;
  
  state = {
    progress : 0
  }

  setProgress = (progress) => {
    this.setState({progress : progress})
  }

  render() {
    return (
      <div>
        
        <Router>
        <LoadingBar
          color='#dc3545'
          progress={this.state.progress}
          height={3}
        />
          <NavBar/>
            <Routes>
              <Route exact path='/' element={<NewsComponent apiKey = {this.apiKey} progressState = {this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general"/>}/>
              <Route exact path='/business' element={<NewsComponent apiKey = {this.apiKey} progressState = {this.setProgress} key="business" pageSize={this.pageSize} country="in" category="business"/>}/>
              <Route exact path='/entertainment' element={<NewsComponent apiKey = {this.apiKey} progressState = {this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"/>}/>
              <Route exact path='/health' element={<NewsComponent apiKey = {this.apiKey} progressState = {this.setProgress} key="health" pageSize={this.pageSize} country="in" category="health"/>}/>
              <Route exact path='/science' element={<NewsComponent apiKey = {this.apiKey} progressState = {this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science"/>}/>
              <Route exact path='/sports' element={<NewsComponent apiKey = {this.apiKey} progressState = {this.setProgress} key="sports" pageSize={this.pageSize} country="in" category="sports"/>}/>
              <Route exact path='/technology' element={<NewsComponent apiKey = {this.apiKey} progressState = {this.setProgress} key="technology" pageSize={this.pageSize} country="in" category="technology"/>}/>
            </Routes>
        </Router>
        
      </div>
    )
  }
}
