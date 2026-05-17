import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Program pages
import YouthAcademy from './pages/programs/YouthAcademy';
import EliteU18 from './pages/programs/EliteU18';
import ProPathway from './pages/programs/ProPathway';

// Training pages
import Strength from './pages/training/Strength';
import TacticalMastery from './pages/training/TacticalMastery';
import VideoAnalysis from './pages/training/VideoAnalysis';

// Teams pages
import U15Select from './pages/teams/U15Select';
import U17National from './pages/teams/U17National';
import InternationalCombines from './pages/teams/InternationalCombines';

// Scouting pages
import EUTrials from './pages/scouting/EUTrials';
import AgentNetwork from './pages/scouting/AgentNetwork';
import Metrics from './pages/scouting/Metrics';

// Resources pages
import SoccerBlog from './pages/resources/SoccerBlog';
import EventCalendar from './pages/resources/EventCalendar';
import FAQ from './pages/resources/FAQ';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Programs */}
        <Route path="/programs/youth-academy" element={<YouthAcademy />} />
        <Route path="/programs/elite-u18" element={<EliteU18 />} />
        <Route path="/programs/pro-pathway" element={<ProPathway />} />

        {/* Training */}
        <Route path="/training/strength" element={<Strength />} />
        <Route path="/training/tactical" element={<TacticalMastery />} />
        <Route path="/training/video-analysis" element={<VideoAnalysis />} />

        {/* Teams */}
        <Route path="/teams/u15-select" element={<U15Select />} />
        <Route path="/teams/u17-national" element={<U17National />} />
        <Route path="/teams/international-combines" element={<InternationalCombines />} />

        {/* Scouting */}
        <Route path="/scouting/eutrials" element={<EUTrials />} />
        <Route path="/scouting/agent-network" element={<AgentNetwork />} />
        <Route path="/scouting/metrics" element={<Metrics />} />

        {/* Resources */}
        <Route path="/resources/blog" element={<SoccerBlog />} />
        <Route path="/resources/calendar" element={<EventCalendar />} />
        <Route path="/resources/faq" element={<FAQ />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;