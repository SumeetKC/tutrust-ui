import React, { useState } from 'react';
import axios from 'axios';
import "./AddLead.css";
import { useNavigate } from 'react-router-dom';

const AddLead = () => {
    const apiUrl = 'http://localhost:8081/admin/leads';

    const navigate = useNavigate();
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
        status: 'NEW',
        country: '',
        remarks: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLead({ ...newLead, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to add a new lead
            console.log('Adding lead');
            const response = await axios.post(apiUrl + '/add', newLead);
            console.log('The response is ', response);
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
                status: 'NEW',
                country: '',
                remarks: ''
            });

            navigate('/admin/leads');
        } catch (error) {
            console.error('Error adding lead:', error.message);
        }
    };

    return (
        <>
    <section className='viewLeads'></section>
        <div>
            <h2>Add Lead</h2>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your name.."
                        value={newLead.name}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Your email.."
                        value={newLead.email}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="number">Phone Number</label>
                    <input
                        type="text"
                        id="number"
                        name="number"
                        placeholder="Your phone number.."
                        value={newLead.number}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        placeholder="Country"
                        value={newLead.country}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="grade">Grade</label>
                    <input
                        type="text"
                        id="grade"
                        name="grade"
                        placeholder="Grade"
                        value={newLead.grade}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="board">Board</label>
                    <input
                        type="text"
                        id="board"
                        name="board"
                        placeholder="Board"
                        value={newLead.board}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="optCourse">Course to be opted</label>
                    <input
                        type="text"
                        id="optCourse"
                        name="optCourse"
                        placeholder="Course to be opted"
                        value={newLead.optCourse}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="budget">Budget</label>
                    <input
                        type="text"
                        id="budget"
                        name="budget"
                        placeholder="Budget"
                        value={newLead.budget}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="timings">Timings</label>
                    <input
                        type="text"
                        id="timings"
                        name="timings"
                        placeholder="Timings"
                        value={newLead.timings}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="noOfLessons">Number of Lessons</label>
                    <input
                        type="text"
                        id="noOfLessons"
                        name="noOfLessons"
                        placeholder="Number of Lessons"
                        value={newLead.noOfLessons}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="demoTime">Demo Time</label>
                    <input
                        type="text"
                        id="demoTime"
                        name="demoTime"
                        placeholder="Demo Time"
                        value={newLead.demoTime}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="remarks">Remarks</label>
                    <input
                        type="text"
                        id="remarks"
                        name="remarks"
                        placeholder="Remarks"
                        value={newLead.remarks}
                        onChange={handleInputChange}
                        required
                    />

                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
        </>
    );
};

export default AddLead;
