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

  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = 'https://232afac8-d1ad-4b1c-a25c-b32515b1eaed.id.repl.co';

  // fetching data array
  useEffect(() => {
    async function fetchGuest() {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/guests`);
      const data = await response.json();
      setGuestList(data);
      setIsLoading(false);
    }
    fetchGuest().catch((err) => {
      console.error(err);
    });
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
    setGuestList([...guestList, createdGuest]);
  }
  // Deleting a guest
  async function removeGuest(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });

    const deletedGuest = await response.json();
    setGuestList(guestList.filter((el) => el.id !== deletedGuest.id));
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
    setGuestList(
      guestList.map((el) => (el.id !== updatedGuest.id ? el : updatedGuest)),
    );
  }

  return (
    <Container data-test-id="guest">
      <h1>Add Guest</h1>
      <Card>
        {/* First name input */}
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await addGuest();
            setFirstName('');
            setLastName('');
          }}
        >
          <InputContainer>
            <Label htmlFor="first-name">First name</Label>
            <input
              id="first-name"
              value={firstName}
              disabled={isLoading}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </InputContainer>
          {/* Last name input */}
          <InputContainer>
            <Label htmlFor="last-name">Last name</Label>
            <input
              id="last-name"
              value={lastName}
              disabled={isLoading}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </InputContainer>

          {/* Button to add new guest */}
          <ButtonStyle
            type="submit"
            /* onClick={async () => {
            await addGuest();
            setFirstName('');
            setLastName('');
          }} */
          >
            Add
          </ButtonStyle>
        </form>
      </Card>

      {/* Ternary on Loading message */}

      {!isLoading ? (
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
        <div>Loading...</div>
      )}
    </Container>
  );
}

export default App;
