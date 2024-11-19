import React from 'react';
import {Navbar, Nav, NavDropdown, Container, Offcanvas} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

export const NavbarApp = () => {
    const userRole = localStorage.getItem("userRole");

    return (
        <>
            {['lg'].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-body-tertiary" bg="success" data-bs-theme="success"
                        sticky="top">
                    <Container>
                        <Navbar.Brand href="#">
                            <img
                                alt=""
                                src="https://quanlychungcuhaiphong.vn/upload/icon/9-3-2024/lexico-53-70.png"
                                height="50"
                                className="d-inline-block align-top"
                            />{' '}
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}/>
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Offcanvas
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link href="/home">Trang chủ</Nav.Link>
                                    <Nav.Link href="/floor/list">Quản lý tầng</Nav.Link>
                                    <Nav.Link href="/staff/list">Nhân Viên</Nav.Link>
                                    <NavDropdown
                                        title="Dropdown"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="/salary">
                                            Bảng lương
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item href="report">
                                            Doanh thu
                                        </NavDropdown.Item>
                                        {userRole === "ADMIN" ?
                                            <NavDropdown.Item href="/building/edit">Sửa toà nhà</NavDropdown.Item> : ""}
                                    </NavDropdown>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    )
}