import React, { Component } from 'react';
import './App.css';
import { stat } from 'fs';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      matrix: [],
      boxCount:0,
      msg: undefined
    }
    this.userMatrix = 0;
    this.userEndGameTime   = 0;
    this.matrixBoxClickHandler = this.matrixBoxClickHandler.bind(this);
    this.endGameHandler = this.endGameHandler.bind(this);
    this.endGameVar = null;
    this.boxElemRef = [];
  }
  componentDidMount(){
    this.userMatrix = prompt("Please enter matrix size",3);
    this.userEndGameTime   = prompt("Please enter time to complete game",3);
    this.setState(()=>{
      //register end game handler
      
      return {
          matrix: Array.from({length: this.userMatrix*this.userMatrix}),
          boxCount: this.userMatrix*this.userMatrix
        }
    },()=> this.endGameVar = setInterval(this.endGameHandler,(this.userEndGameTime*1000)) );

  }

   endGameHandler(){
    const {boxCount} = this.state;
    if(boxCount == 0){
      this.setState({msg: <em style={{color:'green'}}>You are winner.</em>});
      clearInterval(this.endGameVar);
    }else{
      this.setState({
        msg: <em style={{color:'red'}}>You are looser.</em>,
        boxCount: this.userMatrix*this.userMatrix
      });
    }
    //repaint boxes
   this.boxElemRef.forEach(  (elem,i)=>{
      (function () {
       setTimeout(()=>{
        elem.classList.add('bkg');
        elem.classList.remove('disable-click');
       },75*i);
    })(i);
    });
    this.boxElemRef.length = 0;
  }

  matrixBoxClickHandler({target}){
    //remove bacground color and prevent clicking again
    target.classList.remove('bkg');
    target.classList.add('disable-click');
    this.boxElemRef.push(target);
    
    this.setState((state) => {
        const { boxCount = 0 } = state;
        const nextBoxcount = boxCount - 1;
        return {
          boxCount: nextBoxcount
        }
    });
  }

  render(){
    const { matrix = [],msg} = this.state;
    const matrixBowWidth = 100/this.userMatrix;
    const mFlexProp = `0 0 calc(${matrixBowWidth}% - 2px)`;
    return (
      <>
      {msg && <div className="msg">{msg}</div>}
        <div className="matrix-box-container" style={{minWidth: `calc(${this.userMatrix*5}rem + ${this.userMatrix*2}px)`}}>
        <React.Fragment>
          {matrix.map( (val,i) => <div key={i} className="box bkg" 
                     onClick={ (el)=> this.matrixBoxClickHandler(el)} 
                     style={{flex: mFlexProp}}>{i}</div>)}
        </React.Fragment>
        </div>
        </>
    )
  };
}

export default App;