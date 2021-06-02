import UsersInsert from '../manager/UsersInsert';

export default function SignUp (props) {
    return (
        <UsersInsert isManager = { props.isManager} />
    )
}