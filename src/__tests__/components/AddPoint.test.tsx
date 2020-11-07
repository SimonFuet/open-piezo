import { fireEvent } from '@testing-library/react';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import AddPoint from '../../Component/AddPoint';
import { VtkPoint } from '../../store/vtk/types';

let container: HTMLDivElement = document.createElement("div");
beforeEach(() => {
    document.body.appendChild(container);
})

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = document.createElement("div");
})

const addPointFn: jest.Mock<VtkPoint, any> = jest.fn();

it("renders add point component and creates a point", () => {
    act(() => {
        render(<AddPoint addPoint={(point) => addPointFn(point)} />, container);
    });

    const inputs = container.getElementsByTagName("input");
    expect(inputs.length).toBe(3);
    expect(inputs[0].name).toBe("x");
    expect(inputs[0].value).toBe("0");
    expect(inputs[1].name).toBe("y");
    expect(inputs[1].value).toBe("0");
    expect(inputs[2].name).toBe("value");
    expect(inputs[2].value).toBe("0");
    const button = container.getElementsByTagName("button");
    expect(button.length).toBe(1);
    expect(button[0].textContent).toBe("Add point");
    expect(addPointFn).toHaveBeenCalledTimes(0);

    act(() => {
        fireEvent.change(inputs[0], { target: { value: "10" } });
    });
    expect(inputs[0].value).toBe("10");
    expect(inputs[1].value).toBe("0");
    expect(inputs[2].value).toBe("0");
    expect(addPointFn).toHaveBeenCalledTimes(0);

    act(() => {
        fireEvent.change(inputs[2], { target: { value: "-35.2" } });
    });
    expect(inputs[0].value).toBe("10");
    expect(inputs[1].value).toBe("0");
    expect(inputs[2].value).toBe("-35.2");
    expect(addPointFn).toHaveBeenCalledTimes(0);

    act(() => {
        fireEvent.change(inputs[1], { target: { value: "1." } });
    });
    expect(inputs[0].value).toBe("10");
    expect(inputs[1].value).toBe("1.");
    expect(inputs[2].value).toBe("-35.2");
    expect(addPointFn).toHaveBeenCalledTimes(0);

    act(() => {
        button[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(inputs[0].value).toBe("10");
    expect(inputs[1].value).toBe("1.");
    expect(inputs[2].value).toBe("-35.2");
    expect(addPointFn).toHaveBeenCalledTimes(1);
    expect(addPointFn.mock.calls[0]).toEqual([{ x: 10, y: 1, value: -35.2 }]);
});

it("renders add point component and fails creating a point with non number parameters", () => {
    act(() => {
        render(<AddPoint addPoint={(point) => addPointFn(point)} />, container);
    });

    const inputs = container.getElementsByTagName("input");
    expect(inputs.length).toBe(3);
    expect(inputs[0].name).toBe("x");
    expect(inputs[0].value).toBe("0");
    expect(inputs[1].name).toBe("y");
    expect(inputs[1].value).toBe("0");
    expect(inputs[2].name).toBe("value");
    expect(inputs[2].value).toBe("0");
    const button = container.getElementsByTagName("button");
    expect(button.length).toBe(1);
    expect(button[0].textContent).toBe("Add point");
    expect(addPointFn).toHaveBeenCalledTimes(0);

    act(() => {
        fireEvent.change(inputs[0], { target: { value: "10a" } });
    });
    expect(inputs[0].value).toBe("10a");
    expect(inputs[1].value).toBe("0");
    expect(inputs[2].value).toBe("0");
    expect(addPointFn).toHaveBeenCalledTimes(0);

    act(() => {
        fireEvent.change(inputs[2], { target: { value: "-3sf5.2" } });
    });
    expect(inputs[0].value).toBe("10a");
    expect(inputs[1].value).toBe("0");
    expect(inputs[2].value).toBe("-3sf5.2");
    expect(addPointFn).toHaveBeenCalledTimes(0);

    act(() => {
        fireEvent.change(inputs[1], { target: { value: "sg1." } });
    });
    expect(inputs[0].value).toBe("10a");
    expect(inputs[1].value).toBe("sg1.");
    expect(inputs[2].value).toBe("-3sf5.2");
    expect(addPointFn).toHaveBeenCalledTimes(0);

    act(() => {
        button[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(inputs[0].value).toBe("10a");
    expect(inputs[1].value).toBe("sg1.");
    expect(inputs[2].value).toBe("-3sf5.2");
    expect(addPointFn).toHaveBeenCalledTimes(0);
});