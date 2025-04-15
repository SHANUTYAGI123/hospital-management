import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PatientPage from "./components/PatientPage";
import DoctorPage from "./components/DoctorPage";
import TestPage from "./components/TestPage";
import TestLogPage from "./components/TestLogPage";
import DoctorPatientPage from "./components/DoctorPatientPage";

function App() {
  const [page, setPage] = React.useState("patients");
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Hospital Management</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => setPage("patients")}>Patients</Nav.Link>
            <Nav.Link onClick={() => setPage("doctors")}>Doctors</Nav.Link>
            <Nav.Link onClick={() => setPage("tests")}>Tests</Nav.Link>
            <Nav.Link onClick={() => setPage("testlogs")}>Test Logs</Nav.Link>
            <Nav.Link onClick={() => setPage("doctorpatients")}>Doctor-Patient</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="mt-4">
        {page === "patients" && <PatientPage />}
        {page === "doctors" && <DoctorPage />}
        {page === "tests" && <TestPage />}
        {page === "testlogs" && <TestLogPage />}
        {page === "doctorpatients" && <DoctorPatientPage />}
      </Container>
      <ToastContainer position="top-center" autoClose={1500} />
    </>
  );
}

export default App;
