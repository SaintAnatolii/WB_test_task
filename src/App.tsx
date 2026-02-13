import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'

import MainPage from './pages/Main'
import Profile from './pages/Profile'

function App() {
    return (
        <Provider store={store}>
            <div className="container">
                <Router>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </Router>
            </div>
        </Provider>
    )
}

export default App
