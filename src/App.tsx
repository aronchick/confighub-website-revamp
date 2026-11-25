import { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { toAppRoute, toBrowserPath } from './lib/paths';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { EnterprisePage } from './pages/EnterprisePage';
import { FaqPage } from './pages/FaqPage';
import { HomePage } from './pages/HomePage';
import { LegalPage } from './pages/LegalPage';
import { SecurityPage } from './pages/SecurityPage';

export function App() {
  const [path, setPath] = useState<string>(() => toAppRoute(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setPath(toAppRoute(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = (nextPath: string) => {
    const normalized = toAppRoute(nextPath);

    if (normalized !== path) {
      window.history.pushState({}, '', toBrowserPath(normalized));
      setPath(normalized);
    }

    document.documentElement.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const renderPage = () => {
    if (path === '/' || path === '') {
      return <HomePage onNavigate={navigate} />;
    }

    if (path === '/enterprise') {
      return <EnterprisePage onNavigate={navigate} />;
    }

    if (path === '/security') {
      return <SecurityPage onNavigate={navigate} />;
    }

    if (path === '/blog') {
      return <BlogPage slug={null} onNavigate={navigate} />;
    }

    if (path.startsWith('/blog/')) {
      const slug = path.slice('/blog/'.length);

      return <BlogPage slug={slug} onNavigate={navigate} />;
    }

    if (path === '/faq') {
      return <FaqPage onNavigate={navigate} />;
    }

    if (path === '/contact') {
      return <ContactPage />;
    }

    if (path === '/tos') {
      return <LegalPage kind="tos" />;
    }

    if (path === '/privacy') {
      return <LegalPage kind="privacy" />;
    }

    return <HomePage onNavigate={navigate} />;
  };

  return (
    <Layout currentPath={path} onNavigate={navigate}>
      {renderPage()}
    </Layout>
  );
}
