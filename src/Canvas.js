import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ShiftRgbMask from './masks/ShiftRgbMask.js';
import XorMask from './masks/XorMask.js';
import InvertMask from './masks/InvertMask.js';
import { FlipVertMask, FlipHorizMask } from './masks/FlipMask.js';
import { VertGlassMask, HorizGlassMask } from './masks/GlassMask.js';
import WinMask from './masks/WinMask.js';
import { MekoPlusMask, MekoMinusMask } from './masks/MekoMask.js';
import FLMask from './masks/FLMask.js';
import Q0Mask from './masks/Q0Mask.js';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.repaint = this.repaint.bind(this);
  }

  render() {
    return (
      <canvas
        width={this.props.width}
        height={this.props.height}
        className="canvas-canvas">Canvas not supported.</canvas>
    );
  }

  componentDidMount() {
    var ctx = this.getContext();
    this.repaint(ctx);
  }

  componentDidUpdate() {
    var ctx = this.getContext();
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    this.repaint(ctx);
  }

  repaint(ctx) {
    ctx.save();
    ctx.drawImage(this.getImage(), 0, 0);
    this.applyMasks();
    ctx.restore();
  }

  getImage() {
    return this.props.image;
  }

  applyMasks() {
    if (!this.props.masks || !this.props.masks.length) {
      return;
    }

    var ctx = this.getContext();
    for (var i = 0; i < this.props.masks.length; i++) {
      var here = this.props.masks[i];
      var selection = { x:here.x, y:here.y, w:here.w, h:here.h };
      switch (here.type) {
        case "shiftrgb":
          new ShiftRgbMask().applyMask(ctx, selection);
          break;
        case "xor":
          new XorMask().applyMask(ctx, selection);
          break;
        case "invert":
          new InvertMask().applyMask(ctx, selection);
          break;
        case "flipvert":
          new FlipVertMask().applyMask(ctx, selection);
          break;
        case "fliphoriz":
          new FlipHorizMask().applyMask(ctx, selection);
          break;
        case "vertglass":
          new VertGlassMask().applyMask(ctx, selection);
          break;
        case "horizglass":
          new HorizGlassMask().applyMask(ctx, selection);
          break;
        case "win":
          new WinMask().applyMask(ctx, selection);
          break;
        case "mekoplus":
          new MekoPlusMask().applyMask(ctx, selection);
          break;
        case "mekominus":
          new MekoMinusMask().applyMask(ctx, selection);
          break;
        case "fl":
          new FLMask().applyMask(ctx, selection);
          break;
        case "q0":
          new Q0Mask().applyMask(ctx, selection);
          break;
        default:
          console.log(`Unknown mask type ${here.type}`);
          break;
      }
    }
  }

  getContext() {
    return ReactDOM.findDOMNode(this).getContext('2d');
  }
}

export default Canvas;
