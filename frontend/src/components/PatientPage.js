import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const api = "http://localhost:5001/api/patients";

function PatientPage() {
  const [patients, setPatients] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", ssn: "", insurance: "", date_admitted: "", date_checked_out: "" });

  const fetchPatients = async () => {
    const res = await axios.get(api);
    setPatients(res.data);
  };

  useEffect(() => { fetchPatients(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${api}/${editId}`, form);
      toast.success("Patient updated!");
    } else {
      await axios.post(api, form);
      toast.success("Patient added!");
    }
    setShow(false);
    setEditId(null);
    setForm({ name: "", ssn: "", insurance: "", date_admitted: "", date_checked_out: "" });
    fetchPatients();
  };

  const handleEdit = (p) => {
    setEditId(p._id);
    setForm({
      name: p.name,
      ssn: p.ssn,
      insurance: p.insurance,
      date_admitted: p.date_admitted ? p.date_admitted.slice(0,10) : "",
      date_checked_out: p.date_checked_out ? p.date_checked_out.slice(0,10) : ""
    });
    setShow(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${api}/${id}`);
    toast.success("Patient deleted!");
    fetchPatients();
  };

  return (
    <>
      <Button onClick={() => { setShow(true); setEditId(null); setForm({ name: "", ssn: "", insurance: "", date_admitted: "", date_checked_out: "" }); }} className="mb-3">Add Patient</Button>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>SSN</th>
            <th>Insurance</th>
            <th>Date Admitted</th>
            <th>Date Checked Out</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.ssn}</td>
              <td>{p.insurance}</td>
              <td>{p.date_admitted ? p.date_admitted.slice(0,10) : ""}</td>
              <td>{p.date_checked_out ? p.date_checked_out.slice(0,10) : ""}</td>
              <td>
                <Button size="sm" variant="warning" className="me-2" onClick={() => handleEdit(p)}>Edit</Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(p._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={() => { setShow(false); setEditId(null); }}>
        <Modal.Header closeButton><Modal.Title>{editId ? "Edit Patient" : "Add Patient"}</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2"><Form.Label>Name</Form.Label><Form.Control name="name" value={form.name} onChange={handleChange} required /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>SSN</Form.Label><Form.Control name="ssn" value={form.ssn} onChange={handleChange} required /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Insurance</Form.Label><Form.Control name="insurance" value={form.insurance} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Date Admitted</Form.Label><Form.Control type="date" name="date_admitted" value={form.date_admitted} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Date Checked Out</Form.Label><Form.Control type="date" name="date_checked_out" value={form.date_checked_out} onChange={handleChange} /></Form.Group>
            <Button type="submit" className="mt-2">{editId ? "Update" : "Save"}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PatientPage;
