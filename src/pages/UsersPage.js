import React, { useState, useEffect } from 'react';
import { 
  getUsers, 
  createUser, 
  updateUser, 
  deleteUser 
} from '../api/axiosConfig';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user' // Default role
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // For updates, we might not want to send the password if it's empty
        // But for this assignment, we send the whole object
        await updateUser(editingId, formData);
        setEditingId(null);
      } else {
        await createUser(formData);
      }
      // Reset form
      setFormData({ username: '', email: '', password: '', role: 'user' });
      fetchUsers();
    } catch (err) {
      console.error("Error saving user:", err);
      setError("Failed to save user (Username/Email might already exist)");
    }
  };

  const handleEdit = (user) => {
    setEditingId(user._id);
    setFormData({
      username: user.username,
      email: user.email,
      password: '', // Don't populate password for security, user must enter new one if updating
      role: user.role || 'user'
    });
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  return (
    <div>
      <h1>User Management (Admin)</h1>

      {/* --- FORM SECTION --- */}
      <div className="form-container">
        <h2>{editingId ? 'Edit User' : 'Create New User'}</h2>
        {error && <p style={{color: 'red'}}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" name="username" 
              value={formData.username} onChange={handleChange} required 
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" name="email" 
              value={formData.email} onChange={handleChange} required 
            />
          </div>

          <div className="form-group">
            <label>Password {editingId && "(Leave empty to keep current or enter new)"}</label>
            <input 
              type="password" name="password" 
              value={formData.password} onChange={handleChange} 
              required={!editingId} // Required only when creating new user
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button className="btn-primary" type="submit">
            {editingId ? 'Update User' : 'Create User'}
          </button>
          
          {editingId && (
            <button 
              type="button" 
              className="btn-edit" 
              style={{marginLeft: '10px'}}
              onClick={() => {
                setEditingId(null);
                setFormData({ username: '', email: '', password: '', role: 'user' });
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
          {users.map((user) => (
            <div className="card" key={user._id}>
              <h3>{user.username}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> <span style={{
                padding: '2px 6px', 
                borderRadius: '4px',
                background: user.role === 'admin' ? '#e74c3c' : '#2ecc71',
                color: 'white'
              }}>{user.role}</span></p>
              
              <div className="actions">
                <button className="btn-delete" onClick={() => handleDelete(user._id)}>Delete</button>
                <button className="btn-edit" onClick={() => handleEdit(user)}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersPage;