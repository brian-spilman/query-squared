import { render, screen } from "@testing-library/react";
import App from "../App";

test("Player viewer test, fname, lname and career stats", async ()=>{
    render(<App/>);

    //const element = await screen.findByRole("list");

    const player1 = await screen.findByText(/Billy/);
    const player2 = await screen.findByText(/Marcus/);
})