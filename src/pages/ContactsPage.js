import React, { useState, useEffect } from 'react';
import { 
  getContacts, 
  createContact, 
  updateContact, 
  deleteContact 
} from '../api/axiosConfig';

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    message: '' 
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await getContacts();
      setContacts(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setError("Failed to load contacts");
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
        await updateContact(editingId, formData);
        setEditingId(null);
      } else {
        await createContact(formData);
      }
      
      setFormData({ firstname: '', lastname: '', email: '', message: '' });
      fetchContacts();
      alert("Message Sent/Updated Successfully!");
    } catch (err) {
      console.error("Error saving contact:", err);
      setError("Failed to save contact");
    }
  };

  const handleEdit = (contact) => {
    setEditingId(contact._id);
    setFormData({
      firstname: contact.firstname,
      lastname: contact.lastname,
      email: contact.email,
      message: contact.message || '' 
    });
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await deleteContact(id);
        fetchContacts();
      } catch (err) {
        console.error("Error deleting contact:", err);
      }
    }
  };

  return (
    <div>
      <h1>Contact Me</h1>

      {/* --- MY INFORMATION CARD --- */}
      <div className="my-info-card">
        <h2 style={{ color: 'white', borderLeft: 'none', paddingLeft: 0 }}>
          Get in touch with me directly
        </h2>
        <p><strong>Name:</strong> Saubidhya Pandit</p>
        <p><strong>Phone:</strong> +1 (647) 555-0199</p>
        <p><strong>Email:</strong> spandi14@centennialcollege.ca</p>
      </div>

      {/* --- FORM SECTION --- */}
      <div className="form-container">
        <h2>{editingId ? 'Edit Message' : 'Send me a Message'}</h2>
        {error && <p style={{color: 'red'}}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div style={{display:'flex', gap: '20px'}}>
              <div style={{flex: 1}}>
                <label>First Name</label>
                <input 
                  type="text" name="firstname" placeholder="Saubidhya"
                  value={formData.firstname} onChange={handleChange} required 
                />
              </div>
              <div style={{flex: 1}}>
                <label>Last Name</label>
                <input 
                  type="text" name="lastname" placeholder="Pandit"
                  value={formData.lastname} onChange={handleChange} required 
                />
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" name="email" placeholder="saubidhya@example.com"
              value={formData.email} onChange={handleChange} required 
            />
          </div>

          
          <div className="form-group">
            <label>Message</label>
            <textarea 
              name="message" 
              rows="4" 
              placeholder="Type your message here..."
              value={formData.message} 
              onChange={handleChange} 
              required 
              style={{ resize: 'vertical' }}
            />
          </div>

          <button className="btn-primary" style={{width: '100%'}} type="submit">
            {editingId ? 'Update Message' : 'Send Message'}
          </button>
          
          {editingId && (
            <button 
              type="button" 
              className="btn-edit" 
              style={{marginTop: '15px', width: '100%', justifyContent:'center'}}
              onClick={() => {
                setEditingId(null);
                setFormData({ firstname: '', lastname: '', email: '', message: '' });
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* --- LIST SECTION --- */}
      <h2 style={{textAlign:'center', marginTop: '60px'}}>Previous Messages</h2>
      {loading ? <p style={{textAlign:'center'}}>Loading...</p> : (
        <div className="grid">
          {contacts.map((contact) => (
            <div className="card" key={contact._id}>
              <div style={{display:'flex', alignItems:'center', marginBottom:'15px'}}>
                <div style={{
                  width:'45px', height:'45px', borderRadius:'50%', 
                  background:'linear-gradient(135deg, #2563eb, #4f46e5)', color:'white', display:'flex', 
                  alignItems:'center', justifyContent:'center', fontWeight:'bold', marginRight:'15px',
                  fontSize: '1.2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                  {contact.firstname.charAt(0)}
                </div>
                <div>
                  <h3>{contact.firstname} {contact.lastname}</h3>
                  <span style={{fontSize:'0.85rem', color:'#64748b'}}>{contact.email}</span>
                </div>
              </div>
              
             
              <div style={{
                background:'#f1f5f9', padding:'15px', borderRadius:'8px', 
                fontSize: '0.95rem', color: '#334155', fontStyle: 'italic',
                borderLeft: '4px solid #2563eb'
              }}>
                "{contact.message}"
              </div>
              
              <div className="actions" style={{marginTop: '20px', borderTop: '1px solid #e2e8f0', paddingTop: '15px'}}>
                <button className="btn-delete" onClick={() => handleDelete(contact._id)}>Delete</button>
                <button className="btn-edit" onClick={() => handleEdit(contact)}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactsPage;