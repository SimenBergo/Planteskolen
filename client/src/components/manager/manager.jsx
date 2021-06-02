import UsersList from './UsersList';
import UsersInsert from './UsersInsert';


export default function Manager () {
    return (
        <div id="manager">
            <h2>Manager page</h2>
                <UsersList />
            <div id="addUser">
                <UsersInsert />
            </div>
            
        </div>
    )
};
