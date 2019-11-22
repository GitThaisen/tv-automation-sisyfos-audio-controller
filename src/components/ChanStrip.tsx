import React, { ChangeEvent } from 'react';
import ReactSlider from 'react-slider'

import '../assets/css/ChanStrip.css';
import { MixerProtocolPresets } from '../constants/MixerProtocolPresets';
import { IMixerProtocolGeneric } from '../constants/MixerProtocolInterface';
import { Store } from 'redux';
import { connect } from 'react-redux';
import { 
    TOGGLE_SHOW_CHAN_STRIP,
    TOGGLE_SHOW_OPTION
 } from '../reducers/settingsActions'
import { IFader } from '../reducers/fadersReducer'
import { SET_FADER_LEVEL, SET_FADER_THRESHOLD, SET_FADER_RATIO, SET_FADER_LOW, SET_FADER_MID, SET_FADER_HIGH } from '../reducers/faderActions'

interface IChanStripInjectProps {
    label: string,
    selectedProtocol: string,
    numberOfChannelsInType: Array<number>,
    channel: Array<any>
    fader: Array<IFader>
}

interface IChanStripProps {
    faderIndex: number
}

class ChanStrip extends React.PureComponent<IChanStripProps & IChanStripInjectProps & Store> {
    mixerProtocol: IMixerProtocolGeneric;

    constructor(props: any) {
        super(props);
        this.mixerProtocol = MixerProtocolPresets[this.props.selectedProtocol];
    }

    handleShowRoutingOptions() {
        this.props.dispatch({
            type: TOGGLE_SHOW_OPTION,
            channel: this.props.faderIndex
        });
        this.props.dispatch({
            type: TOGGLE_SHOW_CHAN_STRIP,
            channel: -1
        });
    }

    handleClose = () => {
        this.props.dispatch({
            type: TOGGLE_SHOW_CHAN_STRIP,
            channel: -1
        });
    }

    handleThreshold(event: any) {
        this.props.dispatch({
            type: SET_FADER_THRESHOLD,
            channel: this.props.faderIndex,
            level: parseFloat(event)
        });
        window.mixerGenericConnection.updateOutLevel(this.props.faderIndex);
        if (window.huiRemoteConnection) {
            window.huiRemoteConnection.updateRemoteFaderState(this.props.faderIndex, event)
        }
    }


    threshold() {
        return (
            <div className="parameter-text">
                Threshold
                <ReactSlider 
                    className="chan-strip-fader"
                    thumbClassName = "chan-strip-thumb"
                    orientation = "vertical"
                    invert
                    min={0}
                    max={1}
                    step={0.01}
                    value= {this.props.fader[this.props.faderIndex].threshold}
                    onChange={(event: any) => {
                        this.handleThreshold(event)
                    }}
                />
            </div>
        )
    }

    handleRatio(event: any) {
        this.props.dispatch({
            type: SET_FADER_RATIO,
            channel: this.props.faderIndex,
            level: parseFloat(event)
        });
        window.mixerGenericConnection.updateOutLevel(this.props.faderIndex);
        if (window.huiRemoteConnection) {
            window.huiRemoteConnection.updateRemoteFaderState(this.props.faderIndex, event)
        }
    }
    ratio() {
        return (
            <div className="parameter-text">
                Ratio
                <ReactSlider 
                    className="chan-strip-fader"
                    thumbClassName = "chan-strip-thumb"
                    orientation = "vertical"
                    invert
                    min={0}
                    max={1}
                    step={0.01}
                    value= {this.props.fader[this.props.faderIndex].ratio}
                    onChange={(event: any) => {
                        this.handleRatio(event)
                    }}
                />
            </div>
        )
    }

    handleLow(event: any) {
        this.props.dispatch({
            type: SET_FADER_LOW,
            channel: this.props.faderIndex,
            level: parseFloat(event)
        });
        window.mixerGenericConnection.updateOutLevel(this.props.faderIndex);
        if (window.huiRemoteConnection) {
            window.huiRemoteConnection.updateRemoteFaderState(this.props.faderIndex, event)
        }
    }
    low() {
        return (
            <div className="parameter-text">
                Low
                <ReactSlider 
                    className="chan-strip-fader"
                    thumbClassName = "chan-strip-thumb"
                    orientation = "vertical"
                    invert
                    min={0}
                    max={1}
                    step={0.01}
                    value= {this.props.fader[this.props.faderIndex].low}
                    onChange={(event: any) => {
                        this.handleLow(event)
                    }}
                />
            </div>
        )
    }

    handleMid(event: any) {
        this.props.dispatch({
            type: SET_FADER_MID,
            channel: this.props.faderIndex,
            level: parseFloat(event)
        });
        window.mixerGenericConnection.updateOutLevel(this.props.faderIndex);
        if (window.huiRemoteConnection) {
            window.huiRemoteConnection.updateRemoteFaderState(this.props.faderIndex, event)
        }
    }
    mid() {
        return (
            <div className="parameter-text">
                Mid
                <ReactSlider 
                    className="chan-strip-fader"
                    thumbClassName = "chan-strip-thumb"
                    orientation = "vertical"
                    invert
                    min={0}
                    max={1}
                    step={0.01}
                    value= {this.props.fader[this.props.faderIndex].mid}
                    onChange={(event: any) => {
                        this.handleMid(event)
                    }}
                />
            </div>
        )
    }

    handleHigh(event: any) {
        this.props.dispatch({
            type: SET_FADER_HIGH,
            channel: this.props.faderIndex,
            level: parseFloat(event)
        });
        window.mixerGenericConnection.updateOutLevel(this.props.faderIndex);
        if (window.huiRemoteConnection) {
            window.huiRemoteConnection.updateRemoteFaderState(this.props.faderIndex, event)
        }
    }
    high() {
        return (
            <div className="parameter-text">
                High
                <ReactSlider 
                    className="chan-strip-fader"
                    thumbClassName = "chan-strip-thumb"
                    orientation = "vertical"
                    invert
                    min={0}
                    max={1}
                    step={0.01}
                    value= {this.props.fader[this.props.faderIndex].high}
                    onChange={(event: any) => {
                        this.handleHigh(event)
                    }}
                />
            </div>
        )
    }
    
    monitor(monitor: number, monitorName: string) {
        return (
            <div className="parameter-text">
                {monitorName}
                <ReactSlider 
                    className="chan-strip-fader"
                    thumbClassName = "chan-strip-thumb"
                    orientation = "vertical"
                    invert
                    min={0}
                    max={1}
                    step={0.01}
                    value= {this.props.fader[this.props.faderIndex].monitor[monitor]}
                    onChange={(event: any) => {
                    }}
                />
            </div>
        )
    }

    render() {
        return (
            <div className="chan-strip-body">
                <h2>
                    CHANNEL STRIP: 
                    {this.props.label || ("FADER " + (this.props.faderIndex + 1))}</h2>
                <button 
                    className="close"
                    onClick={() => this.handleClose()}
                >X</button>
                <div className="vertical">
                    COMPRESSOR
                </div>
                <div className="vertical-line"></div>
                {this.threshold()}
                {this.ratio()}
                <div className="vertical-line"></div>
                <div className="vertical">
                    EQ
                </div>
                <div className="vertical-line"></div>
                {this.low()}
                {this.mid()}
                {this.high()}
                <div className="vertical-line"></div>
                <div className="vertical">
                    MONITOR MIX
                </div>
                <div className="vertical-line"></div>
                {this.monitor(0, 'IT')}
                {this.monitor(1, 'KOMM 1')}
                {this.monitor(2, 'KOMM 2')}
                {this.monitor(3, 'KOMM 3')}
                {this.monitor(4, 'KOMM 4')}
                <div className="vertical-line"></div>
                <div className="vertical">
                
                </div>
                <div className="vertical-line"></div>
                <button 
                    className="button"
                    onClick={() => this.handleShowRoutingOptions()}
                >ROUTING</button>
            </div>
        )
    }

}

const mapStateToProps = (state: any, props: any): IChanStripInjectProps => {
    return {
        label: state.faders[0].fader[props.faderIndex].label,
        selectedProtocol: state.settings[0].mixerProtocol,
        numberOfChannelsInType: state.settings[0].numberOfChannelsInType,
        channel: state.channels[0].channel,
        fader: state.faders[0].fader,
    }
}

export default connect<any, IChanStripInjectProps>(mapStateToProps)(ChanStrip) as any;
