import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Navbar as BootstrapNavbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import Image from "next/image";
import FinanceShastraLogo from "./fs-white.png";
import "./Navbar.css";

interface NavbarProps {
    setActiveComponent: (component: string) => void;
}

const AdminNavbar: React.FC<NavbarProps> = ({ setActiveComponent }) => {
    const router = useRouter();

    const handleLogout = () => {
        console.log("User logged out");
        router.push("/");
    };

    return (
        <BootstrapNavbar expand="lg" bg="success" variant="dark" className="px-3">
            <Container fluid>
                <BootstrapNavbar.Brand href="/">
                    <Image src={FinanceShastraLogo} alt="logo" height={120} className="logo" />
                    Admin Panel
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="navbarNav" />
                <BootstrapNavbar.Collapse id="navbarNav" className="justify-content-between">
                    <Nav className="me-auto">
                        <Link href="/users" passHref legacyBehavior>
                            <Nav.Link>User</Nav.Link>
                        </Link>
                        <Link href="/recommendations" passHref legacyBehavior>
                            <Nav.Link>Recommendations</Nav.Link>
                        </Link>

                        <NavDropdown title="Subscription" id="navbarDropdownSubscription">
                            <NavDropdown.Item
                                onClick={() => setActiveComponent("addSubscription")}
                            >
                                Add Subscription
                            </NavDropdown.Item>
                            <Link href="/adminDashboard/manage-subscription" passHref legacyBehavior>
                                <NavDropdown.Item>Manage Subscription</NavDropdown.Item>
                            </Link>
                        </NavDropdown>

                        <NavDropdown title="Learn" id="navbarDropdownLearn">
                            <NavDropdown.Item
                                onClick={() => setActiveComponent("createBlog")}
                            >
                                Create Blog
                            </NavDropdown.Item>
                            <Link href="/edit-blog" passHref legacyBehavior>
                                <NavDropdown.Item>Edit/Delete Blog</NavDropdown.Item>
                            </Link>
                            <Link href="/create-news" passHref legacyBehavior>
                                <NavDropdown.Item>Create News</NavDropdown.Item>
                            </Link>
                            <Link href="/edit-news" passHref legacyBehavior>
                                <NavDropdown.Item>Edit/Delete News</NavDropdown.Item>
                            </Link>
                            <Link href="/create-course" passHref legacyBehavior>
                                <NavDropdown.Item>Create Course</NavDropdown.Item>
                            </Link>
                            <Link href="/edit-course" passHref legacyBehavior>
                                <NavDropdown.Item>Edit/Delete Course</NavDropdown.Item>
                            </Link>
                        </NavDropdown>

                        <NavDropdown title="Company" id="navbarDropdownCompany">
                            <Link href="/add-company" passHref legacyBehavior>
                                <NavDropdown.Item>Add Company</NavDropdown.Item>
                            </Link>
                            <Link href="/manage-company" passHref legacyBehavior>
                                <NavDropdown.Item>Manage Company</NavDropdown.Item>
                            </Link>
                        </NavDropdown>
                    </Nav>

                    <Button variant="outline-light" onClick={handleLogout}>
                        <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
                    </Button>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default AdminNavbar;
