// src/components/ContactForm.jsx
import { useState } from 'react';
import API from '../api';

export default function ContactForm() {
  // 1. Unified state for the form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // 2. UI Status states
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: '', isError: false });

  // Dynamically update state when a user types into any input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ text: '', isError: false });

    try {
      const response = await API.post('/contact', formData);
      
      // Safeguard against missing response data structures
      const successText = response?.data?.message || 'Message sent successfully!';
      setStatusMessage({ text: successText, isError: false });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Form submission error details:', err);
      
      // Bulletproof string fallback for any API error payload shape
      let serverError = 'Something went wrong. Please try again.';
      
      if (err.response && err.response.data) {
        if (typeof err.response.data === 'string') {
          serverError = err.response.data;
        } else if (err.response.data.error) {
          serverError = err.response.data.error;
        }
      } else if (err.message) {
        serverError = err.message;
      }

      setStatusMessage({ text: serverError, isError: true });
    } finally {
      setLoading(false);
    }
  };

  // --- THIS RETURN MUST BE INSIDE THE ContactForm FUNCTION BLOCK ---
  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#cbd5e1' }}>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#fff', boxSizing: 'border-box' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#cbd5e1' }}>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#fff', boxSizing: 'border-box' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#cbd5e1' }}>Message</label>
        <textarea
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#fff', boxSizing: 'border-box', resize: 'vertical' }}
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        style={{
          padding: '12px',
          borderRadius: '6px',
          backgroundColor: loading ? '#334155' : '#0284c7',
          color: 'white',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontWeight: '600',
          fontSize: '15px',
          transition: 'background-color 0.2s'
        }}
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>

      {statusMessage.text && (
        <div style={{
          padding: '12px',
          borderRadius: '6px',
          backgroundColor: statusMessage.isError ? '#7f1d1d' : '#064e3b',
          color: statusMessage.isError ? '#fca5a5' : '#a7f3d0',
          fontSize: '14px',
          marginTop: '4px'
        }}>
          {statusMessage.text}
        </div>
      )}
    </form>
  );
} // <-- This closing brace wraps up the component function