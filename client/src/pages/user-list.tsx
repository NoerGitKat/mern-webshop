import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import TableHead from "../components/TableHead";
import {
  deleteUser,
  getAllUsers,
  logUserOut,
} from "../redux/actions/user-actions";
import { IInitialState } from "../types/main-interfaces";

interface IUserListProps {
  history: {
    push: (url: string) => void;
  };
}

const UserListPage: React.FC<IUserListProps> = ({ history }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(
    (state: IInitialState) => state.loggedInUser
  );

  const { userDetails } = loggedInUser;

  const userList = useSelector((state: IInitialState) => state.userList);
  const { users, loading, error, successDelete } = userList;

  useEffect(() => {
    if (userDetails && userDetails.isAdmin && error !== "jwt expired") {
      dispatch(getAllUsers(userDetails.token));
    } else {
      dispatch(logUserOut());
      history.push("/");
    }
  }, [dispatch, history, userDetails, successDelete, error]);

  const handleDelete = (token: string, id: string) => {
    if (window.confirm("Are you sure you want to remove this user?"))
      dispatch(deleteUser(token, id));
  };

  return (
    <>
      <h1>All Users</h1>
      {loading && <Loader />}

      <Table striped bordered hover responsive className="table-sm">
        <TableHead tableHeaders={["ID", "NAME", "EMAIL", "ADMIN", ""]} />
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td>
                {user.isAdmin ? (
                  <i
                    className="fas fa-check"
                    style={{ color: "lightgreen" }}
                  ></i>
                ) : (
                  <i className="fas fa-times" style={{ color: "red" }}></i>
                )}
              </td>
              <td>
                <LinkContainer to={`/admin/users/${user._id}/edit`}>
                  <Button variant="light" className="btn-sm">
                    <i className="fas fa-edit"></i>
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() =>
                    handleDelete(userDetails.token, user._id as string)
                  }
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserListPage;
