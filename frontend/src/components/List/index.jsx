import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../App.css';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Footer from '../Footer/index.jsx';

export default function List() {
    const [list, setList] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        team: '',
        number: '',
        image: ''
  });
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);


    // Fetch api data
    const fetchList = () => {
        axios.get('http://localhost:8080/soccer/get')
            .then(response => {
                console.log(response.data);
                setList(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
    useEffect(() => {
        fetchList();
    }, []);


    // Add soccer player
    const handleAdd = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      setShowAddForm(true);
    };
    const handleCancel = () => {
      setShowAddForm(false);
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.name || !formData.team || !formData.number || !formData.image) {
        window.alert('Please fill out all fields.');
        console.log('Please fill out all fields.');
        return;
      }
      const soccer = { name: formData.name, team: formData.team, number: formData.number, image: formData.image };
      console.log('Form data submitted:', soccer);

      axios.post('http://localhost:8080/soccer/add', soccer)
        .then((response) => {
            console.log(response);
            window.alert('Soccer player added successfully!');
            window.location.href = '/list';
        })
        .catch((error) => {
            console.log(error);
            window.alert('Error occurred. Please try again.');
        })
        .finally (() => {
            setFormData({
                name: '',
                team: '',
                number: '',
                image: '',
            })
            setShowAddForm(false);
        });
    };


    // Update soccer player
    const handleEdit = (id) => {
        const selectedItem = list.find(item => item.id === id);
        setFormData({
          id: selectedItem.id,
          name: selectedItem.name,
          team: selectedItem.team,
          number: selectedItem.number,
          image: selectedItem.image,
        });
        setShowEditForm(true);
    }
    const handleEditCancel = () => {
        setShowEditForm(false);
    }
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.team || !formData.number || !formData.image) {
            window.alert('Please fill out all fields.');
            console.log('Please fill out all fields.');
            return;
            }
        const soccer = { name: formData.name, team: formData.team, number: formData.number, image: formData.image };
        console.log('Form data submitted:', soccer);
        axios.put(`http://localhost:8080/soccer/update/${formData.id}`, soccer)
            .then((response) => {
                console.log(response);
                window.alert('Soccer updated successfully!');
                window.location.href = '/list';
            })
            .catch((error) => {
                console.log(error);
                window.alert('Error occurred. Please try again.');
            })
            .finally(() => {
                setFormData({
                    id: '',
                    name: '',
                    team: '',
                    number: '',
                    image: '',
                })
                setShowEditForm(false);
            });
      };
    

    // Delete soccer player
    const handleDelete = (id) => {
        const shouldDelete = window.confirm('Are you sure?');
      
        if (shouldDelete) {
          axios.delete(`http://localhost:8080/soccer/delete/${id}`)
            .then((response) => {
              console.log(response);
              window.alert('Soccer deleted successfully!');
              window.location.href = '/list';
            })
            .catch((error) => {
              console.log(error);
              window.alert('Error occurred. Please try again.');
            });
        }
    }    

  return (
    <>
    <br />
    <h1 className="text-2xl font-bold mb-4">Soccer List</h1>
    <Link to="/">
            <button className="btn btn-primary bg-soccer-primary hover:bg-soccer-hover text-white font-bold py-2 px-4 rounded-full ml-5">Back</button>
        </Link>
    <Paper elevation={3} className="p-5 mx-auto" style={{ maxWidth:1000 }}>
      <div className="flex items-center justify-center">
          <button className="btn btn-primary bg-soccer-primary hover:bg-soccer-hover text-white font-bold py-2 px-4 rounded-full ml-5"
            onClick={handleAdd}
          >
            Add soccer
          </button>
      </div>
      <br />
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Club</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => (
            <tr key={item.id} className="border">
              <td className="border p-2 text-center">{item.id}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.team}</td>
              <td className="border p-2 text-center">{item.number}</td>
              <td className="border p-2 text-center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(item.id)}
                  style={{
                    backgroundColor: '#1e88e5',
                    color: '#fff'
                  }}
                >
                  Edit
                </Button>
                <span> </span>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(item.id)}
                  style={{
                    backgroundColor: '#ff0000',
                    color: '#fff'
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Paper>
    <Footer />

    {showEditForm && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="fixed inset-0 bg-blur-effect z-10"></div>
        <form className="max-w-md mx-auto p-10 bg-gray-200 rounded-md z-20">
          <h2 className="text-xl font-semibold mb-8">Edit Soccer Player</h2>
            <div className="mb-2">
                <label className="block text-sm font-bold mb-2" htmlFor="name">
                Name
                </label>
                <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                }
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm font-bold mb-2" htmlFor="team">
                Club
                </label>
                <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="team"
                type="text"
                placeholder="Club"
                value={formData.team}
                onChange={(e) =>
                    setFormData({ ...formData, team: e.target.value })
                }
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm font-bold mb-2" htmlFor="number">
                Age
                </label>
                <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="number"
                type="text"
                placeholder="Number"
                value={formData.number}
                onChange={(e) =>
                    setFormData({ ...formData, number: e.target.value })
                }
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm font-bold mb-2" htmlFor="image">
                Image
                </label>
                <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="image"
                type="text"
                placeholder="Image"
                value={formData.image}
                onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                }
                />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
                <button
                    type="button"
                    onClick={handleEditCancel}
                    className="btn btn-secondary bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                >
                Cancel
                </button>
                <button
                    type="submit"
                    onClick={handleEditSubmit}
                    className="btn btn-primary bg-soccer-primary hover:bg-soccer-hover text-white font-bold py-2 px-4 rounded-full"
                >
                Submit
                </button>
            </div>
        </form>
      </div>
      )}

    {showAddForm && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="fixed inset-0 bg-blur-effect z-10"></div>
        <form className="max-w-md mx-auto p-10 bg-gray-200 rounded-md z-20">
          <h2 className="text-xl font-semibold mb-8">Add Soccer Player</h2>
            <div className="mb-2">
                <label className="block text-sm font-bold mb-2" htmlFor="name">
                Name
                </label>
                <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                }
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm font-bold mb-2" htmlFor="team">
                Club
                </label>
                <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="team"
                type="text"
                placeholder="Club"
                value={formData.team}
                onChange={(e) =>
                    setFormData({ ...formData, team: e.target.value })
                }
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm font-bold mb-2" htmlFor="number">
                Age
                </label>
                <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="number"
                type="text"
                placeholder="Number"
                value={formData.number}
                onChange={(e) =>
                    setFormData({ ...formData, number: e.target.value })
                }
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm font-bold mb-2" htmlFor="image">
                Image
                </label>
                <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="image"
                type="text"
                placeholder="Image"
                value={formData.image}
                onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                }
                />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-secondary bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                >
                Cancel
                </button>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-primary bg-soccer-primary hover:bg-soccer-hover text-white font-bold py-2 px-4 rounded-full"
                >
                Submit
                </button>
            </div>
        </form>
      </div>
      )}
    </>
  )
}
