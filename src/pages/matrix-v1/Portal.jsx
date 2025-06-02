import React from 'react';
import { Link } from 'react-router-dom';
import { navItems } from '../../components/Navigation';
import useTypewriterEffect from '../../components/useTypewriterEffect';
import MatrixLayout from '../../components/MatrixLayout';
import MatrixFlowDrawer from '../../components/MatrixFlowDrawer';

export default function Portal() {
  const [welcomeText] = useTypewriterEffect('Welcome to the Portal', 50);
  const [quoteText] = useTypewriterEffect('The rabbit hole goes deeper than you think.', 50);

  return (
    <MatrixLayout centered={false} contentClassName="p-8">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-theme-accent heading-theme">{welcomeText}</h1>
        <p className="text-lg max-w-md mx-auto text-theme-secondary">{quoteText}</p>
        <p className="text-sm text-theme-muted">Select a destination</p>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {navItems
            .filter((item) => item.path !== '/the-matrix')
            .map(({ name, path, color, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center py-4 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform focus-matrix ${color}`}
                aria-label={`Navigate to ${name}`}
              >
                {Icon && (
                  <Icon 
                    className="mb-1 text-xl" 
                    aria-hidden="true"
                  />
                )}
                {name}
              </Link>
            ))}
        </div>
        <MatrixFlowDrawer />
      </div>
    </MatrixLayout>
  );
}
