import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const api = "http://localhost:5001/api/testlogs";
const patientApi = "http://localhost:5001/api/patients";
const testApi = "http://localhost:5001/api/tests";

function TestLogPage() {
  const [testLogs, setTestLogs] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ patient: "", test: "", date: "", result: "" });
  const [patients, setPatients] = useState([]);
  const [tests, setTests] = useState([]);

  const fetchTestLogs = async () => {
    const res = await axios.get(api);
    setTestLogs(res.data);
  };
  const fetchPatients = async () => {
    const res = await axios.get(patientApi);
    setPatients(res.data);
  };
  const fetchTests = async () => {
    const res = await axios.get(testApi);
    setTests(res.data);
  };

  useEffect(() => { fetchTestLogs(); fetchPatients(); fetchTests(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${api}/${editId}`, form);
      toast.success("Test log updated!");
    } else {
      await axios.post(api, form);
      toast.success("Test log added!");
    }
    setShow(false);
    setEditId(null);
    setForm({ patient: "", test: "", date: "", result: "" });
    fetchTestLogs();
  };

  const handleEdit = (log) => {
    setEditId(log._id);
    setForm({
      patient: log.patient?._id || "",
      test: log.test?._id || "",
      date: log.date ? log.date.slice(0,10) : "",
      result: log.result
    });
    setShow(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${api}/${id}`);
    toast.success("Test log deleted!");
    fetchTestLogs();
  };

  return (
    <>
      <Button onClick={() => { setShow(true); setEditId(null); setForm({ patient: "", test: "", date: "", result: "" }); }} className="mb-3">Add Test Log</Button>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Test</th>
            <th>Date</th>
            <th>Result</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testLogs.map((log) => (
            <tr key={log._id}>
              <td>{log.patient?.name}</td>
              <td>{log.test?.test_name}</td>
              <td>{log.date ? log.date.slice(0,10) : ""}</td>
              <td>{log.result}</td>
              <td>
                <Button size="sm" variant="warning" className="me-2" onClick={() => handleEdit(log)}>Edit</Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(log._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={() => { setShow(false); setEditId(null); }}>
        <Modal.Header closeButton><Modal.Title>{editId ? "Edit Test Log" : "Add Test Log"}</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Patient</Form.Label>
              <Form.Select name="patient" value={form.patient} onChange={handleChange} required>
                <option value="">Select</option>
                {patients.map((p) => <option value={p._id} key={p._id}>{p.name}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Test</Form.Label>
              <Form.Select name="test" value={form.test} onChange={handleChange} required>
                <option value="">Select</option>
                {tests.map((t) => <option value={t._id} key={t._id}>{t.test_name}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2"><Form.Label>Date</Form.Label><Form.Control type="date" name="date" value={form.date} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Result</Form.Label><Form.Control name="result" value={form.result} onChange={handleChange} /></Form.Group>
            <Button type="submit" className="mt-2">{editId ? "Update" : "Save"}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TestLogPage;
