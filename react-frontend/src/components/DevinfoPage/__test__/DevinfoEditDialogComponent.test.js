import React from "react";
import { render, screen } from "@testing-library/react";

import DevinfoEditDialogComponent from "../DevinfoEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders devinfo edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DevinfoEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("devinfo-edit-dialog-component")).toBeInTheDocument();
});
