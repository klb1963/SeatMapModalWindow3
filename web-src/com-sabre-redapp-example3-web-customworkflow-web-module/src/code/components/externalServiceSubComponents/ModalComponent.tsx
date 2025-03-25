import * as React from 'react';
import {connect} from 'react-redux';
import {context} from '../../Context';
import {StoreData} from '../../interfaces/StoreData';

interface StoreActions {
    setUrl: (url: string) => void;
    setMethod: (method: string) => void;
    setBody: (body: string) => void;
    setHeaders: (headers: string) => void;
}

type ComponentProps = StoreData & StoreActions;

const ModalComponentPure = (props: ComponentProps) => {
    return (
        <div className={'com-sabre-redapp-example3-web-customworkflow-web-module'}>
            <div className={'row'}>
                <div className={'col-xs-6'}>
                    <div className={'url-field form-group'}>
                        <label htmlFor={`${context.getModuleName()}-url-field`}>URL</label>
                        <input
                            id={`${context.getModuleName()}-url-field`}
                            className={'form-control url-field'}
                            onChange={(e) => props.setUrl(e.target.value)}
                            value={props.url}
                        />
                    </div>
                    <div className={'method-field form-group'}>
                        <label htmlFor={`${context.getModuleName()}-method-field`}>Method</label>
                        <input
                            id={`${context.getModuleName()}-method-field`}
                            className={'form-control method-field'}
                            onChange={(e) => props.setMethod(e.target.value)}
                            value={props.method}
                        />
                    </div>
                    <div className={'body-field form-group'}>
                        <label htmlFor={`${context.getModuleName()}-body-field`}>Body</label>
                        <textarea
                            id={`${context.getModuleName()}-body-field`}
                            className={'form-control body-field'}
                            onChange={(e) => props.setBody(e.target.value)}
                            value={props.body}
                            rows={5}
                            cols={90}
                        />
                    </div>
                    <div className={'headers-field form-group'}>
                        <label htmlFor={`${context.getModuleName()}-headers-field`}>Headers</label>
                        <textarea
                            id={`${context.getModuleName()}-headers-field`}
                            className={'form-control headers-field'}
                            onChange={(e) => props.setHeaders(e.target.value)}
                            value={props.headers}
                            rows={10}
                            cols={90}
                        />
                    </div>
                </div>
                <div className={'col-xs-6'}>
                    <div className={'response-field form-group'}>
                        <label htmlFor={`${context.getModuleName()}-response-field`}>Response</label>
                        <textarea
                            id={`${context.getModuleName()}-response-field`}
                            className={'form-control response-field'}
                            value={props.response}
                            rows={30}
                            cols={90}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state: StoreData): StoreData {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUrl: (newVal) => {
            dispatch({type: 'SET_PARAMETER', field: 'url', newVal})
        },
        setMethod: (newVal) => {
            dispatch({type: 'SET_PARAMETER', field: 'method', newVal})
        },
        setBody: (newVal) => {
            dispatch({type: 'SET_PARAMETER', field: 'body', newVal})
        },
        setHeaders: (newVal) => {
            dispatch({type: 'SET_PARAMETER', field: 'headers', newVal})
        }
    };
};

export const ModalComponent = connect<StoreData, StoreActions, never>(mapStateToProps, mapDispatchToProps)(ModalComponentPure);
