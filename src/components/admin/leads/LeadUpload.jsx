import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LeadUpload = () => {
  const navigate = useNavigate();
  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    try {
      const response = await axios.post('http://localhost:8081/admin/leads/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File upload successful:', response.data);
      navigate('/admin/leads');
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <h2>Lead Upload</h2>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the file here...</p> : <p>Drag & drop a file here, or click to select one</p>}
      </div>
    </div>
  );
};

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default LeadUpload;
