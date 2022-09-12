import './App.css';
import  './components/Header/Header'
import {v4 as uuidv4} from 'uuid';

import Header from "./components/Header/Header";
import Game from "./components/Game/Game"
function App() {

    const page_list = ['Main', 'Match History', 'MMR graph']
    const user_id = uuidv4();
  return (
    <div className="App">
      <Header page_list={page_list} current_page={'Main'}></Header>
        <h1 className={'MainTitle'}> Best 4 in a row in the world. </h1>
        <Game user_id={user_id}></Game>
    </div>
  );
}

export default App;
