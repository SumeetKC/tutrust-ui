import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BatchManagement = () => {
  // State for managing batches
  const [batches, setBatches] = useState([]);
  const [newBatch, setNewBatch] = useState({
    name: '',
    teacherId: '', // Assuming a teacher is identified by an ID
  });
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [studentToAdd, setStudentToAdd] = useState({
    studentId: '', // Assuming a student is identified by an ID
  });
  const [teacherToAssign, setTeacherToAssign] = useState({
    teacherId: '', // Assuming a teacher is identified by an ID
  });

  useEffect(() => {
    // Fetch batches from the backend on component mount
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/batches');
      setBatches(response.data);
    } catch (error) {
      console.error('Error fetching batches:', error.message);
    }
  };

  const createBatch = async () => {
    try {
      // Send a POST request to create a new batch
      await axios.post('http://localhost:8080/admin/batches', newBatch);
      // Refresh the batches after creating a new batch
      fetchBatches();
      // Reset the newBatch state
      setNewBatch({ name: '', teacherId: '' });
    } catch (error) {
      console.error('Error creating batch:', error.message);
    }
  };

  const deleteBatch = async (batchId) => {
    try {
      // Send a DELETE request to delete a batch
      await axios.delete(`http://localhost:8080/admin/batches/${batchId}`);
      // Refresh the batches after deleting a batch
      fetchBatches();
    } catch (error) {
      console.error('Error deleting batch:', error.message);
    }
  };

  const addStudentToBatch = async () => {
    try {
      // Send a POST request to add a student to a batch
      await axios.post(`http://localhost:8080/admin/batches/${selectedBatch.id}/students`, studentToAdd);
      // Refresh the batches after adding a student to a batch
      fetchBatches();
      // Reset the studentToAdd state
      setStudentToAdd({ studentId: '' });
    } catch (error) {
      console.error('Error adding student to batch:', error.message);
    }
  };

  const assignTeacherToBatch = async () => {
    try {
      // Send a PUT request to assign a teacher to a batch
      await axios.put(`http://localhost:8080/admin/batches/${selectedBatch.id}/assign-teacher`, teacherToAssign);
      // Refresh the batches after assigning a teacher to a batch
      fetchBatches();
      // Reset the teacherToAssign state
      setTeacherToAssign({ teacherId: '' });
    } catch (error) {
      console.error('Error assigning teacher to batch:', error.message);
    }
  };

  return (
    <div>
      <h2>Batch Management</h2>

      {/* Create Batch */}
      <div>
        <h3>Create New Batch</h3>
        <input
          type="text"
          placeholder="Batch Name"
          value={newBatch.name}
          onChange={(e) => setNewBatch({ ...newBatch, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Teacher ID"
          value={newBatch.teacherId}
          onChange={(e) => setNewBatch({ ...newBatch, teacherId: e.target.value })}
        />
        <button onClick={createBatch}>Create Batch</button>
      </div>

      {/* Delete Batch */}
      <div>
        <h3>Delete Batch</h3>
        <ul>
          {batches.map((batch) => (
            <li key={batch.id}>
              {batch.name}
              <button onClick={() => deleteBatch(batch.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Student to Batch */}
      <div>
        <h3>Add Student to Batch</h3>
        <select onChange={(e) => setSelectedBatch(batches.find((batch) => batch.id === e.target.value))}>
          <option value="">Select Batch</option>
          {batches.map((batch) => (
            <option key={batch.id} value={batch.id}>
              {batch.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Student ID"
          value={studentToAdd.studentId}
          onChange={(e) => setStudentToAdd({ studentId: e.target.value })}
        />
        <button onClick={addStudentToBatch}>Add Student</button>
      </div>

      {/* Assign Teacher to Batch */}
      <div>
        <h3>Assign Teacher to Batch</h3>
        <select onChange={(e) => setSelectedBatch(batches.find((batch) => batch.id === e.target.value))}>
          <option value="">Select Batch</option>
          {batches.map((batch) => (
            <option key={batch.id} value={batch.id}>
              {batch.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Teacher ID"
          value={teacherToAssign.teacherId}
          onChange={(e) => setTeacherToAssign({ teacherId: e.target.value })}
        />
        <button onClick={assignTeacherToBatch}>Assign Teacher</button>
      </div>
    </div>
  );
};

export default BatchManagement;
