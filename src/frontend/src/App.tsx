import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AdmissionInfoPage from './pages/AdmissionInfoPage';
import AdmissionFormPage from './pages/AdmissionFormPage';
import PublicGalleryPage from './pages/PublicGalleryPage';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherStudentManagementPage from './pages/TeacherStudentManagementPage';
import TeacherAdmissionsPage from './pages/TeacherAdmissionsPage';
import TeacherMessagesPage from './pages/TeacherMessagesPage';
import TeacherResourcesPage from './pages/TeacherResourcesPage';
import TeacherLiveStreamPage from './pages/TeacherLiveStreamPage';
import TeacherGalleryManagementPage from './pages/TeacherGalleryManagementPage';
import TeacherAnalyticsPage from './pages/TeacherAnalyticsPage';
import { Toaster } from '@/components/ui/sonner';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const admissionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admissions',
  component: AdmissionInfoPage,
});

const applyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/apply',
  component: AdmissionFormPage,
});

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gallery',
  component: PublicGalleryPage,
});

const studentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/student',
  component: StudentDashboard,
});

const teacherRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/teacher',
  component: TeacherDashboard,
});

const teacherStudentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/teacher/students',
  component: TeacherStudentManagementPage,
});

const teacherAdmissionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/teacher/admissions',
  component: TeacherAdmissionsPage,
});

const teacherMessagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/teacher/messages',
  component: TeacherMessagesPage,
});

const teacherResourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/teacher/resources',
  component: TeacherResourcesPage,
});

const teacherStreamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/teacher/stream',
  component: TeacherLiveStreamPage,
});

const teacherGalleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/teacher/gallery',
  component: TeacherGalleryManagementPage,
});

const teacherAnalyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/teacher/analytics',
  component: TeacherAnalyticsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  admissionsRoute,
  applyRoute,
  galleryRoute,
  studentRoute,
  teacherRoute,
  teacherStudentsRoute,
  teacherAdmissionsRoute,
  teacherMessagesRoute,
  teacherResourcesRoute,
  teacherStreamRoute,
  teacherGalleryRoute,
  teacherAnalyticsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
