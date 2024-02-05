import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./EditLead.css";

const EditLead = () => {
    const apiUrl = 'http://localhost:8081/admin/leads';
    const { id } = useParams();
    const navigate = useNavigate();
    const [lead, setLead] = useState({
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
        status: '',
        country: '',
        remarks: ''
    });

    useEffect(() => {
        // Fetch lead data from the backend based on the lead ID in the URL
        console.log('Lead id is', id);
        fetchLead(id);
    }, [id]);

    const fetchLead = async (leadId) => {
        try {
            const response = await axios.get(apiUrl + `/${leadId}`);
            setLead(response.data);
        } catch (error) {
            console.error('Error fetching lead:', error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLead({ ...lead, [name]: value });
    };

    const updateLead = async (e) => {
        e.preventDefault();
        try {
            // Send a PUT request to update the lead details
            const data = await axios.put(apiUrl + '/updatelead', lead);
            if (data.status === 200) {
                navigate('/admin/leads');
            } else {
                console.error('Error updating lead. Unexpected response status:', data.status);
            }
        } catch (error) {
            console.error('Error updating lead details:', error.message);
        }
    };

    return (
        <div>
            <h2>Edit Lead</h2>
            <section className='editLead'></section>
            <div className="form-container">
                <form onSubmit={updateLead}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your name.."
                        value={lead.name}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Your email.."
                        value={lead.email}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="number">Phone Number</label>
                    <input
                        type="text"
                        id="number"
                        name="number"
                        placeholder="Your phone number.."
                        value={lead.number}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        placeholder="Country"
                        value={lead.country}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="grade">Grade</label>
                    <input
                        type="text"
                        id="grade"
                        name="grade"
                        placeholder="Grade"
                        value={lead.grade}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="board">Board</label>
                    <input
                        type="text"
                        id="board"
                        name="board"
                        placeholder="Board"
                        value={lead.board}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="optCourse">Course to be opted</label>
                    <input
                        type="text"
                        id="optCourse"
                        name="optCourse"
                        placeholder="Course to be opted"
                        value={lead.optCourse}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="budget">Budget</label>
                    <input
                        type="text"
                        id="budget"
                        name="budget"
                        placeholder="Budget"
                        value={lead.budget}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="timings">Timings</label>
                    <input
                        type="text"
                        id="timings"
                        name="timings"
                        placeholder="Timings"
                        value={lead.timings}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="noOfLessons">Number of Lessons</label>
                    <input
                        type="text"
                        id="noOfLessons"
                        name="noOfLessons"
                        placeholder="Number of Lessons"
                        value={lead.noOfLessons}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="demoTime">Demo Time</label>
                    <input
                        type="text"
                        id="demoTime"
                        name="demoTime"
                        placeholder="Demo Time"
                        value={lead.demoTime}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="remarks">Remarks</label>
                    <input
                        type="text"
                        id="remarks"
                        name="remarks"
                        placeholder="Remarks"
                        value={lead.remarks}
                        onChange={handleInputChange}
                        required
                    />

                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>

    );

};

export default EditLead;
