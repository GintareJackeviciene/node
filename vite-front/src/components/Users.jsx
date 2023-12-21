import axios from 'axios';
import { useState, useEffect } from 'react';

const baseUrl = 'http://localhost:3000/api';

function Users() {
  const [isEditOn, setIsEditOn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(0);
  const [usersArr, setUsersArr] = useState([]);
  const [nameVal, setNameVal] = useState('');
  const [townVal, setTownVal] = useState('');
  const [isDriver, setIsDriver] = useState(false);
  const [errorField, setErrorField] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  // parsisiusti usersius ir iskonsolinti
  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios
      .get(`${baseUrl}/users`)
      .then((ats) => {
        console.log('ats ===', ats);
        setUsersArr(ats.data);
      })
      .catch((error) => {
        console.warn('ivyko klaida:', error);
      });
  }

  // sugeneruoti html

  console.log('usersArr ===', usersArr);

  function clearErrrors() {
    setErrorField('');
    setErrorMsg('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    clearErrrors();
    if (isEditOn) {
      handleUpdateFetch();
    } else {
      handleNewUserSubmit();
    }
  }

  function handleUpdateFetch() {
    console.log('handleUpdateFetch() updating');
    const updatedUser = {
      name: nameVal,
      town: townVal,
      isDriver,
    };
    const updateUrl = `${baseUrl}/users/${currentUserId}`;
    axios
      .put(updateUrl, updatedUser)
      .then((ats) => {
        console.log('ats ===', ats);
      })
      .catch((error) => {
        console.warn('ivyko klaida:', error);
        console.warn(error.response.data);
      });
  }

  function handleNewUserSubmit() {
    console.log('js is in control');
    // sudeti viska i viena obj
    const newUser = {
      name: nameVal,
      town: townVal,
      isDriver,
    };
    console.log('newUser ===', newUser);
    // siusiuti ta ob i back
    axios
      .post(`${baseUrl}/users`, newUser)
      .then((ats) => {
        console.log('ats ===', ats);
        if (ats.status === 201) {
          // success useris sukurtas
          // atnaujinti sarasa
          getUsers();
          setNameVal('');
          setTownVal('');
          setIsDriver(false);
          return;
        }
        // neskeme, nepavyko
      })
      .catch((error) => {
        console.warn('ivyko klaida sukuriant user:', error);
        const { status, data } = error.response;
        if (status === 400) {
          // handleError(data)
          console.log('data ===', data);
          setErrorField(data.field);
          setErrorMsg(data.error);
        }
        // show errors
      });
    // pavyko ar ne
  }

  function handleEdit(idToEdit) {
    console.log('handleEdit', idToEdit);
    setIsEditOn(true);
    fillFormWihtData(idToEdit);
    setCurrentUserId(idToEdit);
  }

  function fillFormWihtData(id) {
    // supuldyti forma
    const found = usersArr.find((uObj) => uObj.id === id);
    console.log('found ===', found);
    setNameVal(found.name);
    setTownVal(found.town);
    setIsDriver(found.isDriver);
  }

  console.log('nameVal ===', nameVal);

  function handleDelete(idToDelete) {
    console.log('deleting post', idToDelete);
    // siutti uzklausa istrynimui
    // http://localhost:3000/api/users/2
    const delUrl = `${baseUrl}/users/${idToDelete}`;
    axios
      .delete(delUrl)
      .then((ats) => {
        console.log('ats ===', ats);
        // pavyko, atnaujinti sarasa
        // getUsers(); // sukuria papildoma uzklausa
        setUsersArr(ats.data);
      })
      .catch((error) => {
        console.warn('ivyko klaida:', error);
      });
  }

  return (
    <div>
      <h2>Users</h2>

      <h3>Add new user</h3>
      <form onSubmit={handleSubmit} className='border p-4 '>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            value={nameVal}
            onChange={(e) => setNameVal(e.target.value)}
            type='text'
            className={`form-control ${
              errorField === 'name' ? 'is-invalid' : ''
            }`}
            id='name'
          />
          {errorField === 'name' && (
            <span className='text-danger'>{errorMsg}</span>
          )}
        </div>
        <div className='mb-3'>
          <label htmlFor='town' className='form-label'>
            Town
          </label>
          <input
            value={townVal}
            onChange={(e) => setTownVal(e.target.value)}
            type='text'
            className={`form-control ${
              errorField === 'town' ? 'is-invalid' : ''
            }`}
            id='town'
          />
          {errorField === 'town' && (
            <span className='text-danger'>{errorMsg}</span>
          )}
        </div>
        <div className='mb-3 form-check'>
          <input
            checked={isDriver}
            onChange={(e) => setIsDriver(e.target.checked)}
            type='checkbox'
            className='form-check-input'
            id='exampleCheck1'
          />
          <label className='form-check-label' htmlFor='exampleCheck1'>
            Driver
          </label>
        </div>

        {isEditOn === false && (
          <button type='submit' className='btn btn-outline-info'>
            Create
          </button>
        )}

        {isEditOn === true && (
          <button type='submit' className='btn btn-secondary'>
            Update
          </button>
        )}
      </form>

      <ul className='list-group'>
        {usersArr.map((uObj) => (
          <li className='list-group-item' key={uObj.id}>
            (id: {uObj.id}) {uObj.name} yra is {uObj.town}. vairuoja:{' '}
            {uObj.isDriver ? 'Taip' : 'Ne'}
            <button
              onClick={() => handleDelete(uObj.id)}
              // onClick={handleDelete.bind(null, uObj.id, event)}
              className='btn btn-danger mx-3'>
              delete
            </button>
            <button
              onClick={() => handleEdit(uObj.id)}
              className='btn btn-success'>
              edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;