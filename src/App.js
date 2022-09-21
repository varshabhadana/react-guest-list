import { useEffect, useState } from 'react';

function App() {
  const [firstName, setfirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guestList, setGuesList] = useState([]);
  const baseUrl = 'https://232afac8-d1ad-4b1c-a25c-b32515b1eaed.id.repl.co';

  // creating new guest
  async function addGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    });
    const createdGuest = await response.json();
  }
  // Deleting a guest
  async function removeGuest() {
    const response = await fetch(`${baseUrl}/guests/4`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
  }
  // fetching data array
  useEffect(() => {
    async function fetchGuest() {
      const response = await fetch(`${baseUrl}/guests`);
      const data = await response.json();
      setGuesList(data);
    }
    fetchGuest();
  }, []);

  return (
    <div>
      <h1>Guest List</h1>
      <label htmlFor="First-name">First name</label>
      <input
        value={firstName}
        onChange={(event) => {
          setfirstName(event.target.value);
        }}
      />
      <label htmlFor="Last-name">Last name</label>
      <input
        value={lastName}
        onChange={(event) => {
          setLastName(event.target.value);
        }}
      />
      {/* Button to add new guest */}
      <button onClick={addGuest}>Add</button>
      {/* Button to add delete guest */}
      <button
        onClick={async () => {
          await removeGuest();
        }}
      >
        Remove
      </button>
      {/* Mapping over an array */}
      <div>
        <ul>
          {guestList.map((el) => (
            <div key={el.id}>
              <p>{el.firstName}</p>
              <p>{el.lastName}</p>
              <p>{String(el.attending)}</p>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
