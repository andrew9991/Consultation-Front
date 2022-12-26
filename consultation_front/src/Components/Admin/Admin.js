import { useEffect, useState } from 'react';
import api from '../../Axios';
import classes from './Admin.module.css';
import AdminDashboard from './Dashboard';

function Admin() {
    const [users, setUsers] = useState([]);
    const [unapprovedManagers, setUnapprovedManagers] = useState([]);
    const [isActive, setIsActive] = useState(true);

    async function getUsers() {
        try {
            var users = await api.get(`/user/`);
            users = users.data;
            setUsers(users);
        } catch (err) {
            console.log(err);
        }
    }

    async function getUnapprovedManagers() {
        try {
            var users = await api.get(`/user/unapproved`);
            users = users.data;
            setUnapprovedManagers(users);
        } catch (err) {
            console.log(err);
        }
    }

    async function deleteUser(id) {
        try {
            await api.post(`/user/remove/`,
            {
                user_id: id
            });
            getUsers();
            getUnapprovedManagers();
        } catch (err) {
            console.log(err);
        }
    }

    async function approveManager(id) {
        try {
            let res = await api.post(`/user/approve/`,
            {
                user_id: id
            });
            console.log(res);
            getUnapprovedManagers();
        } catch (err) {
            console.log(err);
        }
    }

    function roleFromType(type) {
        if (type === 0) {
            return "Admin";
        } else if (type === 1) {
            return "Manager";
        } else if (type === 2) {
            return "Customer";
        }
    }

    function sortUsers(id) {
        switch (id) {
            case 0:
                users.sort((a, b) => {
                    if (a.user_name.toLowerCase() < b.user_name.toLowerCase()) {
                        return -1;
                    } else if (a.user_name.toLowerCase() > b.user_name.toLowerCase()) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                break;
            case 1:
                users.sort((a, b) => {
                    if (a.first_name?.toLowerCase() ?? '|' < b.first_name?.toLowerCase() ?? '|') {
                        return -1;
                    } else if (a.first_name?.toLowerCase() ?? '|' > b.first_name?.toLowerCase() ?? '|') {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                break;
            case 2:
                users.sort((a, b) => {
                    if (a.last_name ?? '|' < b.last_name ?? '|') {
                        return -1;
                    } else if (a.last_name ?? '|' > b.last_name ?? '|') {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                break;
            case 3:
                users.sort((a, b) => {
                    if (a.user_email < b.user_email) {
                        return -1;
                    } else if (a.user_email > b.user_email) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                break;
            case 4:
                users.sort((a, b) => {
                    console.log(Date.parse(a.birth_date));
                    if (Date.parse(a.birth_date) ?? '|' < Date.parse(b.birth_date) ?? '|') {
                        return -1;
                    } else if (Date.parse(a.birth_date) ?? '|' > Date.parse(b.birth_date) ?? '|') {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                break;
            case 5:
                users.sort((a, b) => {
                    if (a.gender ?? '|' < b.gender ?? '|') {
                        return -1;
                    } else if (a.gender ?? '|' > b.gender ?? '|') {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                break;
            case 6:
                users.sort((a, b) => {
                    if (a.type < b.type) {
                        return -1;
                    } else if (a.type > b.type) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                break;
            default:
                break;
            }
        setUsers((prev) => [...prev]);
    }
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        getUsers();
        getUnapprovedManagers();
    }, []);

    return ( 
        <div className={classes.admin}>
            <AdminDashboard isApproved = {isActive} setIsActive = {setIsActive}></AdminDashboard>
            <div className={classes.users}>
                <h1>Users List</h1>
                {isActive ? <table className={classes.table} border={0} cellPadding={10}>
                    <tr className={classes.headRow}>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Birth Date</th>
                        <th>Nationality</th>
                        <th>Gender</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                    {users.map((user, index) => {
                        return (
                            <tr key={index} className={index % 2 == 0 ? classes.userRowE : classes.userRowO}>
                                <td>{user.user_name}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.user_email}</td>
                                <td>{user.birth_date}</td>
                                <td>{user.nationality}</td>
                                <td>{user.gender}</td>
                                <td>{roleFromType(user.type)}</td>
                                <td><button className={classes.deleteButton} onClick={() => deleteUser(user.user_id)}>Delete</button></td>
                            </tr>
                        );
                    })
                    }
                </table>
                :
                <table className={classes.table} border={0} cellPadding={10}>
                    <tr className={classes.headRow}>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Birth Date</th>
                        <th>Nationality</th>
                        <th>Gender</th>
                        <th>Role</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {unapprovedManagers.map((user, index) => {
                        return (
                            <tr key={index} className={index % 2 == 0 ? classes.userRowE : classes.userRowO}>
                                <td>{user.user_name}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.user_email}</td>
                                <td>{user.birth_date}</td>
                                <td>{user.nationality}</td>
                                <td>{user.gender}</td>
                                <td>{roleFromType(user.type)}</td>
                                <td><button className={`${classes.deleteButton} ${classes.approve}`} onClick={() => approveManager(user.user_id)}>Approve</button></td>
                                <td><button className={classes.deleteButton} onClick={() => deleteUser(user.user_id)}>Delete</button></td>
                            </tr>
                        );
                    })
                    }
                </table>
                }
            </div>
        </div>
     );
}

export default Admin;