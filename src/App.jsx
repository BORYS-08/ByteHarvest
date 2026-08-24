import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import {
  AppProvider,
} from './context/AppContext';

import {
  ScanProvider,
} from './context/ScanContext';

import {
  Navbar,
} from './components/common/Navbar';

import {
  HomePage,
} from './pages/HomePage';

import {
  LoginPage,
} from './pages/LoginPage';

import {
  RegisterPage,
} from './pages/RegisterPage';

import {
  ForgotPasswordPage,
} from './pages/ForgotPasswordPage';

import {
  ProfilePage,
} from './pages/ProfilePage';

import {
  FarmerPage,
} from './pages/FarmerPage';

import {
  FarmManagementPage,
} from './pages/FarmManagementPage';

import {
  CropManagementPage,
} from './pages/CropManagementPage';

import {
  ExtensionPage,
} from './pages/ExtensionPage';

import {
  ExpertPage,
} from './pages/ExpertPage';

import {
  OfficialPage,
} from './pages/OfficialPage';

import {
  ScannerPage,
} from './pages/ScannerPage';

import {
  HeatmapPage,
} from './pages/HeatmapPage';

import {
  CalculatorPage,
} from './pages/CalculatorPage';

import {
  HistoryPage,
} from './pages/HistoryPage';

import {
  ConsultationPage,
} from './pages/ConsultationPage';

import {
  KnowledgeCenterPage,
} from './pages/KnowledgeCenterPage';

import {
  AdminDashboardPage,
} from './pages/AdminDashboardPage';

import {
  LuSprout,
} from 'react-icons/lu';


/* ============================================================
   PROTECTED ROUTE
   ============================================================ */

const ProtectedRoute = ({
  children,
  allowedRoles = [],
  requireAuth = false,
}) => {

  const {
    isAuthenticated,
    activeRole,
    roleConfig,
  } = useApp();


  /* ----------------------------------------------------------
     Authentication check
     ---------------------------------------------------------- */

  if (
    requireAuth &&
    !isAuthenticated
  ) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }


  /* ----------------------------------------------------------
     Role check
     ---------------------------------------------------------- */

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(
      activeRole
    )
  ) {
    return (
      <Navigate
        to={
          roleConfig?.defaultRoute ||
          '/farmer'
        }
        replace
      />
    );
  }


  return children;
};


/* ============================================================
   APP
   ============================================================ */

export function App() {

  return (
    <AppProvider>

      <ScanProvider>

        <Router
          basename="/ByteHarvest"
        >

          <div
            className="min-h-screen flex flex-col"
            style={{
              background:
                'var(--bg-canvas)',

              color:
                'var(--text-primary)',
            }}
          >

            <Navbar />


            <main className="flex-1">

              <Routes>


                {/* =================================================
                    PUBLIC / AUTH
                ================================================== */}

                <Route
                  path="/"
                  element={
                    <HomePage />
                  }
                />

                <Route
                  path="/login"
                  element={
                    <LoginPage />
                  }
                />

                <Route
                  path="/register"
                  element={
                    <RegisterPage />
                  }
                />

                <Route
                  path="/forgot-password"
                  element={
                    <ForgotPasswordPage />
                  }
                />


                {/* =================================================
                    USER
                ================================================== */}

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute
                      requireAuth
                    >
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/history"
                  element={
                    <ProtectedRoute
                      requireAuth
                    >
                      <HistoryPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/consultation"
                  element={
                    <ProtectedRoute
                      requireAuth
                      allowedRoles={[
                        'farmer',
                        'extension',
                        'expert',
                      ]}
                    >
                      <ConsultationPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/knowledge"
                  element={
                    <ProtectedRoute
                      requireAuth
                      allowedRoles={[
                        'farmer',
                        'extension',
                        'expert',
                        'official',
                        'admin',
                      ]}
                    >
                      <KnowledgeCenterPage />
                    </ProtectedRoute>
                  }
                />


                {/* =================================================
                    FARMER
                ================================================== */}

                <Route
                  path="/farmer"
                  element={
                    <ProtectedRoute
                      requireAuth
                      allowedRoles={[
                        'farmer',
                      ]}
                    >
                      <FarmerPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/farms"
                  element={
                    <ProtectedRoute
                      requireAuth
                      allowedRoles={[
                        'farmer',
                      ]}
                    >
                      <FarmManagementPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/crops"
                  element={
                    <ProtectedRoute
                      requireAuth
                      allowedRoles={[
                        'farmer',
                      ]}
                    >
                      <CropManagementPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/scanner"
                  element={
                    <ProtectedRoute
                      requireAuth
                      allowedRoles={[
                        'farmer',
                      ]}
                    >
                      <ScannerPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/calculator"
                  element={
                    <ProtectedRoute
                      requireAuth
                      allowedRoles={[
                        'farmer',
                      ]}
                    >
                      <CalculatorPage />
                    </ProtectedRoute>
                  }
                />


                {/* =================================================
                    EXTENSION
                ================================================== */}

                <Route
                  path="/extension"
                  element={
                    <ProtectedRoute
                      requireAuth
                      allowedRoles={[
                        'extension',
                      ]}
                    >
                      <ExtensionPage />
                    </ProtectedRoute>
                  }
                />


                {/* =================================================
                    EXPERT
                ================================================== */}

                <Route
                  path="/expert"
                  element={
                    <ProtectedRoute
                      requireAuth
                      allowedRoles={[
                        'expert',
                      ]}
                    >
                      <ExpertPage />
                    </ProtectedRoute>
                  }
                />


                {/* =================================================
                    OFFICIAL
                ================================================== */}

                <Route
                  path="/official"
                  element={
                    <ProtectedRoute
                      requireAuth
                      allowedRoles={[
                        'official',
                      ]}
                    >
                      <OfficialPage />
                    </ProtectedRoute>
                  }
                />


                {/* =================================================
                    ADMIN
                ================================================== */}

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute
                      requireAuth
                      allowedRoles={[
                        'admin',
                      ]}
                    >
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  }
                />


                {/* =================================================
                    MONITORING / GIS
                ================================================== */}

                <Route
                  path="/heatmap"
                  element={
                    <ProtectedRoute
                      requireAuth
                      allowedRoles={[
                        'extension',
                        'expert',
                        'official',
                        'admin',
                      ]}
                    >
                      <HeatmapPage />
                    </ProtectedRoute>
                  }
                />


                {/* =================================================
                    UNKNOWN ROUTE
                ================================================== */}

                <Route
                  path="*"
                  element={
                    <Navigate
                      to="/"
                      replace
                    />
                  }
                />

              </Routes>

            </main>


            {/* =====================================================
                GLOBAL FOOTER
            ====================================================== */}

            <footer
              className="py-5"
              style={{
                borderTop:
                  '1px solid var(--border-base)',

                background:
                  'var(--bg-surface)',
              }}
            >

              <div
                className="
                  max-w-7xl
                  mx-auto
                  px-4
                  sm:px-6
                  lg:px-8
                  flex
                  flex-col
                  sm:flex-row
                  items-center
                  justify-between
                  gap-3
                  text-sm
                "
                style={{
                  color:
                    'var(--text-tertiary)',
                }}
              >

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">

                  <LuSprout className="w-4 h-4 text-green-600" />


                  <span
                    className="font-semibold"
                    style={{
                      color:
                        'var(--text-primary)',
                    }}
                  >
                    ByteHarvest
                  </span>


                  <span>
                    Crop Disease &amp; Outbreak Intelligence Platform
                  </span>

                </div>


                <div
                  className="flex items-center text-sm text-center sm:text-right"
                  style={{
                    color:
                      'var(--text-tertiary)',
                  }}
                >

                  <span>
                    ICAR &amp; IMD Weather Advisory Standards
                  </span>

                </div>

              </div>

            </footer>

          </div>

        </Router>

      </ScanProvider>

    </AppProvider>
  );
}


export default App;