import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';

import { DashboardView } from './components/dashboard/DashboardView';
import { KnowledgeCenterView } from './components/knowledge/KnowledgeCenterView';
import { TechDictionaryView } from './components/dictionary/TechDictionaryView';
import { LabGuideView } from './components/lab/LabGuideView';
import { TroubleshootingView } from './components/troubleshoot/TroubleshootingView';
import { InteractiveChallengeView } from './components/challenges/InteractiveChallengeView';
import { GamificationCenterView } from './components/gamification/GamificationCenterView';
import { StudentCornerView } from './components/student/StudentCornerView';
import { ProfileView } from './components/profile/ProfileView';
import { AdminDashboardView } from './components/admin/AdminDashboardView';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

const AppContent = () => {
  const { activeTab, toast } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'knowledge':
        return <KnowledgeCenterView />;
      case 'dictionary':
        return <TechDictionaryView />;
      case 'lab':
        return <LabGuideView />;
      case 'troubleshoot':
        return <TroubleshootingView />;
      case 'challenges':
        return <InteractiveChallengeView />;
      case 'gamification':
        return <GamificationCenterView />;
      case 'student-corner':
        return <StudentCornerView />;
      case 'profile':
        return <ProfileView />;
      case 'admin':
        return <AdminDashboardView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row text-slate-800">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Quick Search Modal (Ctrl + K) */}
      <GlobalSearchModal />

      {/* Toast Feedback Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 text-white text-xs font-semibold rounded-2xl shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-5 duration-200 max-w-sm">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : toast.type === 'info' ? (
            <Info className="w-4 h-4 text-blue-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          )}
          <span className="leading-snug">{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

