import axios from 'axios';
import { useState, useEffect } from 'react';

const baseUrl = 'http://localhost:3000/api';

//rfce
function Users() {
    //usestates 
    const [usersArr, setUsersArr] = useState([]);
    const [nameVal, setNameVal] = useState('');
    const [townVal, setTownVal] = useState('');
    const [isDriver, setIsDriver] = useState(false);
    //parsisusti users iskonsolinti
    useEffect(() => {
        getUsers();
    }, []);

    function getUsers(){
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

function handleNewUserSubmit (event) {
    event.preventDefault();
    console.log('js is in control')
    // sudeti viska i viena obj
    const newUser ={
        name: nameVal,
        town: townVal,
        isDriver,
    };
    console.log(newUser);
    //siusti ta obj i back
    axios.post(`${baseUrl}/users`, newUser)
    .then((ats) => {
        console.log(ats);
        if(ats.status ===201){
            //success useris sukurtas
            //atnaujinti sarasa
            getUsers();
            return;
        }
        //nesekme, nepavyko
        
    })
    .catch(error => {
        console.warn('ivyko klaida:', error)
        //show errors
        alert ('klaida');
    })
}

console.log(nameVal)

    return (
        <div>
            <h2>Users</h2>
            <h3>Add new user</h3>
            <form onSubmit={handleNewUserSubmit} className='border p-4' >
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
                    value={isDriver}
                    onChange={(e) => setIsDriver(e.target.checked)}
                    type='checkbox' 
                    className='form-check-input' 
                    id='town' />
                    <label htmlFor='exampleCheck1' className='form-check-label'>Driver</label>
                </div>
                <button className='btn btn-outline-info'>Creat</button>
            </form>
            <ul className='list-group'>
                {usersArr.map((uObj) =>
                    <li className='list-group-item' key={uObj.id}>
                        (id: {uObj.id}) {uObj.name} yra is {uObj.town}. vairuoja: {''}
                        {uObj.isDriver ? 'Taip' : 'Ne'}
                        <button className='btn btn-danger mx-3'>Delete</button>
                        <button className='btn btn-success'>Edit</button>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Users