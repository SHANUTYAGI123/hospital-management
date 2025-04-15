import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const api = "http://localhost:5001/api/tests";

function TestPage() {
  const [tests, setTests] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ test_id: "", test_name: "", date: "", time: "", result: "" });

  const fetchTests = async () => {
    const res = await axios.get(api);
    setTests(res.data);
  };

  useEffect(() => { fetchTests(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${api}/${editId}`, form);
      toast.success("Test updated!");
    } else {
      await axios.post(api, form);
      toast.success("Test added!");
    }
    setShow(false);
    setEditId(null);
    setForm({ test_id: "", test_name: "", date: "", time: "", result: "" });
    fetchTests();
  };

  const handleEdit = (t) => {
    setEditId(t._id);
    setForm({
      test_id: t.test_id,
      test_name: t.test_name,
      date: t.date ? t.date.slice(0,10) : "",
      time: t.time,
      result: t.result
    });
    setShow(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${api}/${id}`);
    toast.success("Test deleted!");
    fetchTests();
  };

  return (
    <>
      <Button onClick={() => { setShow(true); setEditId(null); setForm({ test_id: "", test_name: "", date: "", time: "", result: "" }); }} className="mb-3">Add Test</Button>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Test ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Result</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((t) => (
            <tr key={t._id}>
              <td>{t.test_id}</td>
              <td>{t.test_name}</td>
              <td>{t.date ? t.date.slice(0,10) : ""}</td>
              <td>{t.time}</td>
              <td>{t.result}</td>
              <td>
                <Button size="sm" variant="warning" className="me-2" onClick={() => handleEdit(t)}>Edit</Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(t._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={() => { setShow(false); setEditId(null); }}>
        <Modal.Header closeButton><Modal.Title>{editId ? "Edit Test" : "Add Test"}</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2"><Form.Label>Test ID</Form.Label><Form.Control name="test_id" value={form.test_id} onChange={handleChange} required /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Name</Form.Label><Form.Control name="test_name" value={form.test_name} onChange={handleChange} required /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Date</Form.Label><Form.Control type="date" name="date" value={form.date} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Time</Form.Label><Form.Control name="time" value={form.time} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Result</Form.Label><Form.Control name="result" value={form.result} onChange={handleChange} /></Form.Group>
            <Button type="submit" className="mt-2">{editId ? "Update" : "Save"}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TestPage;
