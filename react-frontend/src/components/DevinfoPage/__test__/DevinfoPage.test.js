import React from "react";
import { render, screen } from "@testing-library/react";

import DevinfoPage from "../DevinfoPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders devinfo page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DevinfoPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("devinfo-datatable")).toBeInTheDocument();
    expect(screen.getByRole("devinfo-add-button")).toBeInTheDocument();
});
