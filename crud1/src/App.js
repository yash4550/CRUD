import React, { useState } from 'react';
import './App.css';
import Swal from 'sweetalert2';  // Import SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css'; // Import SweetAlert2 default CSS
import 'font-awesome/css/font-awesome.min.css';


function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState('');
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(null);

  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');

  // Form to add data
  const dataform = () => {
    return (
      <div className="form-container">
        <div className="label">Name</div>
        <input
          className="input"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />
        {nameError && <div className="error">{nameError}</div>}
        <br />
        <br />
        <div className="label">Age</div>
        <input
          className="input"
          value={age}
          onChange={(evt) => setAge(evt.target.value)}
          type="number"
        />
        {ageError && <div className="error">{ageError}</div>}
        <br />
        <br />
        <div>
          <button
            className="save-button"
            onClick={() => {
              let isValid = true;
              if (!name) {
                setNameError('Name is required');
                isValid = false;
              } else {
                setNameError('');
              }

              if (!age) {
                setAgeError('Age is required');
                isValid = false;
              } else {
                setAgeError('');
              }

              if (isValid) {
                // Show Save Confirmation Popup
                Swal.fire({
                  title: 'Are you sure you want to save this item?',
                  icon: 'question',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, save it!',
                  cancelButtonText: 'Cancel',
                  customClass: {
                    confirmButton: 'swal-btn-confirm',
                    cancelButton: 'swal-btn-cancel'
                  }
                }).then((result) => {
                  if (result.isConfirmed) {
                    setData([...data, { name, age }]);
                    setName('');
                    setAge('');
                    Swal.fire('Saved!', 'Your item has been saved.', 'success');
                  }
                });
              }
            }}
          >
            Save
          </button>
        </div>
      </div>
    );
  };

  // Handle the Edit Button click
  const openEditAlert = (index) => {
    const item = data[index];

    Swal.fire({
      title: 'Do you want to edit this item?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, edit it!',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'swal-btn-confirm',
        cancelButton: 'swal-btn-cancel'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setEditName(item.name);
        setEditAge(item.age);
        setIndex(index);
      }
    });
  };

  const saveEditedItem = () => {
    if (!editName || !editAge) {
      alert('Both Name and Age are required!');
      return;
    }
    const updatedData = [...data];
    updatedData.splice(index, 1, { name: editName, age: editAge });
    setData(updatedData);
    setIndex(null);
    Swal.fire('Updated!', 'Your item has been updated.', 'success');
  };

  // Delete Item with SweetAlert2
  const openDeleteAlert = (index) => {
    Swal.fire({
      title: 'Are you sure want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'swal-btn-confirm',
        cancelButton: 'swal-btn-cancel'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(index);
        Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
      }
    });
  };

  const deleteItem = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  return (
    <div className="app-container">
      {dataform()}

      {/* Edit Form */}
      {index !== null && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Item</h3>
            <div>
              <div className="label">Name</div>
              <input
                className="input"
                value={editName}
                onChange={(evt) => setEditName(evt.target.value)}
              />
              <br />
              <br />
              <div className="label">Age</div>
              <input
                className="input"
                value={editAge}
                onChange={(evt) => setEditAge(evt.target.value)}
                type="number"
              />
              <br />
              <br />
              <div>
                <button className="save-button1" onClick={saveEditedItem}>
                  Save 
                </button>
                <button className="cancel-button" onClick={() => setIndex(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>
            {/* Edit Button with Icon */}
            <button className="edit-btn" onClick={() => openEditAlert(index)}>
              <i className="fas fa-edit"></i> {/* Font Awesome Edit Icon */}
            </button>
            {/* Delete Button with Icon */}
            <button className="delete-btn" onClick={() => openDeleteAlert(index)}>
              <i className="fas fa-trash"></i> {/* Font Awesome Trash Icon */}
            </button>
          </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
