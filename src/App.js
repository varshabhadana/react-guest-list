import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [guestList, setGuestList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = 'https://232afac8-d1ad-4b1c-a25c-b32515b1eaed.id.repl.co';

  // fetching data array
  useEffect(() => {
    async function fetchGuest() {
      const response = await fetch(`${baseUrl}/guests`);
      const data = await response.json();
      setGuestList(data);
    }
    fetchGuest();
  }, []);

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
  async function removeGuest(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });

    const deletedGuest = await response.json();
    console.log(deletedGuest);
  }

  // Updating a guest
  async function updateGuest(id, status) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: status }),
    });
    const updatedGuest = await response.json();
  }

  // is loading msg
  useEffect(() => {
    if (guestList.length > 0) {
      setIsLoading(false);
    }
  }, [guestList]);

  if (isLoading) return <div>Loading Text</div>;

  return (
    <div>
      <h1>Guest List</h1>

      {/* First name input */}

      <label htmlFor="First-name">First name</label>
      <input
        value={firstName}
        onChange={(event) => {
          setFirstName(event.target.value);
        }}
      />
      {/* Last name input */}

      <label htmlFor="Last-name">Last name</label>
      <input
        value={lastName}
        onChange={(event) => {
          setLastName(event.target.value);
        }}
      />

      {/* Button to add new guest */}
      <button onClick={addGuest}>Add</button>

      {/* /* Mapping over an array */}

      <div>
        {
          guestList.map((el) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'coloumn',
                marginright: '30px',
              }}
              key={el.id}
            >
              <p style={{ marginRight: '30px' }}>{el.firstName}</p>
              <p style={{ marginRight: '30px' }}>{el.lastName}</p>

              {/* Checkbox to change attending status */}
              <input
                checked={el.attending}
                type="checkbox"
                aria-label="attending"
                onChange={async (event) => {
                  await updateGuest(el.id, event.target.checked);
                }}
              />
              {/* Button to delete a guest */}
              <button
                onClick={async () => {
                  await removeGuest(el.id);
                }}
              >
                Remove
              </button>
            </div>
          ))

          /* .filter((index) => index !== key={el.id}) */
        }
      </div>
      {/*  {(guestList.filter((el , i) => i !== key={el.id}), [setGuesList])} */}
    </div>
  );
}

export default App;
