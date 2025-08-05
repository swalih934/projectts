import React, { useContext } from 'react';
import Edit from './Edit';
import { useEffect, useState } from 'react';
import { getProjectApi, deleteProjectApi, toggleTaskApi } from '../services/AllApies';
import { addProjectResponseContext } from '../context/ContextApi';
import { toast } from 'react-toastify';
import './tablelist.css'
function TaskList() {

    const [projects, setProjects] = useState([]);
  const { addResponse } = useContext(addProjectResponseContext);
  useEffect(() => {
    fetchProjects(); 
  }, [addResponse]); 

    const fetchProjects = async () => {
        try {
            const res = await getProjectApi();
            if (res.status === 200) {
                setProjects(res.data);
            }
        } catch (err) {
            console.error("Error fetching projects:", err);
        }
    };

    const handleToggle = async (id) => {
        try {
            const res = await toggleTaskApi(id);
            if (res.status === 200) {
                alert("Task status toggled");
                fetchProjects(); 
            }
        } catch (err) {
            console.error("Toggle error:", err);
            alert("Failed to toggle task");
        }
    };



    const handleDelete = async (id) => {
        const res = await deleteProjectApi(id)
        if (res.status == 200) {
            toast.success("project Deleted Successfully!!")
            fetchProjects()

        }
        else {
            toast.warning("Failed to Delete Employee!!")
        }
    }
    useEffect(() => {
        fetchProjects();
    }, []);
    return (
       <div className="container mt-4">
  <div className="table-responsive">
    <table className="table table-bordered table-striped table-hover align-middle">
      <thead className="table-dark">
        <tr>
          <th scope="col" style={{ minWidth: '50px' }}>No</th>
          <th scope="col" style={{ minWidth: '150px' }}>Title</th>
          <th scope="col" style={{ minWidth: '120px' }}>Complete / Not</th>
          <th scope="col" style={{ minWidth: '140px' }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <tr key={project._id || index}>
              <td>{index + 1}</td>
              <td>{project.title}</td>
              <td>
                <button
                  className={`btn btn-sm ${project.completed ? "btn-success text-light" : "btn-warning text-dark"}`}
                  onClick={() => handleToggle(project._id)}
                  style={{ minWidth: '100px' }}
                >
                  {project.completed ? "Completed" : "Not Completed"}
                </button>
              </td>
              <td>
                <div className="d-flex gap-2 justify-content-center">
                  <Edit project={project} onUpdate={fetchProjects} />
                  <button className="btn btn-sm " onClick={() => handleDelete(project._id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center text-muted">
              No projects found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

    );
}

export default TaskList;
