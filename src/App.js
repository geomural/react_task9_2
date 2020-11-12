import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import CardsList from './components/CardsList';
import NewCard from './components/NewCard';
import CardView from './components/CardView';
import Page404 from './components/Page404';
import PostsProvider from './context/PostsProvider';

function App() {

  return (
    <PostsProvider>
      <Router>
        <Switch>
          <Route exact path="/" exact component={CardsList} />
          <Route exact path="/posts/new" exact component={NewCard} />
          <Route exact path="/posts/:postId" component={CardView} />
          <Route path='*' component={Page404}/>
        </Switch>
      </Router>
    </PostsProvider>
  );
}

export default App;
