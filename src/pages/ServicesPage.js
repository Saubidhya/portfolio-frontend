import React, { useState, useEffect } from 'react';
import { 
  getServices, 
  createService, 
  updateService, 
  deleteService 
} from '../api/axiosConfig';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all services
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await getServices();
      setServices(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("Failed to load services");
      setLoading(false);
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateService(editingId, formData);
        setEditingId(null);
      } else {
        await createService(formData);
      }
      // Reset form
      setFormData({ name: '', description: '', price: '', duration: '' });
      fetchServices();
    } catch (err) {
      console.error("Error saving service:", err);
      setError("Failed to save service");
    }
  };

  // Handle Edit Click
  const handleEdit = (service) => {
    setEditingId(service._id);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price || '',
      duration: service.duration || ''
    });
    window.scrollTo(0, 0);
  };

  // Handle Delete Click
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(id);
        fetchServices();
      } catch (err) {
        console.error("Error deleting service:", err);
      }
    }
  };

  return (
    <div>
      <h1>My Services</h1>

      {/* --- FORM SECTION --- */}
      <div className="form-container">
        <h2>{editingId ? 'Edit Service' : 'Add New Service'}</h2>
        {error && <p style={{color: 'red'}}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Service Name</label>
            <input 
              type="text" name="name" 
              value={formData.name} onChange={handleChange} required 
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
            <div style={{display:'flex', gap: '10px'}}>
              <div style={{flex: 1}}>
                <label>Price ($)</label>
                <input 
                  type="number" name="price" 
                  value={formData.price} onChange={handleChange} 
                />
              </div>
              <div style={{flex: 1}}>
                <label>Duration</label>
                <input 
                  type="text" name="duration" placeholder="e.g. 2 weeks"
                  value={formData.duration} onChange={handleChange} 
                />
              </div>
            </div>
          </div>

          <button className="btn-primary" type="submit">
            {editingId ? 'Update Service' : 'Add Service'}
          </button>
          
          {editingId && (
            <button 
              type="button" 
              className="btn-edit" 
              style={{marginLeft: '10px'}}
              onClick={() => {
                setEditingId(null);
                setFormData({ name: '', description: '', price: '', duration: '' });
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
          {services.map((service) => (
            <div className="card" key={service._id}>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <p><strong>Price:</strong> ${service.price}</p>
              <p><strong>Duration:</strong> {service.duration}</p>
              
              <div className="actions">
                <button className="btn-delete" onClick={() => handleDelete(service._id)}>Delete</button>
                <button className="btn-edit" onClick={() => handleEdit(service)}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesPage;