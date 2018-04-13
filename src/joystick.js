import React, { Component } from 'react'
import * as math from 'mathjs'

class Joystick extends Component {
    constructor(props, context) {
        super(props, context)
        this.container = React.createRef();
        this.circle = React.createRef();
        this.point = React.createRef();
        this.state = {
            started: false,
            startPosition: [null, null],
        };
    }
    componentDidMount() {
        this.circle.current.style.width = this.props.diameter + "px";
        this.circle.current.style.height = this.props.diameter + "px";
        this.circle.current.style.borderRadius = this.props.diameter/2 + "px";

        this.point.current.style.width = this.props.pointDiameter + "px";
        this.point.current.style.height = this.props.pointDiameter + "px";
        this.point.current.style.borderRadius = this.props.pointDiameter/2 + "px";
    }
    distance(coords) {
        const xPow2 = math.pow((this.state.startPosition[0] - coords[0]), 2)
        const yPow2 = math.pow((this.state.startPosition[1] - coords[1]), 2)
        return math.sqrt(xPow2 + yPow2)
    }
    setJoystick() {
        const left = this.state.startPosition[0] - this.container.current.offsetLeft - this.props.diameter/2;
        const top = this.state.startPosition[1] - this.container.current.offsetTop - this.props.diameter/2;
        this.circle.current.style.top = top + "px";
        this.circle.current.style.left = left + "px";
        this.circle.current.style.display = "block";

        this.movePoint(this.state.startPosition)
    }
    clearJoystick() {
        this.circle.current.style.display = "none";
    }
    moveEvent(e) {
        if (this.state.started) {
            this.movePoint([e.clientX, e.clientY])
        }
    }
    movePoint(coords) {
        console.log(coords)
        const dist = this.distance(coords)
        let left = coords[0] - this.state.startPosition[0];
        let top = coords[1] - this.state.startPosition[1];
        if (dist > this.props.diameter/2) {
           left = (left * this.props.diameter) / (dist * 2)
           top = (top * this.props.diameter) / (dist * 2)
        }
        this.point.current.style.top = this.props.diameter/2 - this.props.pointDiameter/2 + top + "px";
        this.point.current.style.left = this.props.diameter/2 - this.props.pointDiameter/2 + left + "px";    
    }
    startMove(e) {
        const coords = [e.clientX, e.clientY];
        this.setState({ started: true});
        const that = this;
        this.setState({ startPosition: coords }, function () {
            that.setJoystick(coords)
        });        
    }
    stopMove(e) {
        this.setState({ started: false});
        this.setState({ startPosition: [null, null]});
        this.clearJoystick();
    }
    render() {
        return (
            <div  
                ref={this.container} 
                onMouseDown={this.startMove.bind(this)} 
                onTouchStart={this.startMove.bind(this)} 
                onMouseUp={this.stopMove.bind(this)} 
                onTouchEnd={this.stopMove.bind(this)} 
                onMouseOut={this.stopMove.bind(this)}  
                onMouseMove={this.moveEvent.bind(this)}  
                onTouchMove={this.stopMove.bind(this)} 
                className="joystick-container">
                <div className="canvas" >
                    <div ref={this.circle}>
                        <div ref={this.point}>                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Joystick
