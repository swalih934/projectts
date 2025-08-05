import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { editProjectApi } from '../services/AllApies';
import { toast } from 'react-toastify';
function Edit({ project, onUpdate }) {
    const [show, setShow] = useState(false);
    const [projectDetail, setProjectDetail] = useState({
        title: '',
        description: '',
        completed: false
    });

    useEffect(() => {
        if (project) {
            setProjectDetail({
                title: project.title || '',
                description: project.description || '',
                completed: project.completed || false
            });
        }
    }, [project]);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleEdit = async () => {
        const updatedProject = {
            title: projectDetail.title.trim(),
            description: projectDetail.description.trim(),
            completed: projectDetail.completed
        };

        try {
            const result = await editProjectApi(project._id, updatedProject);

            if (result.status === 200) {
                toast.success("Project updated successfully!");
                onUpdate(result.data);
                handleClose();
            } else {
                toast.warning("Failed to update project");
            }
        } catch (error) {
            console.error("Error updating project:", error);
            toast.warning("Error occurred while updating");
        }
    };
    return (
        <>

            <button className='btn'>
                <i onClick={handleShow} className="fa-solid fa-pen-to-square fa-lg" style={{ color: '#63E6BE' }}></i>

            </button>
            <Modal show={show} onHide={handleClose} backdrop="static" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formProjectTitle">
                            <Form.Label>Project Title</Form.Label>
                            <Form.Control  type="text" value={projectDetail?.title}  onChange={(e) => setProjectDetail({ ...projectDetail, title: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formProjectDocs">
                            <Form.Label>Description</Form.Label>
                            <Form.Control  type="text"  value={projectDetail.description}
                                onChange={(e) => setProjectDetail({ ...projectDetail, description: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="projectStatus" className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select value={projectDetail.completed}
                                onChange={(e) =>  setProjectDetail({ ...projectDetail, completed: e.target.value === 'true' })} >
                                <option value="">Select status</option>
                                <option value="true">Completed</option>
                                <option value="false">Incomplete</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleEdit}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Edit;




