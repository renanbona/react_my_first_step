import './App.css';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import image from './assets/crash.jpg'
import api from './services/Api';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect( () => {
    api.get('/things').then( response => {
      setProjects(response.data.data);
    });
  },[]);

  async function handleAddProject() {
    // setProjects([...projects, Date.now()]);

    const response = await api.post("/things", {
      "thing": {
        "name": `Project ${Date.now()}`
      }
    });

    const project = response.data.data;

    setProjects([...projects, project])
  }

  async function handleDeleteProject(project) {
    await api.delete(`/things/${project.attributes.slug}`).then(
      () => {
        api.get('/things').then( response => {
          setProjects(response.data.data);
        });
      }
    );
  }

  return (
    <div className="App">
      <h1>This time I'll master React!!!</h1>

      <Header title="Goku" />
      <img src={image}/>

      <ul>
        {projects.map( project =>
          <div key={project.id} className="list-item">
            <li>{project.attributes.name}</li>
            <button onClick={ () => handleDeleteProject(project)} className="delete-button">Delete</button>
          </div>
        )}
      </ul>

      <button type="button" onClick={handleAddProject}>Add Project</button>
    </div>
  );
}

export default App;
