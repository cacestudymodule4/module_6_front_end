import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {FaSearch} from 'react-icons/fa';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import {useNavigate} from "react-router-dom";
import {Button, Form, Modal} from "react-bootstrap";
import {Form as FormikForm, Formik, Field} from "formik";
import {NavbarApp} from "../common/Navbar";
import Footer from "../common/Footer";

function Staff() {
    const navigate = useNavigate();
    const [staffList, setStaffList] = useState([]);
    const [filteredStaffList, setFilteredStaffList] = useState([]);
    const [staffDelete, setStaffDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 4;

    useEffect(() => {
        axios.get(`http://localhost:8080/api/staff/list?page=${currentPage}&size=${pageSize}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('jwtToken')}`}
        })
            .then(response => {
                setStaffList(response.data.content);
                setFilteredStaffList(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => toast.error("Lỗi khi tải danh sách nhân viên"));
    }, [currentPage]);

    const handleOpenModal = (staff) => {
        setStaffDelete(staff);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setStaffDelete(null);
    };

    const handleDeleteStaff = async () => {
        if (!staffDelete || !staffDelete.id) {
            toast.error("Chọn nhân viên hợp lệ để xóa");
            return;
        }

        try {
            await axios.delete(`http://localhost:8080/api/staff/delete/${staffDelete.id}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('jwtToken')}`}
            });
            setStaffList(staffList.filter(emp => emp.id !== staffDelete.id));
            handleCloseModal();
            toast.success("Nhân viên đã được xóa thành công!");
        } catch (error) {
            toast.error("Có lỗi xảy ra khi xóa nhân viên");
        }
    };

    const handleAddStaff = () => {
        navigate('/staff/add');
    };

    const handleSearch = async (values) => {
        const data = {
            codeStaff: `%${values.codeStaff}%`,
            name: `%${values.name}%`,
            position: `%${values.position}%`,
        };
        try {
            const response = await axios.get('http://localhost:8080/api/staff/search', {
                headers: {Authorization: `Bearer ${localStorage.getItem('jwtToken')}`},
                params: data
            });
            if (response.status === 200) {
                setFilteredStaffList(response.data);
            }
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi tìm kiếm nhân viên");
        }
    };

    const handleEditStaff = (id) => {
        navigate(`/staff/edit/${id}`);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <>
            <NavbarApp/>
            <div className="container-fluid my-5 rounded mx-auto p-4" style={{minHeight: '45vh'}}>
                <h3 className="text-center text-white py-3 bg-success rounded mb-5" style={{fontSize: '2.25rem'}}>
                    Danh sách nhân viên văn phòng
                </h3>

                <Formik
                    initialValues={{
                        codeStaff: "",
                        name: "",
                        position: "",
                    }}
                    onSubmit={(values) => handleSearch(values)}>
                    {() => (
                        <FormikForm className="mb-3 custom-search">
                            <Form.Group className="mb-3" controlId="formSearch">
                                <Form.Label className="small-label">Tìm theo mã nhân viên</Form.Label>
                                <Field
                                    as={Form.Control}
                                    type="text"
                                    placeholder="Nhập mã nhân viên"
                                    name="codeStaff"
                                    style={{marginBottom: '0.5rem'}}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formSearch">
                                <Form.Label className="small-label">Tìm kiếm theo tên nhân viên</Form.Label>
                                <Field
                                    as={Form.Control}
                                    type="text"
                                    placeholder="Nhập tên nhân viên"
                                    name="name"
                                    style={{marginBottom: '0.5rem'}}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formSearch">
                                <Form.Label className="small-label">Tìm kiếm theo vị trí</Form.Label>
                                <Field
                                    as={Form.Control}
                                    type="text"
                                    placeholder="Nhập vị trí"
                                    name="position"
                                    style={{marginBottom: '0.5rem'}}
                                />
                            </Form.Group>

                            <Button variant="secondary" type="submit" className="search" style={{borderRadius: '50%'}}>
                                <FaSearch/>
                            </Button>
                        </FormikForm>
                    )}
                </Formik>

                <Button
                    variant="success"
                    onClick={handleAddStaff}
                    style={{
                        fontSize: '1.1rem',
                        padding: '0.75rem 2rem',
                        marginTop: '1rem',
                    }}
                    className='mb-4'>
                    Thêm mới nhân viên
                </Button>

                <div className="table-responsive">
                    <table className="table table-hover table-bordered border-success" style={{fontSize: '1.05rem'}}>
                        <thead className="table-success">
                        <tr>
                            <th className="text-center">STT</th>
                            <th className="text-center">Mã nhân viên</th>
                            <th className="text-center">Họ tên</th>
                            <th className="text-center">Ngày sinh</th>
                            <th className="text-center">Giới tính</th>
                            <th className="text-center">Địa chỉ</th>
                            <th className="text-center">Điện thoại</th>
                            <th className="text-center">Email</th>
                            <th className="text-center">Lương</th>
                            <th className="text-center">Ngày làm việc</th>
                            <th className="text-center">Vị trí</th>
                            <th className="text-center">Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredStaffList.map((staff, index) => (
                            <tr key={staff.id}>
                                <td className="text-center">{index + 1}</td>
                                <td className="text-center">{staff.codeStaff}</td>
                                <td className="text-center">{staff.name}</td>
                                <td className="text-center">{moment(staff.birthDate, 'YYYY-MM-DD').format('DD-MM-YYYY')}</td>
                                <td className="text-center">{staff.gender ? 'Nam' : 'Nữ'}</td>
                                <td className="text-center">{staff.address}</td>
                                <td className="text-center">{staff.phone}</td>
                                <td className="text-center">{staff.email}</td>
                                <td className="text-center">{staff.salary}</td>
                                <td className="text-center">{moment(staff.startDate, 'YYYY-MM-DD').format('DD-MM-YYYY')}</td>
                                <td className="text-center">{staff.position}</td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        style={{fontSize: '0.9rem'}}
                                        onClick={() => handleEditStaff(staff.id)}>
                                        Cập nhật
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm me-2"
                                        onClick={() => handleOpenModal(staff)}
                                        style={{fontSize: '0.9rem'}}>
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="d-flex justify-content-between">
                    <button
                        className="btn btn-secondary"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}>
                        Previous
                    </button>
                    <span className="my-auto">Page {currentPage + 1} of {totalPages}</span>
                    <button
                        className="btn btn-secondary"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}>
                        Next
                    </button>
                </div>

                <Modal show={isModalOpen} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Xác nhận xóa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Bạn có chắc chắn muốn xóa nhân viên này không?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Hủy
                        </Button>
                        <Button variant="danger" onClick={handleDeleteStaff}>
                            Xóa
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <Footer/>
        </>
    );
}

export default Staff;
