import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [attendingStatus, setAttendingStatus] = useState(false);
  const [guestList, setGuestList] = useState([]);
  const [checkBoxValue, setCheckBoxValue] = useState(false);
  const [isloading, setIsLoading] = useState(true);
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
        attending: attendingStatus,
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
  }
  // fetching data array
  useEffect(() => {
    async function fetchGuest() {
      const response = await fetch(`${baseUrl}/guests`);
      const data = await response.json();
      setGuestList(data);
    }
    fetchGuest();
  }, []);

  // Updating a guest
  async function updateGuest() {
    const response = await fetch(`${baseUrl}/guests/1`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: true }),
    });
    const updatedGuest = await response.json();
  }

  // is loading msg
  /* useEffect(() => {
    if (guestList) {
      setIsLoading(false);
    }
  }, [guestList]);
  if (isloading) return <div>Loading Text</div>; */

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  /* if (!guestList) return <div>is Loading...</div>; */

  return (
    <div>
      <h1>Guest List</h1>

      <label htmlFor="First-name">First name</label>
      <input
        value={firstName}
        onChange={(event) => {
          setFirstName(event.target.value);
        }}
      />
      <label htmlFor="Last-name">Last name</label>
      <input
        value={lastName}
        onChange={(event) => {
          setLastName(event.target.value);
        }}
      />

      {/* checkbox created */}
      {/* {guestList.map((el) => (
        <div key={el.id}>
          Attending Status
          <input
            checked={checkBoxValue}
            type="checkbox"
            aria-label="attending"
            onChange={(event) => setCheckBoxValue(event.currentTarget.checked)}
          />
        </div>
      ))} */}

      {/* <input
        checked={checkBoxValue}
        type="checkbox"
        aria-label="attending"
        onChange={(event) => setCheckBoxValue(event.currentTarget.checked)}
      /> */}

      {/* Button to add new guest */}
      <button onClick={addGuest}>Add</button>

      {/* Button to  delete guest */}

      {/*  <button
        onClick={async () => {
          await removeGuest();
        }}
      >
        Remove
      </button> */}

      {/* /* Mapping over an array */}

      <div>
        <ul>
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
                <p>{String(el.attending)}</p>
                <button
                  onClick={async () => {
                    await removeGuest(el.id);
                  }}
                >
                  Remove
                </button>
                <input
                  checked={checkBoxValue}
                  type="checkbox"
                  aria-label="attending"
                  onChange={(event) =>
                    setCheckBoxValue(event.currentTarget.checked)
                  }
                />
              </div>
            ))
            /* .filter((index) => index !== key={el.id}) */
          }
        </ul>
      </div>
      {/*  {(guestList.filter((el , i) => i !== key={el.id}), [setGuesList])} */}
    </div>
  );
}

export default App;
