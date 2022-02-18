import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/pages/Home';
import About from './components/pages/About';
import AuthState from './context/auth/AuthState';
import ContactState from './context/contact/ContactState';
import AlertState from './context/alert/AlertState';
import './App.css';

const App = () => {
	return (
		<AuthState>
			<ContactState>
				<AlertState>
					<Fragment>
						<Navbar />
						<Alerts />
						<div className='container'>
							<Routes>
								<Route path='/' element={<Home />} />
								<Route path='/about' element={<About />} />
								<Route path='/login' element={<Login />} />
								<Route path='/register' element={<Register />} />
							</Routes>
						</div>
					</Fragment>
				</AlertState>
			</ContactState>
		</AuthState>
	);
};

export default App;
