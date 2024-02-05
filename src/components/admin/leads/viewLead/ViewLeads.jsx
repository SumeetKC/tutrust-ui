import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ViewLead.css";
import { Link, useNavigate } from 'react-router-dom';

const ViewLead = () => {
  const apiUrl = 'http://localhost:8081/admin/leads';
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get(apiUrl);
      setLeads(response.data);
    } catch (error) {
      console.error('Error fetching leads:', error.message);
    }
  };

  const handleEditLead = (leadId) => {
    // Implement logic to navigate to the edit lead page or open a modal
    console.log(`Edit lead with ID ${leadId}`);
    navigate(`/admin/leads/edit/${leadId}`);
  };

  const handleChangeLeadStatus = async (lead, newStatus) => {
    try {
      lead.status = newStatus;
      await axios.put(apiUrl + '/updatestatus', lead);
      // Refresh the leads after updating the status
      fetchLeads();
    } catch (error) {
      console.error('Error changing lead status:', error.message);
    }
  };

  return (
    <>
    <section className='viewLeads'></section>
    <div class="table-container">
      <h2>View Lead Details</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Country</th>
            <th>Grade</th>
            <th>Board</th>
            <th>Course Opted</th>
            <th>Budget</th>
            <th>Timings</th>
            <th>Number of Lessons</th>
            <th>Demo Time</th>
            <th>Remarks</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>

          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.number}</td>
              <td>{lead.country}</td>
              <td>{lead.grade}</td>
              <td>{lead.board}</td>
              <td>{lead.optCourse}</td>
              <td>{lead.budget}</td>
              <td>{lead.timings}</td>
              <td>{lead.noOfLessons}</td>
              <td>{lead.demoTime}</td>
              <td>{lead.remarks}</td>
              <td>
                <select
                  value={lead.status}
                  onChange={(e) => handleChangeLeadStatus(lead, e.target.value)}
                >
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="CONVERTED">CONVERTED</option>
                  <option value="LOST">LOST</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleEditLead(lead.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/admin/leads/add">
        <button>Add Lead</button>
      </Link>

      <Link to="/admin/leads/upload">
        <button>Upload Leads</button>
      </Link>

    </div>
    </>
  );
};

export default ViewLead;
