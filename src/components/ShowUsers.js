import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ShowUsers = () => {
    const url = 'http://127.0.0.1:8000/wallet/api/users/';
    
    const [users, setUsers] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [second_surname, setSecondSurname] = useState('');
    const [identification, setIdentification] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState('');

    useEffect( () => {
        getUsers();
    }, [])

    const getUsers = async () => {
        const res = await axios.get(url);
        setUsers(res.data)
    }

    const openModal = (op,id, name, surname, second_surname, identification, birthdate, email) =>{
        setId('');
        setName('');
        setSurname('');
        setSecondSurname('');
        setIdentification('');
        setBirthdate('');
        setEmail('');
        setOperation(op);
        if(op === 1){
            setTitle('Crear usuario');
        }
        else if(op === 2){
            setTitle('Editar usuario');
            setId(id);
            setName(name);
            setSurname(surname);
            setSecondSurname(second_surname);
            setIdentification(identification);
            setBirthdate(birthdate);
            setEmail(email);
        }
    }

    const validation = () => {
        var parameters;
        var method;
        if(name==='' || surname==='' || second_surname==='' || identification==='' || birthdate==='' || email===''){
            alert("Complete todos los campos, por favor.")
        }
        else{

            var date = birthdate;
            var date2 = new Date(date);
            var year = date2.getFullYear();
            var month = date2.getMonth() + 1; 
            var day = date2.getDate() + 1; 
            var new_date = year+'-'+month+'-'+day;

            if(operation === 1){
                parameters= {name:name, surname:surname, second_surname:second_surname,
                    identification:identification, birthdate:new_date, email:email};
                method= 'POST';
            }
            else{
                parameters={id:id, name:name, surname:surname, second_surname:second_surname,
                    identification:identification, birthdate:new_date, email:email};
                method= 'PUT';
            }
            apiRequest(method,parameters);
        }
    }

    const apiRequest = async(method,parameters) => {
        if(method === 'PUT' || method === 'DELETE'){
            const urlA=`http://127.0.0.1:8000/wallet/api/users/${parameters.id}/`;        
        
            await axios({ method:method, url: urlA, data:parameters}).then(function(res){
                var tipo = res.statusText;
                if(tipo === 'OK' || tipo === 'No Content'){
                    document.getElementById('btnCerrar').click();
                    alert("Operación realizada exitosamente.")
                    getUsers();
                }
            })
            .catch(function(error){
                console.log(error);
            });
        }
        else{
            await axios({ method:method, url: url, data:parameters}).then(function(res){
                var tipo = res.statusText;
                if(tipo === 'Created'){
                    document.getElementById('btnCerrar').click();
                    alert("Usuario creado exitosamente.")
                    getUsers();
                }
            })
            .catch(function(error){
                console.log(error);
            });

        }
    }
    const deleteProduct= (id, identification) =>{
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title:'¿Seguro de eliminar el usuario con identificación '+identification+' ?',
            icon: 'question',text:'No podrá deshacer esta acción.',
            showCancelButton:true,confirmButtonText:'Eliminar',cancelButtonText:'Cancelar'
        }).then((result) =>{
            if(result.isConfirmed){
                setId(id);
                apiRequest('DELETE',{id:id});
            }
            else{
                console.log("error")
            }
        });
    }

  return (
    <div className = 'App'>
        <div className = 'container-fluid'>
            <br></br>
            <div className = 'row mt -3'>
                <div className = 'col-md-4 offset-md-4'>
                    <div className = 'd-grid mx-auto'>
                        <button onClick={()=> openModal(1)} className = 'btn btn-dark' data-bs-toggle = 'modal' data-bs-target = '#modalUsers'>
                            <i className='fa-solid fa-circle-plus'></i> Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className='row mt-3'>
            {/* <div className='col-12 col-lg-8 offset-0 offset-lg-2'> */}
            <div className='col-12 col-lg-10 offset-0 offset-lg-1'>
                <div className='table-responsive'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Primer apellido</th>
                                <th>Segundo apellido</th>
                                <th>Identificación</th>
                                <th>Fecha de nacimiento</th>
                                <th>Correo</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                            {users.map( (user, i) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.surname}</td>
                                    <td>{user.second_surname}</td>
                                    <td>{user.identification}</td>
                                    <td>{user.birthdate}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button onClick={() => openModal(2, user.id, user.name, user.surname, user.second_surname,
                                            user.identification, user.birthdate, user.email)}
                                                className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalUsers'>
                                            <i className='fa-solid fa-edit'></i>
                                        </button>
                                        &nbsp;
                                        <button onClick={()=>deleteProduct(user.id, user.identification)} className='btn btn-danger'>
                                            <i className='fa-solid fa-trash'></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div id='modalUsers' className='modal fade' aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className='h5'>{title}</label>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <input type='hidden' id='id'></input>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-user'></i></span>
                            <input type='text' id='name' className='form-control' placeholder='Nombre' value={name}
                            onChange={(e)=> setName(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-user'></i></span>
                            <input type='text' id='surname' className='form-control' placeholder='Primer apellido' value={surname}
                            onChange={(e)=> setSurname(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-user'></i></span>
                            <input type='text' id='second_surname' className='form-control' placeholder='Segundo apellido' value={second_surname}
                            onChange={(e)=> setSecondSurname(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-id-card'></i></span>
                            <input type='number' id='identification' className='form-control' placeholder='Identificación' value={identification}
                            onChange={(e)=> setIdentification(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-calendar-alt'></i></span>
                            <input type='date' id='birthdate' className='form-control' placeholder='Fecha de nacimiento' value={birthdate}
                            onChange={(e)=> setBirthdate(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-envelope'></i></span>
                            <input type='email' id='email' className='form-control' placeholder='Correo electrónico' value={email}
                            onChange={(e)=> setEmail(e.target.value)}></input>
                        </div>
                        <div className='d-grid col-6 mx-auto'>
                            <button onClick={() => validation()} className='btn btn-success'>
                                <i className='fa-solid fa-floppy-disk'></i> Guardar
                            </button>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button hidden type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ShowUsers