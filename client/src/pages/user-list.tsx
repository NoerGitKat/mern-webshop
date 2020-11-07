import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import TableHead from "../components/TableHead";
import { getAllUsers } from "../redux/actions/user-actions";
import { IInitialState } from "../types/main-interfaces";

interface UserListProps {
  history: {
    push: (url: string) => void;
  };
}

const UserListPage: React.FC<UserListProps> = ({ history }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(
    (state: IInitialState) => state.loggedInUser
  );

  const { userDetails } = loggedInUser;

  const userList = useSelector((state: IInitialState) => state.userList);
  const { users, loading, error } = userList;

  useEffect(() => {
    if (userDetails && userDetails.isAdmin) {
      dispatch(getAllUsers(userDetails.token));
    } else {
      history.push("/");
    }
  }, [dispatch, history, userDetails]);

  const handleDelete = (id: string | undefined) => {};

  return (
    <>
      <h1>All Users</h1>
      {loading && <Loader />}

      <Table striped bordered hover responsive className="table-sm">
        <TableHead tableHeaders={["ID", "NAME", "EMAIL", "ADMIN", ""]} />
        <tbody>
          {users.map((user) => (
            <tr>
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
                <LinkContainer to={`/user/${user._id}/edit`}>
                  <Button variant="light" className="btn-sm">
                    <i className="fas fa-edit"></i>
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => handleDelete(user._id)}
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
