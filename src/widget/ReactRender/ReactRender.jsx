import React from 'react';
import style from './style.scss';

export default class ReactRender extends React.Component{
  clickHandler(event){
    debugger
  }

  render(){
    return (
      <div onClick={this.clickHandler}>
        <h1 className="aaa">哈哈{new Date().toLocaleDateString()}哈</h1>
        <p>PPPP</p>
      </div>
    )
  }
}
