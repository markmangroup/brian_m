import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { UserProvider } from './components/UserContext';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import { ColorModeProvider } from './theme/ColorModeContext';

import Navigation from './components/Navigation';
import Breadcrumbs from './components/Breadcrumbs';
import SnackTrailPage from './components/SnackTrailPage';

import PixelArtMaker from './components/PixelArtMaker';
import RobotLab from './components/RobotLab';
import LegoBuildMode from './components/LegoBuildMode';
import LegoInventory from './components/LegoInventory';
import LittleAlchemy from './components/LittleAlchemy';
import RCPlaneDesigner from './components/RCPlaneDesigner';
import Updates from './components/Updates';
import Home from './components/Home';
import StartPage from './pages/StartPage';
// Matrix V1 Pages
import Entry from './pages/matrix-v1/Entry';
import MatrixNamePrompt from './pages/matrix-v1/MatrixNamePrompt';
import Terminal from './pages/matrix-v1/Terminal';
import Checkpoint from './pages/matrix-v1/Checkpoint';
import Message from './pages/matrix-v1/Message';
import Puzzle from './pages/matrix-v1/Puzzle';
import Trace from './pages/matrix-v1/Trace';
import Observer from './pages/matrix-v1/Observer';
import Stage1 from './pages/matrix-v1/Stage1';
import Stage2 from './pages/matrix-v1/Stage2';
import Stage3 from './pages/matrix-v1/Stage3';
import PathA from './pages/matrix-v1/PathA';
import PathB from './pages/matrix-v1/PathB';
import DeeperProfile from './pages/matrix-v1/DeeperProfile';
import Map from './pages/matrix-v1/Map';
import MapD3 from './pages/matrix-v1/MapD3';
import QualityDashboard from './pages/matrix-v1/QualityDashboard';
import NodeEditor from './pages/matrix-v1/NodeEditor';
import Interference from './pages/matrix-v1/Interference';
import PathBGlitch from './pages/matrix-v1/PathBGlitch';
import Factions from './pages/matrix-v1/Factions';
import Align from './pages/matrix-v1/Align';
import Stabilize from './pages/matrix-v1/Stabilize';
import GuardianCall from './pages/matrix-v1/GuardianCall';

// Faction Choice Components
import FactionChoice from './pages/matrix-v1/FactionChoice';
import ZionFleet from './pages/matrix-v1/ZionFleet';
import RebelHackers from './pages/matrix-v1/RebelHackers';
import OracleSeeker from './pages/matrix-v1/OracleSeeker';

// Ghost Layer and Echo Fork Components
import ShardInit from './pages/matrix-v1/ShardInit';
import ShardInsert from './pages/matrix-v1/ShardInsert';
import EchoLoop from './pages/matrix-v1/EchoLoop';
import EchoVerify from './pages/matrix-v1/EchoVerify';
import GhostLayer2 from './pages/matrix-v1/GhostLayer2';

// New routes
import FactionPortal from './pages/matrix-v1/FactionPortal';
import GlitchPortal from './pages/matrix-v1/GlitchPortal';
import OracleSeekers from './pages/matrix-v1/OracleSeekers';

// Night City routes
import NightCityEntry from './pages/matrix-v1/NightCityEntry';
import NightCityBouncer from './pages/matrix-v1/NightCityBouncer';
import NightCityNetdiver from './pages/matrix-v1/NightCityNetdiver';
import NightCityFile from './pages/matrix-v1/NightCityFile';
import NightCityAccessConfirmed from './pages/matrix-v1/NightCityAccessConfirmed';

// Witcher routes
import WitcherEntry from './pages/witcher/WitcherEntry';
import MutationChoice from './pages/witcher/MutationChoice';
import SignTraining from './pages/witcher/SignTraining';
import TrialOfReflection from './pages/witcher/TrialOfReflection';

function AppLayout() {
  const { currentWorld } = useTheme();

  return (
    <div
      className={`min-h-screen bg-theme-primary text-theme-primary pt-20 pb-4 relative font-theme-ui world-background-${currentWorld}`}
    >
      <Navigation />
      <Breadcrumbs />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/snack-trail" element={<SnackTrailPage />} />
        <Route path="/pixel-art" element={<PixelArtMaker />} />
        <Route path="/robot-lab" element={<RobotLab />} />
        <Route path="/lego-build" element={<LegoBuildMode />} />
        <Route path="/lego-inventory" element={<LegoInventory />} />
        <Route path="/rc-plane" element={<RCPlaneDesigner />} />
        <Route path="/little-alchemy" element={<LittleAlchemy />} />
        <Route path="/updates" element={<Updates />} />

        {/* Matrix V1 Routes */}
        <Route path="/matrix-v1" element={<Entry />} />
        <Route path="/matrix-v1/name-prompt" element={<MatrixNamePrompt />} />
        <Route path="/matrix-v1/terminal" element={<Terminal />} />
        <Route path="/matrix-v1/checkpoint" element={<Checkpoint />} />
        <Route path="/matrix-v1/message" element={<Message />} />
        <Route path="/matrix-v1/puzzle" element={<Puzzle />} />
        <Route path="/matrix-v1/trace" element={<Trace />} />
        <Route path="/matrix-v1/observer" element={<Observer />} />
        <Route path="/matrix-v1/stage-1" element={<Stage1 />} />
        <Route path="/matrix-v1/stage-2" element={<Stage2 />} />
        <Route path="/matrix-v1/stage-3" element={<Stage3 />} />
        <Route path="/matrix-v1/compliance-route" element={<PathA />} />
        <Route path="/matrix-v1/anomaly-route" element={<PathB />} />
        <Route path="/matrix-v1/map" element={<Map />} />
        <Route path="/matrix-v1/map-d3" element={<MapD3 />} />
        <Route path="/matrix-v1/quality-dashboard" element={<QualityDashboard />} />
        <Route path="/matrix-v1/node-editor" element={<NodeEditor />} />
        <Route path="/matrix-v1/deeper-profile" element={<DeeperProfile />} />
        <Route path="/matrix-v1/interference" element={<Interference />} />
        <Route path="/matrix-v1/stabilize" element={<Stabilize />} />
        <Route path="/matrix-v1/guardian-call" element={<GuardianCall />} />
        <Route path="/matrix-v1/path-b-glitch" element={<PathBGlitch />} />
        <Route path="/matrix-v1/factions" element={<Factions />} />
        <Route path="/matrix-v1/align-:slug" element={<Align />} />

        {/* Faction Choice Routes */}
        <Route path="/matrix-v1/faction-choice" element={<FactionChoice />} />
        <Route path="/matrix-v1/zion-fleet" element={<ZionFleet />} />
        <Route path="/matrix-v1/rebel-hackers" element={<RebelHackers />} />
        <Route path="/matrix-v1/oracle-seekers" element={<OracleSeeker />} />

        {/* Ghost Layer and Echo Fork Routes */}
        <Route path="/matrix-v1/shard-init" element={<ShardInit />} />
        <Route path="/matrix-v1/shard-insert" element={<ShardInsert />} />
        <Route path="/matrix-v1/echo-loop" element={<EchoLoop />} />
        <Route path="/matrix-v1/echo-verify" element={<EchoVerify />} />
        <Route path="/matrix-v1/ghost-layer-2" element={<GhostLayer2 />} />

        {/* New routes */}
        <Route path="/matrix-v1/portal/factions" element={<FactionPortal />} />
        <Route path="/matrix-v1/glitch-portal" element={<GlitchPortal />} />
        <Route path="/matrix-v1/oracle-seekers" element={<OracleSeekers />} />

        {/* Night City routes */}
        <Route path="/matrix-v1/night-city/entry" element={<NightCityEntry />} />
        <Route path="/matrix-v1/night-city/bouncer" element={<NightCityBouncer />} />
        <Route path="/matrix-v1/night-city/netdiver" element={<NightCityNetdiver />} />
        <Route path="/matrix-v1/night-city/file" element={<NightCityFile />} />
        <Route path="/matrix-v1/night-city/access-confirmed" element={<NightCityAccessConfirmed />} />

        {/* Witcher routes */}
        <Route path="/witcher/entry" element={<WitcherEntry />} />
        <Route path="/witcher/mutation-choice" element={<MutationChoice />} />
        <Route path="/witcher/sign-training" element={<SignTraining />} />
        <Route path="/witcher/trial-of-reflection" element={<TrialOfReflection />} />

        {/* Legacy Matrix Routes - Redirect to V1 */}
        <Route path="/the-matrix/*" element={<Navigate to="/matrix-v1" replace />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <ColorModeProvider>
        <ThemeProvider>
          <Router>
            <AppLayout />
          </Router>
        </ThemeProvider>
      </ColorModeProvider>
    </UserProvider>
  );
}
