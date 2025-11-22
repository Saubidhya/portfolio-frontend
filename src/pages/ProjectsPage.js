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
  
  // State for the form
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '', 
    imageUrl: '',
    projectUrl: '',
    githubUrl: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects");
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert "React, Node, JS" string -> ["React", "Node", "JS"] array
    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim())
    };

    try {
      if (editingId) {
        await updateProject(editingId, payload);
        setEditingId(null); // Exit edit mode
      } else {
        await createProject(payload);
      }
      
      // Reset form and refresh list
      setFormData({ 
        title: '', description: '', technologies: '', 
        imageUrl: '', projectUrl: '', githubUrl: '' 
      });
      fetchProjects();
    } catch (err) {
      console.error("Error saving project:", err);
      setError("Failed to save project");
    }
  };

  // Prepare form for editing
  const handleEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '), // Convert array back to string
      imageUrl: project.imageUrl || '',
      projectUrl: project.projectUrl || '',
      githubUrl: project.githubUrl || ''
    });
    // Scroll to top to see form
    window.scrollTo(0, 0);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id);
        fetchProjects();
      } catch (err) {
        console.error("Error deleting project:", err);
      }
    }
  };

  return (
    <div>
      <h1>Projects Portfolio</h1>

      {/* --- FORM SECTION --- */}
      <div className="form-container">
        <h2>{editingId ? 'Edit Project' : 'Add New Project'}</h2>
        {error && <p style={{color: 'red'}}>{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" name="title" 
              value={formData.title} onChange={handleChange} required 
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description" rows="3"
              value={formData.description} onChange={handleChange} required 
            />
          </div>
          <div className="form-group">
            <label>Technologies (comma separated)</label>
            <input 
              type="text" name="technologies" placeholder="e.g. React, Node.js, MongoDB"
              value={formData.technologies} onChange={handleChange} 
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input 
              type="text" name="imageUrl" placeholder="https://..."
              value={formData.imageUrl} onChange={handleChange} 
            />
          </div>
          <div className="form-group">
             <div style={{display:'flex', gap: '10px'}}>
               <div style={{flex: 1}}>
                 <label>Project URL</label>
                 <input 
                   type="text" name="projectUrl" 
                   value={formData.projectUrl} onChange={handleChange} 
                 />
               </div>
               <div style={{flex: 1}}>
                 <label>GitHub URL</label>
                 <input 
                   type="text" name="githubUrl" 
                   value={formData.githubUrl} onChange={handleChange} 
                 />
               </div>
             </div>
          </div>

          <button className="btn-primary" type="submit">
            {editingId ? 'Update Project' : 'Add Project'}
          </button>
          
          {editingId && (
            <button 
              type="button" 
              className="btn-edit" 
              style={{marginLeft: '10px'}}
              onClick={() => {
                setEditingId(null);
                setFormData({title: '', description: '', technologies: '', imageUrl: '', projectUrl: '', githubUrl: ''});
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* --- LIST SECTION --- */}
      {loading ? <p>Loading...</p> : (
        <div className="grid">
          {projects.map((project) => (
            <div className="card" key={project._id}>
              {project.imageUrl && (
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px'}} 
                />
              )}
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p><strong>Tech:</strong> {project.technologies.join(', ')}</p>
              
              <div style={{marginBottom: '15px'}}>
                {project.projectUrl && <a href={project.projectUrl} target="_blank" rel="noreferrer" style={{marginRight: '10px'}}>Live Demo</a>}
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub</a>}
              </div>

              <div className="actions">
                <button className="btn-delete" onClick={() => handleDelete(project._id)}>Delete</button>
                <button className="btn-edit" onClick={() => handleEdit(project)}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;