import { useEffect, useState } from 'react';
import {
  ButtonStyle,
  Card,
  CheckBox,
  Container,
  GuestList,
  InputContainer,
  Label,
  RemoveButton,
} from './style';

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

  return (
    <Container data-test-id="guest">
      <h1>Add Guest</h1>
      <Card>
        {/* First name input */}
        <InputContainer>
          <Label htmlFor="First-name">First name</Label>
          <input
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
        </InputContainer>
        {/* Last name input */}
        <InputContainer>
          <Label htmlFor="Last-name">Last name</Label>
          <input
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </InputContainer>

        {/* Button to add new guest */}
        <ButtonStyle
          onClick={async () => {
            await addGuest();
            setFirstName('');
            setLastName('');
          }}
        >
          Add
        </ButtonStyle>
      </Card>
      {guestList.length > 0 ? (
        /* /* Mapping over an array */
        <div>
          <h3>Guest List:</h3>

          {guestList.map((el) => (
            <GuestList key={el.id}>
              <p style={{ marginRight: '30px' }}>{el.firstName}</p>
              <p style={{ marginRight: '30px' }}>{el.lastName}</p>

              {/* Checkbox to change attending status */}
              <CheckBox
                checked={el.attending}
                type="checkbox"
                aria-label="attending"
                onChange={async (event) => {
                  await updateGuest(el.id, event.target.checked);
                }}
              />
              {/* Button to delete a guest */}
              <RemoveButton
                onClick={async () => {
                  await removeGuest(el.id);
                }}
              >
                Remove
              </RemoveButton>
            </GuestList>
          ))}
        </div>
      ) : (
        <div>Loading Text</div>
      )}
    </Container>
  );
}

export default App;
