import React, { Component } from 'react'
//import * as math from 'mathjs'

class Joystick extends Component {
    constructor(props, context) {
        super(props, context)
        this.canvas = React.createRef();
        this.container = React.createRef();
        this.circle = React.createRef();
        this.point = React.createRef();
        this.state = {
            started: false,
            startPosition: [null, null],
        };
    }
    distance(coords) {
        const xPow2 = Math.pow((this.state.startPosition[0] - coords[0]), 2)
        const yPow2 = Math.pow((this.state.startPosition[1] - coords[1]), 2)
        return Math.SQRT2(xPow2 + yPow2)
    }
    componentDidMount() {
        this.circle.current.style.width = this.props.radius + "px";
        this.circle.current.style.height = this.props.radius + "px";
        this.circle.current.style.borderRadius = this.props.radius/2 + "px";

        this.point.current.style.width = this.props.pointRadius + "px";
        this.point.current.style.height = this.props.pointRadius + "px";
        this.point.current.style.borderRadius = this.props.pointRadius/2 + "px";
}
    setJoystick() {
        const left = this.state.startPosition[0] - this.container.current.offsetLeft - this.props.radius/2;
        const top = this.state.startPosition[1] - this.container.current.offsetTop - this.props.radius/2;
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
        //console.log([e.clientX, e.clientY])
        //if (this.distance(coords) <= this.props.radius) {
        if (true) {
            const left = coords[0] - this.state.startPosition[0];
            const top = coords[1] - this.state.startPosition[1];
            this.point.current.style.top = this.props.radius/2 - this.props.pointRadius/2 + top + "px";
            this.point.current.style.left = this.props.radius/2 - this.props.pointRadius/2 + left + "px";    
        }
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
        //console.log([e.clientX, e.clientY])
        this.setState({ started: false});
        this.setState({ startPosition: [null, null]});
        this.clearJoystick();
    }
    render() {
        return (
            <div  
                ref={this.container} 
                onMouseDown={this.startMove.bind(this)} 
                onMouseUp={this.stopMove.bind(this)} 
                onMouseOut={this.stopMove.bind(this)}  
                onMouseMove={this.moveEvent.bind(this)}  
                className="joystick-container">
                <div className="canvas" ref={this.canvas} >
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
