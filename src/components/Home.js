import React, { useState } from "react";
import { useEffect } from "react";
import appFirebase from "../credential";
import { deleteUser, getAuth, signOut, updateCurrentUser } from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    getDoc,
    setDoc,
} from "firebase/firestore";

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

const Home = ({ email }) => {
    const startValue = { name: "", age: "", profession: "" };
    // state variable
    const [user, setUser] = useState(startValue);
    const [lista, setList] = useState([]);
    const [subId, setSubId] = useState('')
    // capture inputs
    const getInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    const saveData = async (e) => {
        e.preventDefault();// evitar que recarge la pagina
        
        if(subId === ''){
            try {
                await addDoc(collection(db, "users"), { ...user });
            } catch (error) {
                console.log(error);
            }
        }else { 
            await setDoc(doc(db,'users',subId),{
                ...user
            })
        }
       
        setUser({ ...startValue });
        setSubId('')
    };

    useEffect(() => {
        const getLista = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'users'))
                const docs = []
                querySnapshot.docs.forEach((doc) => {
                    docs.push({ ...doc.data(), id: doc.id })
                })
                setList(docs)
            } catch (error) {   
                console.log(error);
            }
        }
        getLista()
    }, [lista])

    //delete user
    const deleteUser = async (id) => {
        await deleteDoc(doc(db, 'users', id))
    }

    const getOne = async (id) => {
        try {
            const docRef = doc(db, 'users', id)
            const docSnap = await getDoc(docRef)
            setUser(docSnap.data())
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (subId !== '') {
            getOne(subId)
        }
    }, [subId])

    return (
        <div className="container">
            <p>
                Bienvenido, <strong>{email}</strong>
            </p>
            <button className="btn btn-primary" onClick={() => signOut(auth)}>
                Cerrar Sesion
            </button>

            <hr />
            <div className="row">
                <div className="col-md-4">
                    <h3 className="text-center mb-3">Ingresar usuarios</h3>
                    <form onSubmit={saveData}>
                        <div className="card card-body">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control mb-3"
                                    placeholder="Ingresar nombre de usuario"
                                    onChange={getInput}
                                    value={user.name}
                                />
                                <input
                                    type="text"
                                    name="age"
                                    className="form-control mb-3"
                                    placeholder="Ingresar nombre la edad"
                                    onChange={getInput}
                                    value={user.age}
                                />
                                <input
                                    type="text"
                                    name="profession"
                                    className="form-control mb-3"
                                    placeholder="Ingresar nombre de la profesion"
                                    onChange={getInput}
                                    value={user.profession}
                                />
                            </div>

                            <button className="btn btn-primary">{subId === '' ? 'Guardar': 'Actualizar'}</button>
                        </div>
                    </form>
                </div>
                <div className="col-md-8">
                    <h2 className="text-center mb-5">Lista de Usuarios</h2>

                    <div className="container card">
                        <div className="card-body">
                            {lista?.map((list) => (
                                <div key={list.id}>
                                    <p>Nombre: {list.name}</p>
                                    <p>Edad: {list.age}</p>
                                    <p>Profesion: {list.profession}</p>

                                    <button className="btn btn-danger" onClick={() => deleteUser(list.id)}>Eliminar</button>
                                    <button className="btn btn-success m-1" onClick={() => setSubId(list.id)}>Actulizar</button>
                                    <hr />
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Home;
