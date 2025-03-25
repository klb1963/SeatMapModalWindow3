import {Button} from 'react-bootstrap';
import * as React from 'react';

export const actions = (onClose: () => void, onSubmit: () => void): JSX.Element[] => [
    <Button
        key={1}
        className="btn-secondary"
        onClick={onClose}
    >
        Close
    </Button>,
    <Button
        key={1}
        className="btn-success"
        onClick={onSubmit}
    >
        Submit
    </Button>]