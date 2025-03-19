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
                        <Link href="#" passHref legacyBehavior>
                            <Nav.Link onClick={() => setActiveComponent("users")}>User</Nav.Link>
                        </Link>
                        <Link href="#" passHref legacyBehavior>
                            <Nav.Link onClick={() => setActiveComponent("recommendations")}>Recommendations</Nav.Link>
                        </Link>

                        <NavDropdown title="Subscription" id="navbarDropdownSubscription">
                            <NavDropdown.Item
                                onClick={() => setActiveComponent("addSubscription")}
                            >
                                Add Subscription
                            </NavDropdown.Item>
                            <Link href="#" passHref legacyBehavior>
                                <NavDropdown.Item onClick={() => setActiveComponent("manage-subscription")} >Manage Subscription</NavDropdown.Item>
                            </Link>
                        </NavDropdown>

                        <NavDropdown title="Learn" id="navbarDropdownLearn">
                            <NavDropdown.Item
                                onClick={() => setActiveComponent("createBlog")}
                            >
                                Create Blog
                            </NavDropdown.Item>
                            <Link href="#" passHref legacyBehavior>
                                <NavDropdown.Item  onClick={() => setActiveComponent("editdelete-blog")}>Edit/Delete Blog</NavDropdown.Item>
                            </Link>
                            <Link href="#" passHref legacyBehavior>
                                <NavDropdown.Item onClick={() => setActiveComponent("createnews")}>Create News</NavDropdown.Item>
                            </Link>
                            <Link href="/edit-news" passHref legacyBehavior>
                                <NavDropdown.Item onClick={() => setActiveComponent("editdelete-news")}>Edit/Delete News</NavDropdown.Item>
                            </Link>
                            <Link href="/create-course" passHref legacyBehavior>
                                <NavDropdown.Item onClick={() => setActiveComponent("create-course")}>Create Course</NavDropdown.Item>
                            </Link>
                            <Link href="/edit-course" passHref legacyBehavior>
                                <NavDropdown.Item onClick={() => setActiveComponent("editDelete-course")} >Edit/Delete Course</NavDropdown.Item>
                            </Link>
                        </NavDropdown>

                        <NavDropdown title="Company" id="navbarDropdownCompany">
                            <Link href="/add-company" passHref legacyBehavior>
                                <NavDropdown.Item onClick={() => setActiveComponent("add-company")}  >Add Company</NavDropdown.Item>
                            </Link>
                            <Link href="/manage-company" passHref legacyBehavior>
                                <NavDropdown.Item onClick={() => setActiveComponent("manage-company")}  >Manage Company</NavDropdown.Item>
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
