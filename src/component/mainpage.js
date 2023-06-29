import React, { useState, } from 'react';
import { BiSearch, BiEdit } from 'react-icons/bi';
import { ImBin2 } from 'react-icons/im';

const Book = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [edit, setEdit] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [entry, setEntry] = useState([
    {
        Name: 'John',
        Address: 'London',
        Phone: '343454',
        Email: 'john@gmail.com',
      },
  ]);

  // Load entry data from local storage on component mount
//   useEffect(() => {
//     const savedEntry = localStorage.getItem(entry);
//     if (savedEntry) {
//       setEntry(JSON.parse(savedEntry));
//     }
//   }, []);

  // Save entry data to local storage whenever the entry state updates
//   useEffect(() => {
//     localStorage.setItem('entry', JSON.stringify(entry));
//   }, [entry]);

  // Adding New Entry in the entry array
  const Add = (e) => {
    e.preventDefault();

    const newEntry = {
      Name: name,
      Address: address,
      Phone: phone,
      Email: email,
    };

    if (edit) {
      // Update existing entry
      const updatedEntry = entry.map((entryItem) => {
        if (entryItem === selectedEntry) {
          return newEntry;
        }
        return entryItem;
      });

      setEntry(updatedEntry);
      setEdit(false);
      setSelectedEntry(null);
    } else {
      // Add new entry
      setEntry([...entry, newEntry]);
    }

    // Clear input fields after submitting
    setName('');
    setAddress('');
    setPhone('');
    setEmail('');
  };

  // Editing an entry in the table
  const editEntry = (data) => {
    setEdit(true);
    setSelectedEntry(data);

    // Setting the values of the selected entry in the input fields
    setName(data.Name);
    setAddress(data.Address);
    setPhone(data.Phone);
    setEmail(data.Email);
  };

  // Deleting an entry from the table
  const deleteEntry = (ent) => {
    const updatedEntry = entry.filter((e) => e !== ent);
    setEntry(updatedEntry);
  };

  return (
    <>
      <div className="header">
        <h3>Address Book</h3>
      </div>
      <div className="container">
        <div className="ent">
          <h3>Create New Entries</h3>
          <div>
            <label>Name:-</label>
            <input
              placeholder="Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Address:-</label>
            <input
              placeholder="Address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label>Phone:-</label>
            <input
              id="phn"
              type="number"
              placeholder="Phone..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label>Email:-</label>
            <input
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button onClick={Add}>Add Entry</button>
        </div>
        <div>
          <div className="myentry">
            <h3>Entries</h3>
            <span className="A11">
              {/* <BiSearch /> */}
              {/* <input placeholder="Search..." /> */}
            </span>
          </div>
          <div>
            <table>
              <thead>
                
                  <td>Name</td>
                  <td>Address</td>
                  <td>Phone</td>
                  <td>Email</td>
                  <td>Action</td>
                
              </thead>
              <tbody>
                {entry.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{data.Name}</td>
                      <td>{data.Address}</td>
                      <td>{data.Phone}</td>
                      <td>{data.Email}</td>
                      <td id="A2">
                        {edit && selectedEntry === data ? (
                          <button onClick={Add}>Save</button>
                        ) : (
                          <button onClick={() => editEntry(data)}>
                            <BiEdit />
                          </button>
                        )}
                        <button onClick={() => deleteEntry(data)}>
                          <ImBin2 />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
