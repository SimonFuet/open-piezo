import React, { ChangeEvent } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { VtkPoint } from '../store/vtk/types';

interface State {
    point: {
        x: {
            value: string,
            isValid: boolean
        },
        y: {
            value: string,
            isValid: boolean
        },
        value: {
            value: string,
            isValid: boolean
        }
    }
}

interface Props {
    addPoint(point: VtkPoint): void
}

function isFloat(val: string) {
    var floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
    if (!floatRegex.test(val))
        return false;

    if (isNaN(parseFloat(val)))
        return false;
    return true;
}

export default class AddPoint extends React.Component<Props, {}> {
    state: State
    constructor(props: Props) {
        super(props);
        this.state = {
            point: {
                x: { value: "0", isValid: true },
                y: { value: "0", isValid: true },
                value: { value: "0", isValid: true }
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        let newState = { ...this.state };
        switch (event.target.name) {
            case "x":
                newState.point.x.value = event.target.value;
                newState.point.x.isValid = isFloat(newState.point.x.value);
                break;
            case "y":
                newState.point.y.value = event.target.value;
                newState.point.y.isValid = isFloat(newState.point.y.value);
                break;
            case "z":
                newState.point.value.value = event.target.value;
                newState.point.value.isValid = isFloat(newState.point.value.value);
                break;
        }
        this.setState(newState);
    }

    handleClick(event: React.MouseEvent<HTMLElement>) {
        const point = this.state.point;

        if (!isFloat(point.x.value) || !isFloat(point.y.value) || !isFloat(point.value.value)) return;

        this.props.addPoint(
            {
                x: parseFloat(point.x.value),
                y: parseFloat(point.y.value),
                value: parseFloat(point.value.value)
            }
        );
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">x</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="text"
                                name="x"
                                defaultValue={this.state.point.x.value}
                                isInvalid={!this.state.point.x.isValid}
                                onChange={this.handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">y</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="text"
                                name="y"
                                defaultValue={this.state.point.y.value}
                                isInvalid={!this.state.point.y.isValid}
                                onChange={this.handleChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">z</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="text"
                                name="z"
                                defaultValue={this.state.point.value.value}
                                isInvalid={!this.state.point.value.isValid}
                                onChange={this.handleChange} />
                        </Col>
                    </Form.Group>
                </Form>
                <Button onClick={this.handleClick} disabled={!this.state.point.x.isValid || !this.state.point.y.isValid || !this.state.point.value.isValid}>
                    Add point
                </Button>
            </div>
        )
    }
}