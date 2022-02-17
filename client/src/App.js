import { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import AuthState from './context/auth/AuthState';
import ContactState from './context/contact/ContactState';
import './App.css';

const App = () => {
	return (
		<AuthState>
			<ContactState>
				<Fragment>
					<Navbar />
					<div className='container'>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/about' element={<About />} />
						</Routes>
					</div>
				</Fragment>
			</ContactState>
		</AuthState>
	);
};

export default App;
