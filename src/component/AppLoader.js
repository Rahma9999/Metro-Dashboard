import { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { ThemeContext } from "../services/ThemeContext";

export function AppLoader() {
    const { theme } = useContext(ThemeContext);
    return (
        <div>
            <div className="position-absolute top-50 start-50 translate-middle">
                <Spinner animation="border" variant={(theme === 'dark')? 'light' : 'dark'} />
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}