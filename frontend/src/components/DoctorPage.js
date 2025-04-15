import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const api = "http://localhost:5001/api/doctors";

function DoctorPage() {
  const [doctors, setDoctors] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", dssn: "", specialization: "" });

  const fetchDoctors = async () => {
    const res = await axios.get(api);
    setDoctors(res.data);
  };

  useEffect(() => { fetchDoctors(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${api}/${editId}`, form);
      toast.success("Doctor updated!");
    } else {
      await axios.post(api, form);
      toast.success("Doctor added!");
    }
    setShow(false);
    setEditId(null);
    setForm({ name: "", dssn: "", specialization: "" });
    fetchDoctors();
  };

  const handleEdit = (d) => {
    setEditId(d._id);
    setForm({
      name: d.name,
      dssn: d.dssn,
      specialization: d.specialization
    });
    setShow(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${api}/${id}`);
    toast.success("Doctor deleted!");
    fetchDoctors();
  };

  return (
    <>
      <Button onClick={() => { setShow(true); setEditId(null); setForm({ name: "", dssn: "", specialization: "" }); }} className="mb-3">Add Doctor</Button>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>DSSN</th>
            <th>Specialization</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((d) => (
            <tr key={d._id}>
              <td>{d.name}</td>
              <td>{d.dssn}</td>
              <td>{d.specialization}</td>
              <td>
                <Button size="sm" variant="warning" className="me-2" onClick={() => handleEdit(d)}>Edit</Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(d._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={() => { setShow(false); setEditId(null); }}>
        <Modal.Header closeButton><Modal.Title>{editId ? "Edit Doctor" : "Add Doctor"}</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2"><Form.Label>Name</Form.Label><Form.Control name="name" value={form.name} onChange={handleChange} required /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>DSSN</Form.Label><Form.Control name="dssn" value={form.dssn} onChange={handleChange} required /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Specialization</Form.Label><Form.Control name="specialization" value={form.specialization} onChange={handleChange} /></Form.Group>
            <Button type="submit" className="mt-2">{editId ? "Update" : "Save"}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DoctorPage;
