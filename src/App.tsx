import './App.css';
import LinkForm from "./components/LinkForm";
import Links from "./components/Links";
import { Link } from './link.interface';

function App() {

  const addLink = (values: Link) => {
    console.log('Adding ->', values);

  }

  return (
    <div className="container p-4">
      <LinkForm addLink={addLink} />
      <Links />
    </div>
  );
}

export default App;
