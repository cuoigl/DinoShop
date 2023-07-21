import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";

import { useState, useEffect } from "react";

const UsersPageComponent = () => {
  const [counter, setCounter] = useState(0);

  const deleteHandler = () => {
    setCounter(counter + 1);
    // if (window.confirm("Are you sure?")) alert("User deleted!");
  };

  useEffect(() => {
    console.log("useEffect called");
    setCounter(counter + 1);
    return () => console.log("cleanup the effect");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>User List {counter}</h1>
        {console.log("HTML rendered")}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Is Admin</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {["bi bi-check-lg text-success", "bi bi-x-lg text-danger"].map(
              (item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>Mark</td>
                  <td>Twain</td>
                  <td>email@email.com</td>
                  <td>
                    <i className={item}></i>
                  </td>
                  <td>
                    <LinkContainer to="/admin/edit-user">
                      <Button className="btn-sm">
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                    </LinkContainer>
                    {" / "}
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={deleteHandler}
                    >
                      <i className="bi bi-x-circle"></i>
                    </Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default UsersPageComponent;
