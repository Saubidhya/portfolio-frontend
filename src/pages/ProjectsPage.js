import React, { useState, useEffect } from 'react';
import { 
  getProjects, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../api/axiosConfig';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token')); // Check login status

  const [formData, setFormData] = useState({
    title: '', description: '', technologies: '', 
    imageUrl: '', projectUrl: '', githubUrl: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load projects");
      setLoading(false);
    }
  };

  // ... (handleChange, handleSubmit, handleDelete same as before) ...
  // Just re-paste the handler functions from your previous code here
  
  // I will write the full component structure so you don't get confused
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, technologies: formData.technologies.split(',') };
    try {
      if (editingId) {
        await updateProject(editingId, payload);
        setEditingId(null);
      } else {
        await createProject(payload);
      }
      setFormData({ title: '', description: '', technologies: '', imageUrl: '', projectUrl: '', githubUrl: '' });
      fetchProjects();
    } catch (err) {
      alert("Action Failed! You might not be logged in.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete?")) {
      try {
        await deleteProject(id);
        fetchProjects();
      } catch (err) {
        alert("Delete Failed! You might not be logged in.");
      }
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setFormData({
        title: project.title,
        description: project.description,
        technologies: project.technologies.join(','),
        imageUrl: project.imageUrl,
        projectUrl: project.projectUrl,
        githubUrl: project.githubUrl
    });
    window.scrollTo(0,0);
  }

  return (
    <div>
      <h1>Projects Portfolio</h1>

      {/* ONLY SHOW FORM IF LOGGED IN */}
      {token && (
        <div className="form-container">
          <h2>{editingId ? 'Edit Project' : 'Add New Project'}</h2>
          <form onSubmit={handleSubmit}>
            {/* ... (Inputs same as before) ... */}
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Desc" required />
            <input name="technologies" value={formData.technologies} onChange={handleChange} placeholder="Tech" />
            <button className="btn-primary" type="submit">{editingId ? 'Update' : 'Add'}</button>
          </form>
        </div>
      )}

      {/* LIST SECTION */}
      {loading ? <p>Loading...</p> : (
        <div className="grid">
          {projects.map((project) => (
            <div className="card" key={project._id}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              
              {/* ONLY SHOW BUTTONS IF LOGGED IN */}
              {token && (
                <div className="actions">
                  <button className="btn-delete" onClick={() => handleDelete(project._id)}>Delete</button>
                  <button className="btn-edit" onClick={() => handleEdit(project)}>Edit</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;