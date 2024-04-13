import React, { useState, useEffect } from "react";
import axios from "axios";

const DropDown = () => {
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState('');

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                setOptions(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleChange = (event) => {
        setSelectedOptions(event.target.value);
    };

    return (
        <div>
            <select value={selectedOptions} onChange={handleChange} style={{
                height: "30px",
                width: "200px",
                borderRadius: "10px"
            }}>
                {selectedOptions === '' && <option value="">Select user</option>}
                {options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                )
                )}
            </select>
        </div>
    );
};

export default DropDown;