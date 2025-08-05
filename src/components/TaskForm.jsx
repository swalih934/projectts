import React from 'react'
import { useState,useContext,useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Row,Col,Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { addProjectApi } from '../services/AllApies';
import { toast } from 'react-toastify';
import { addProjectResponseContext } from '../context/ContextApi';
function TaskForm() {

  const [show, setShow] = useState(false);

     const {addResponse,setAddResponse}=useContext(addProjectResponseContext)


     const [project,setProject]=useState({
      title:"",description:"",completed:"",createdAt:""
    })
   
const handleAddProject = async () => {
  const { title, description, completed,    } = project;

  if (!title || !description || completed === "" ) {
    toast.warning("Enter valid input!!");
    return;
  }

  const newProject = {
    title,
    description,
    completed, 
  };

  try {
    const res = await addProjectApi(newProject); 

    if (res.status === 200) {
      toast.success("Project added successfully");
      setProject({ title: "", description: "", completed: "",
        });
      handleClose();
      setAddResponse(res);
    } else {
      toast.warning("Project adding failed");
    }
  } catch (error) {
    console.error("Error adding project:", error);
  }
};
 const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 
  return (
<>
 
            <Button onClick={handleShow} variant="primary">
        Add Task
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <Form>
                <Form.Group controlId="projectTitle" className="mb-3">
                  <Form.Label>Project Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={project.title}
                    onChange={(e) => setProject({ ...project, title: e.target.value })}
                  />
                </Form.Group>

                <Form.Group controlId="projectDocs" className="mb-3">
                  <Form.Label>Project Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={project.description}
                    onChange={(e) => setProject({ ...project, description: e.target.value })}
                  />
                </Form.Group>

                 <Form.Group controlId="projectStatus" className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={project.completed}
                    onChange={(e) =>
                      setProject({ ...project, completed: e.target.value === 'true' })
                    }
                  >
                    <option value="">Select status</option>
                    <option value="true">Completed</option>
                    <option value="false">Incomplete</option>
                  </Form.Select>
                </Form.Group>

               
              </Form>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAddProject} variant="primary" >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>

</>  )
}

export default TaskForm