import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const api = "http://localhost:5001/api/doctorpatients";
const doctorApi = "http://localhost:5001/api/doctors";
const patientApi = "http://localhost:5001/api/patients";

function DoctorPatientPage() {
  const [assignments, setAssignments] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ doctor: "", patient: "" });
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const fetchAssignments = async () => {
    const res = await axios.get(api);
    setAssignments(res.data);
  };
  const fetchDoctors = async () => {
    const res = await axios.get(doctorApi);
    setDoctors(res.data);
  };
  const fetchPatients = async () => {
    const res = await axios.get(patientApi);
    setPatients(res.data);
  };

  useEffect(() => { fetchAssignments(); fetchDoctors(); fetchPatients(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${api}/${editId}`, form);
      toast.success("Assignment updated!");
    } else {
      await axios.post(api, form);
      toast.success("Doctor assigned to patient!");
    }
    setShow(false);
    setEditId(null);
    setForm({ doctor: "", patient: "" });
    fetchAssignments();
  };

  const handleEdit = (a) => {
    setEditId(a._id);
    setForm({
      doctor: a.doctor?._id || "",
      patient: a.patient?._id || ""
    });
    setShow(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${api}/${id}`);
    toast.success("Assignment deleted!");
    fetchAssignments();
  };

  return (
    <>
      <Button onClick={() => { setShow(true); setEditId(null); setForm({ doctor: "", patient: "" }); }} className="mb-3">Assign Doctor</Button>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a._id}>
              <td>{a.doctor?.name}</td>
              <td>{a.patient?.name}</td>
              <td>
                <Button size="sm" variant="warning" className="me-2" onClick={() => handleEdit(a)}>Edit</Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(a._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={() => { setShow(false); setEditId(null); }}>
        <Modal.Header closeButton><Modal.Title>{editId ? "Edit Assignment" : "Assign Doctor"}</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Doctor</Form.Label>
              <Form.Select name="doctor" value={form.doctor} onChange={handleChange} required>
                <option value="">Select</option>
                {doctors.map((d) => <option value={d._id} key={d._id}>{d.name}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Patient</Form.Label>
              <Form.Select name="patient" value={form.patient} onChange={handleChange} required>
                <option value="">Select</option>
                {patients.map((p) => <option value={p._id} key={p._id}>{p.name}</option>)}
              </Form.Select>
            </Form.Group>
            <Button type="submit" className="mt-2">{editId ? "Update" : "Save"}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DoctorPatientPage;
