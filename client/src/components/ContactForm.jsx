// // src/components/ContactForm.jsx
// import { useState } from 'react';
// import API from '../api';

// export default function ContactForm() {
//   // 1. Unified state for the form fields
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });

//   // 2. UI Status states
//   const [loading, setLoading] = useState(false);
//   const [statusMessage, setStatusMessage] = useState({ text: '', isError: false });

//   // Dynamically update state when a user types into any input field
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setStatusMessage({ text: '', isError: false });

//     try {
//       const response = await API.post('/contact', formData);
      
//       // Safeguard against missing response data structures
//       const successText = response?.data?.message || 'Message sent successfully!';
//       setStatusMessage({ text: successText, isError: false });
//       setFormData({ name: '', email: '', message: '' });
//     } catch (err) {
//       console.error('Form submission error details:', err);
      
//       // Bulletproof string fallback for any API error payload shape
//       let serverError = 'Something went wrong. Please try again.';
      
//       if (err.response && err.response.data) {
//         if (typeof err.response.data === 'string') {
//           serverError = err.response.data;
//         } else if (err.response.data.error) {
//           serverError = err.response.data.error;
//         }
//       } else if (err.message) {
//         serverError = err.message;
//       }

//       setStatusMessage({ text: serverError, isError: true });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- THIS RETURN MUST BE INSIDE THE ContactForm FUNCTION BLOCK ---
//   return (
//     <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//       <div>
//         <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#cbd5e1' }}>Name</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#fff', boxSizing: 'border-box' }}
//         />
//       </div>

//       <div>
//         <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#cbd5e1' }}>Email</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#fff', boxSizing: 'border-box' }}
//         />
//       </div>

//       <div>
//         <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#cbd5e1' }}>Message</label>
//         <textarea
//           name="message"
//           rows="4"
//           value={formData.message}
//           onChange={handleChange}
//           required
//           style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#1e293b', color: '#fff', boxSizing: 'border-box', resize: 'vertical' }}
//         />
//       </div>

//       <button 
//         type="submit" 
//         disabled={loading}
//         style={{
//           padding: '12px',
//           borderRadius: '6px',
//           backgroundColor: loading ? '#334155' : '#0284c7',
//           color: 'white',
//           border: 'none',
//           cursor: loading ? 'not-allowed' : 'pointer',
//           fontWeight: '600',
//           fontSize: '15px',
//           transition: 'background-color 0.2s'
//         }}
//       >
//         {loading ? 'Sending...' : 'Send Message'}
//       </button>

//       {statusMessage.text && (
//         <div style={{
//           padding: '12px',
//           borderRadius: '6px',
//           backgroundColor: statusMessage.isError ? '#7f1d1d' : '#064e3b',
//           color: statusMessage.isError ? '#fca5a5' : '#a7f3d0',
//           fontSize: '14px',
//           marginTop: '4px'
//         }}>
//           {statusMessage.text}
//         </div>
//       )}
//     </form>
//   );
// } // <-- This closing brace wraps up the component function

// src/components/ContactForm.jsx
import { useState } from 'react';
import API from '../api';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: '', isError: false });

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
      const successText = response?.data?.message || 'Message sent successfully!';
      setStatusMessage({ text: successText, isError: false });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Form submission error details:', err);
      
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

  // --- Aesthetic UI Styles ---
  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    color: '#fff',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    fontSize: '15px',
    outline: 'none',
  };

  const buttonStyle = {
    padding: '14px',
    borderRadius: '8px',
    background: loading ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(90deg, #8b5cf6, #3b82f6)',
    color: loading ? '#94a3b8' : 'white',
    border: loading ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
    cursor: loading ? 'not-allowed' : 'pointer',
    fontWeight: '700',
    fontSize: '15px',
    letterSpacing: '0.02em',
    transition: 'all 0.3s ease',
    boxShadow: loading ? 'none' : '0 4px 15px rgba(139, 92, 246, 0.3)',
    marginTop: '10px'
  };

  const statusStyle = {
    padding: '12px 16px',
    borderRadius: '8px',
    backgroundColor: statusMessage.isError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
    color: statusMessage.isError ? '#fca5a5' : '#6ee7b7',
    border: `1px solid ${statusMessage.isError ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
    fontSize: '14px',
    marginTop: '8px',
    textAlign: 'center'
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <label style={labelStyle}>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label style={labelStyle}>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label style={labelStyle}>Message</label>
        <textarea
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
          style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
          placeholder="How can we collaborate?"
        />
      </div>

      <button type="submit" disabled={loading} style={buttonStyle}>
        {loading ? 'Transmitting...' : 'Send Message'}
      </button>

      {statusMessage.text && (
        <div style={statusStyle}>
          {statusMessage.text}
        </div>
      )}
    </form>
  );
}