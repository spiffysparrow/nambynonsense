var React = require('react');
var Slider = require('./slider');
var History = require('react-router').History;
var ApiUtil = require('../../util/apiUtil.js');

module.exports = React.createClass({
  mixins: [History],
  goToCreate: function(){
    this.history.pushState(null, "new/create");
    if(this.props.centered){
      this.props.toggleCentered();
    }
  },
  finishPoem: function(){
    var poem = this.props.poem
    if(this.props.new){
      ApiUtil.createPoem(poem);
    }else{
      ApiUtil.updatePoem(poem);
    }
    this.history.pushState(null, "/");
  },
  updateStyle: function(e){
    var styleNum = e.target.value;
    this.props.updateColorStyle({color_range: styleNum});
  },
  toggleCentered: function(e){
    this.props.updateColorStyle({centered: !this.props.poem.centered});
  },
  render: function () {
    return(
      <div className="styleToolbar">
        <h4>Styling Toolbar</h4>
        Filter: <input type="number" onChange={this.updateStyle} min="1" max="10"></input>
        <br/>
        <button onClick={this.toggleCentered}>centered?</button>
        <br/>
        <button onClick={this.goToCreate}>B</button>
        <button onClick={this.finishPoem}>Finish></button>
      </div>
    );
  }
});
