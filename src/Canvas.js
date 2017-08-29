import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.repaint = this.repaint.bind(this);
  }

  render() {
    return (
      <canvas
        width={this.props.image.naturalWidth || 640}
        height={this.props.image.naturalHeight || 480}
        style={{position: "absolute"}}>Canvas not supported.</canvas>
    );
  }

  componentDidMount() {
    console.log('mount');
    var ctx = ReactDOM.findDOMNode(this).getContext('2d');
    this.repaint(ctx);
  }

  componentDidUpdate() {
    console.log('update');
    var ctx = ReactDOM.findDOMNode(this).getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    this.repaint(ctx);
  }

  repaint(ctx) {
    ctx.save();
    ctx.drawImage(this.props.image, 0, 0);
    this.applyMasks();
    ctx.restore();
  }

  applyMasks() {
    if (this.props.masks && this.props.masks.length) {
      console.log(`Applying ${this.props.masks.length} masks.`);
    } else {
      console.log("Applying no masks.");
    }
  }
}

export default Canvas;
