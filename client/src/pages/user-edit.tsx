import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { getProfile } from "../redux/actions/user-actions";
import { IInitialState } from "../types/main-interfaces";

interface UserEditProps {
  match: { params: { id: string } };
  history: { push: (url: string) => void };
}

const UserEditPage: React.FC<UserEditProps> = ({ history, match }) => {
  const { id: userId } = match.params;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();

  const loggedInUser = useSelector(
    (state: IInitialState) => state.loggedInUser
  );
  const { userDetails } = loggedInUser;

  const profile = useSelector((state: IInitialState) => state.profile);
  const { loading, error, userProfile } = profile;

  let errorMessages;
  if (error) {
    errorMessages =
      error.length >= 1
        ? error.map((error: any, index: number) => (
            <AlertMessage key={index} variant="danger">
              {error.msg}
            </AlertMessage>
          ))
        : null;
  }

  useEffect(() => {
    if (!userProfile.username || userProfile._id !== userId) {
      dispatch(getProfile(userDetails.token, userId));
    } else {
      setUsername(userProfile.username);
      setEmail(userProfile.email);
      setIsAdmin(userProfile.isAdmin);
    }
  }, [userProfile, dispatch, userId, userDetails.token]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <>
      <Link to={"/admin/users"} className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit user: {userProfile.username}</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          errorMessages
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="adminRights">
              <Form.Label>Admin Rights</Form.Label>
              <Form.Check
                type="checkbox"
                label="isAdmin"
                checked={isAdmin}
                onChange={(e: {
                  target: { checked: React.SetStateAction<boolean> };
                }) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditPage;
