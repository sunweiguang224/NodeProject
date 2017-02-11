require('./style.scss');
import React from 'react';
import $ from 'jquery';

export default class ReactRender extends React.Component {

  constructor(props) {
    super(props);

  }
  
  render() {
    return (
      <div>
        <h1 className="bbccdd" onClick={this.clickHandler}>
          哈哈{new Date().toLocaleDateString()}哈
        </h1>
        <p>PPPP</p>
      </div>
    );
  }

  clickHandler = (e) => {
    var $ts = $(e.currentTarget);
    debugger
  };

  componentDidMount() {
    var ts = this;
    $('p').click(function () {
      ts;
      debugger
    })
  }
}
