import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authHeader from '../../services/auth-header';


const LeadManagement = () => {

  const apiUrl = 'http://localhost:8080/admin/leads';
  // State for managing leads
  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    number: '',
    grade: '',
    board: '',
    optCourse: '',
    budget: '',
    timings: '',
    noOfLessons: '',
    demoTime: '',    
    status: 'NEW', // Assuming initial status is 'new'
  });

  useEffect(() => {
    // Fetch leads from the backend on component mount
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get(apiUrl, {headers : authHeader()});
      setLeads(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching leads:', error.message);
    }
  };

  const addLead = async () => {
    try {
      // Send a POST request to add a new lead
      console.log('Adding lead');
      await axios.post(apiUrl + 'add', newLead, {headers : authHeader()});
      // Refresh the leads after adding a new lead
      fetchLeads();
      // Reset the newLead state
      setNewLead({
        name: '',
        email: '',
        number: '',
        grade: '',
        board: '',
        optCourse: '',
        budget: '',
        timings: '',
        noOfLessons: '',
        demoTime: '',    
        status: 'NEW', // Assuming initial status is 'new'
      });
    } catch (error) {
      console.error('Error adding lead:', error.message);
    }
  };

  const changeLeadStatus = async (leadId, newStatus) => {
    try {
      // Send a PUT request to update the lead status
      await axios.put(`${apiUrl}/${leadId}/status/${newStatus}`, {headers : authHeader()});
      // Refresh the leads after updating the status
      fetchLeads();
    } catch (error) {
      console.error('Error changing lead status:', error.message);
    }
  };

  const updateLeadDetails = async (leadId, updatedDetails) => {
    try {
      // Send a PUT request to update lead details
      await axios.put(`${apiUrl}/${leadId}`, updatedDetails, {headers : authHeader()});
      // Refresh the leads after updating details
      fetchLeads();
    } catch (error) {
      console.error('Error updating lead details:', error.message);
    }
  };

  return (
    <div>
      <h2>Lead Management</h2>
      
      {/* Add Leads */}
      <div>
        <h3>Add New Lead</h3>
        <label>
            Name : 
        <input
          type="text"
          placeholder="Name"
          value={newLead.name}
          onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
        />
        </label>
        <label>
            Email: 
        <input
          type="email"
          placeholder="Email"
          value={newLead.email}
          onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
        />
        </label>
        <label>
            Mobile: 
        <input
          type="text"
          placeholder="Mobile"
          value={newLead.number}
          onChange={(e) => setNewLead({ ...newLead, number: e.target.value })}
        />
        </label>
        <label>
            Grade: 
        <input
          type="text"
          placeholder="Grade"
          value={newLead.grade}
          onChange={(e) => setNewLead({ ...newLead, grade: e.target.value })}
        />
        </label>
        <label>
            Board: 
        <input
          type="text"
          placeholder="Board"
          value={newLead.board}
          onChange={(e) => setNewLead({ ...newLead, board: e.target.value })}
        />
        </label>
        <label>
            Course to be opted: 
        <input
          type="text"
          placeholder="Course to be opted"
          value={newLead.optCourse}
          onChange={(e) => setNewLead({ ...newLead, optCourse: e.target.value })}
        />
        </label>
        <button onClick={addLead}>Add Lead</button>
      </div>

      {/* Change Leads Status */}
      {/*
      <div>
        <h3>Change Lead Status</h3>
        <ul>
          {leads.map((lead) => (
            <li key={lead.id}>
              {lead.name} - {lead.status}
              <button onClick={() => changeLeadStatus(lead.id, 'inProgress')}>Mark as In Progress</button>
              <button onClick={() => changeLeadStatus(lead.id, 'completed')}>Mark as Completed</button>
            </li>
          ))}
        </ul>
      </div>
*/}
      {/* Update Lead Details */}
      {/*
      <div>
        <h3>Update Lead Details</h3>
        <ul>
          {leads.map((lead) => (
            <li key={lead.id}>
              {lead.name} - {lead.email}
              <button onClick={() => updateLeadDetails(lead.id, { name: 'New Name' })}>Update Name</button>
              <button onClick={() => updateLeadDetails(lead.id, { email: 'new@email.com' })}>Update Email</button>
            </li>
          ))}
        </ul>
      </div>
    
      <div>
      <h2>Leads </h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Grade</th>
            <th>Board</th>
            <th>Opt Course</th>
            <th>Budget</th>
            <th>Timings</th>
            <th>No. of Lessons</th>
            <th>Demo Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.number}</td>
              <td>{lead.grade}</td>
              <td>{lead.board}</td>
              <td>{lead.optCourse}</td>
              <td>{lead.budget}</td>
              <td>{lead.timings}</td>
              <td>{lead.noOfLessons}</td>
              <td>{lead.demoTime}</td>
              <td>{lead.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>  */}
    </div>
  );
};

export default LeadManagement;
