import * as React from 'react';
import { connect } from "react-redux";

//assets:
import '../assets/css/VuMeter.css';
//Utils:
import { IMixerProtocol, MixerProtocolPresets, IMixerProtocolGeneric } from '../constants/MixerProtocolPresets';
import { any } from 'prop-types';

interface IVuMeterInjectedProps {
    showSnaps: boolean
    mixerProtocol: string
    vuVal: number
}

interface IVuMeterProps {
    channelIndex: number
}

class VuMeter extends React.PureComponent<IVuMeterProps & IVuMeterInjectedProps> {
    channelIndex: number;
    mixerProtocol: IMixerProtocolGeneric;

    constructor(props: any) {
        super(props);
        this.channelIndex = this.props.channelIndex;

        this.mixerProtocol = MixerProtocolPresets[this.props.mixerProtocol]  || MixerProtocolPresets.genericMidi;
    }

    totalHeight = () => {
        return (this.props.showSnaps ? 1 : 2) * 200 / (this.mixerProtocol.meter.max - this.mixerProtocol.meter.min);
    }

    calcLower = () => {
        let val = this.props.vuVal;
        if (val >= this.mixerProtocol.meter.test) {
            val = this.mixerProtocol.meter.test;
        }
        return this.totalHeight()*val;
    }

    calcMiddle = () => {
        let val = this.props.vuVal;
        if (val < this.mixerProtocol.meter.test) {
            val = this.mixerProtocol.meter.test;
        } else if (val >= this.mixerProtocol.meter.zero) {
            val = this.mixerProtocol.meter.zero;
        }
        return this.totalHeight()*(val-this.mixerProtocol.meter.test)+1;
    }

    calcUpper = () => {
        let val = this.props.vuVal;
        if (val < this.mixerProtocol.meter.zero) {
            val = this.mixerProtocol.meter.zero;
        }
        return this.totalHeight()*(val-this.mixerProtocol.meter.zero)+1;
    }

    render() {

        return (
            <div className="vumeter-body"
                style={{
                    "height" : this.totalHeight() + 30
                }}
            >
                <canvas
                    className="vumeter-lower-part"
                    style={
                        {
                            "height": this.calcLower(),
                            "top": "5px"
                        }
                    }
                ></canvas>
                <canvas
                    className="vumeter-middle-part"
                    style={
                        {
                            "height": this.calcMiddle(),
                            "top": this.totalHeight()*this.mixerProtocol.meter.test+5
                        }
                    }
                ></canvas>
                <canvas
                    className="vumeter-upper-part"
                    style={
                        {
                            "height": this.calcUpper(),
                            "top": this.totalHeight()*this.mixerProtocol.meter.zero+5
                        }
                    }></canvas>

            </div>
        )
    }
}

const mapStateToProps = (state: any, props: any): IVuMeterInjectedProps => {
    return {
        vuVal: state.channels[0].vuMeters[props.channelIndex].vuVal,
        mixerProtocol: state.settings[0].mixerProtocol,
        showSnaps: state.settings[0].showSnaps
    }
}

export default connect<IVuMeterInjectedProps, any, any>(mapStateToProps)(VuMeter);