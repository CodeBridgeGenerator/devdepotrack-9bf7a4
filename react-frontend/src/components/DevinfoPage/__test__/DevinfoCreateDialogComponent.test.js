import React from "react";
import { render, screen } from "@testing-library/react";

import DevinfoCreateDialogComponent from "../DevinfoCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders devinfo create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DevinfoCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("devinfo-create-dialog-component")).toBeInTheDocument();
});
