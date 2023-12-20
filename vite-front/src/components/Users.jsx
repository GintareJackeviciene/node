import axios from 'axios';
import { useState, useEffect } from 'react';

const baseUrl = 'http://localhost:3000/api';

//rfce
function Users() {
    //usestates 
    const [isEditOn, setIsEditOn] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(0);
    const [usersArr, setUsersArr] = useState([]);
    const [nameVal, setNameVal] = useState('');
    const [townVal, setTownVal] = useState('');
    const [isDriver, setIsDriver] = useState(false);
    //parsisusti users iskonsolinti
    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get(`${baseUrl}/users`)
            .then((ats) => {
                console.log(ats);
                setUsersArr(ats.data)
            })
            .catch(error => {
                console.warn('ivyko klaida:', error)
            })
    }
    //ir sugeneruoti html
    console.log(usersArr)

    function handleSubmit(event) {
        event.preventDefault();
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
        const updateUrl =`${baseUrl}/users/${currentUserId}`;
        axios.put(updateUrl, updatedUser)
        .then(ats => {
            console.log(ats)
        })
        .catch(error => {
            console.warn('ivyko klaida:', error)
            //show errors
          console.warn(error.response.data);
        })
    }

    function handleNewUserSubmit() {

        console.log('js is in control')
        // sudeti viska i viena obj
        const newUser = {
            name: nameVal,
            town: townVal,
            isDriver,
        };
        console.log(newUser);
        //siusti ta obj i back
        axios.post(`${baseUrl}/users`, newUser)
            .then((ats) => {
                console.log(ats);
                if (ats.status === 201) {
                    //success useris sukurtas
                    //atnaujinti sarasa
                    getUsers();
                    setNameVal('');
                    setTownVal('');
                    setIsDriver(false);
                    return;
                }
                //nesekme, nepavyko

            })
            .catch(error => {
                console.warn('ivyko klaida:', error)
                //show errors
                alert('klaida');
            })
    }

    function handleEdit(idToEdit) {
        console.log('handleEdit', idToEdit);
        setIsEditOn(true);
        fillFormWithData(idToEdit);
        setCurrentUserId(idToEdit);
    }

    function fillFormWithData(id) {
        //supildyti forma i steita surasyti visas reiksmes kurios yra sita id
        const found = usersArr.find((uObj) => uObj.id === id);
        setNameVal(found.name);
        setTownVal(found.town);
        setIsDriver(found.isDriver);
    }

    console.log(nameVal);

    function handleDelete(idToDelete) {
        console.log('deleting post', idToDelete);
        // siusti uzklausa istrynimui
        // http://localhost:3000/api/users/2
        const delUrl = `${baseUrl}/users/${idToDelete}`;
        axios.delete(delUrl)
            .then(ats => {
                console.log(ats);
                // pavyko, atnaujinti sarasa
                // getUsers();//sukuria papildoma uzklausa
                setUsersArr(ats.data);
            })
            .catch(error => {
                console.warn('ivyko klaida:', error);
                //show errors
                alert('klaida');
            })
    }

    return (
        <div>
            <h2>Users</h2>
            <h3>Add new user</h3>
            <form onSubmit={handleSubmit} className='border p-4' >
                <div className='mb-3'>
                    <label htmlFor='name' className='form-label'>Name
                    </label>
                    <input
                        value={nameVal}
                        onChange={(e) => setNameVal(e.target.value)}
                        type='text'
                        className='form-control'
                        id='name' />
                </div>
                <div className='mb-3'>
                    <label htmlFor='town' className='form-label'>Town
                    </label>
                    <input
                        value={townVal}
                        onChange={(e) => setTownVal(e.target.value)}
                        type='text'
                        className='form-control'
                        id='name' />
                </div>
                <div className='mb-3 form-check'>
                    <input
                        checked={isDriver}
                        onChange={(e) => setIsDriver(e.target.checked)}
                        type='checkbox'
                        className='form-check-input'
                        id='town' />
                    <label htmlFor='exampleCheck1' className='form-check-label'>Driver</label>
                </div>
                {isEditOn === false && (<button className='btn btn-outline-info'>Creat</button>)}
                {isEditOn === true && (<button className='btn btn-secondary'>Update</button>)}
            </form>
            <ul className='list-group'>
                {usersArr.map((uObj) =>
                    <li className='list-group-item' key={uObj.id}>
                        (id: {uObj.id}) {uObj.name} yra is {uObj.town}. vairuoja: {''}
                        {uObj.isDriver ? 'Taip' : 'Ne'}
                        <button
                            onClick={() => handleDelete(uObj.id)}
                            className='btn btn-danger mx-3'>
                            Delete
                        </button>
                        <button
                            onClick={() => handleEdit(uObj.id)}
                            className='btn btn-success'>
                            Edit
                        </button>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Users