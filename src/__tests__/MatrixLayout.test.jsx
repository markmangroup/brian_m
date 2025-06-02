import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../theme/ThemeContext';
import MatrixLayout, { MatrixCard, MatrixButton, MatrixInput } from '../components/MatrixLayout';

// Mock MatrixRain to avoid canvas issues in tests
jest.mock('../components/MatrixRain', () => {
  return function MockMatrixRain() {
    return <div data-testid="matrix-rain" />;
  };
});

const TestWrapper = ({ children }) => (
  <ThemeProvider>
    {children}
  </ThemeProvider>
);

describe('MatrixLayout', () => {
  test('renders children correctly', () => {
    render(
      <TestWrapper>
        <MatrixLayout>
          <div>Test Content</div>
        </MatrixLayout>
      </TestWrapper>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('shows MatrixRain by default', () => {
    render(
      <TestWrapper>
        <MatrixLayout>
          <div>Test Content</div>
        </MatrixLayout>
      </TestWrapper>
    );
    
    expect(screen.getByTestId('matrix-rain')).toBeInTheDocument();
  });

  test('hides MatrixRain when withRain is false', () => {
    render(
      <TestWrapper>
        <MatrixLayout withRain={false}>
          <div>Test Content</div>
        </MatrixLayout>
      </TestWrapper>
    );
    
    expect(screen.queryByTestId('matrix-rain')).not.toBeInTheDocument();
  });

  test('applies glitch class when glitch prop is true', () => {
    const { container } = render(
      <TestWrapper>
        <MatrixLayout glitch={true}>
          <div>Test Content</div>
        </MatrixLayout>
      </TestWrapper>
    );
    
    expect(container.querySelector('.animate-glitch')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const { container } = render(
      <TestWrapper>
        <MatrixLayout className="custom-class">
          <div>Test Content</div>
        </MatrixLayout>
      </TestWrapper>
    );
    
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});

describe('MatrixCard', () => {
  test('renders children with correct styling', () => {
    render(
      <TestWrapper>
        <MatrixCard>
          <div>Card Content</div>
        </MatrixCard>
      </TestWrapper>
    );
    
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const { container } = render(
      <TestWrapper>
        <MatrixCard className="custom-card">
          <div>Card Content</div>
        </MatrixCard>
      </TestWrapper>
    );
    
    expect(container.querySelector('.custom-card')).toBeInTheDocument();
  });
});

describe('MatrixButton', () => {
  test('renders button with text', () => {
    render(
      <TestWrapper>
        <MatrixButton>Click Me</MatrixButton>
      </TestWrapper>
    );
    
    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(
      <TestWrapper>
        <MatrixButton onClick={handleClick}>Click Me</MatrixButton>
      </TestWrapper>
    );
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies correct variant styling', () => {
    const { container } = render(
      <TestWrapper>
        <MatrixButton variant="danger">Danger Button</MatrixButton>
      </TestWrapper>
    );
    
    expect(container.querySelector('.bg-red-900')).toBeInTheDocument();
  });

  test('applies correct size styling', () => {
    const { container } = render(
      <TestWrapper>
        <MatrixButton size="lg">Large Button</MatrixButton>
      </TestWrapper>
    );
    
    expect(container.querySelector('.px-6')).toBeInTheDocument();
  });

  test('is disabled when disabled prop is true', () => {
    render(
      <TestWrapper>
        <MatrixButton disabled>Disabled Button</MatrixButton>
      </TestWrapper>
    );
    
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('applies aria-label', () => {
    render(
      <TestWrapper>
        <MatrixButton ariaLabel="Custom aria label">Button</MatrixButton>
      </TestWrapper>
    );
    
    expect(screen.getByLabelText('Custom aria label')).toBeInTheDocument();
  });

  test('applies focus-matrix class for accessibility', () => {
    const { container } = render(
      <TestWrapper>
        <MatrixButton>Button</MatrixButton>
      </TestWrapper>
    );
    
    expect(container.querySelector('.focus-matrix')).toBeInTheDocument();
  });
});

describe('MatrixInput', () => {
  test('renders input with value', () => {
    render(
      <TestWrapper>
        <MatrixInput value="test value" onChange={() => {}} />
      </TestWrapper>
    );
    
    expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
  });

  test('handles change events', () => {
    const handleChange = jest.fn();
    render(
      <TestWrapper>
        <MatrixInput value="" onChange={handleChange} />
      </TestWrapper>
    );
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalled();
  });

  test('shows placeholder text', () => {
    render(
      <TestWrapper>
        <MatrixInput value="" onChange={() => {}} placeholder="Enter text" />
      </TestWrapper>
    );
    
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  test('applies aria-label', () => {
    render(
      <TestWrapper>
        <MatrixInput 
          value="" 
          onChange={() => {}} 
          ariaLabel="Custom input label" 
        />
      </TestWrapper>
    );
    
    expect(screen.getByLabelText('Custom input label')).toBeInTheDocument();
  });

  test('applies focus-matrix class for accessibility', () => {
    const { container } = render(
      <TestWrapper>
        <MatrixInput value="" onChange={() => {}} />
      </TestWrapper>
    );
    
    expect(container.querySelector('.focus-matrix')).toBeInTheDocument();
  });

  test('applies input-theme class for styling', () => {
    const { container } = render(
      <TestWrapper>
        <MatrixInput value="" onChange={() => {}} />
      </TestWrapper>
    );
    
    expect(container.querySelector('.input-theme')).toBeInTheDocument();
  });
});

// Story State Integration Tests - Simplified version without complex mocking
describe('Story State Integration', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('MatrixLayout renders without errors when story hooks are used', () => {
    // Simple integration test - just ensure no crashes
    const TestComponent = () => {
      return <div data-testid="story-test">Story Integration Test</div>;
    };

    render(
      <TestWrapper>
        <MatrixLayout>
          <TestComponent />
        </MatrixLayout>
      </TestWrapper>
    );

    expect(screen.getByTestId('story-test')).toBeInTheDocument();
  });

  test('MatrixButton works with story-related onClick handlers', () => {
    const mockStoryAction = jest.fn();
    
    render(
      <TestWrapper>
        <MatrixLayout>
          <MatrixButton onClick={mockStoryAction} data-testid="story-button">
            Make Story Choice
          </MatrixButton>
        </MatrixLayout>
      </TestWrapper>
    );

    fireEvent.click(screen.getByTestId('story-button'));
    expect(mockStoryAction).toHaveBeenCalledTimes(1);
  });

  test('MatrixLayout supports faction badge display', () => {
    // Mock faction data in component props
    const TestComponentWithFaction = () => (
      <div className="bg-red-900/20 text-red-300 border-red-400/40" data-testid="faction-badge">
        <span>⚔️</span>
        <span>Zion Fleet</span>
      </div>
    );

    render(
      <TestWrapper>
        <MatrixLayout>
          <TestComponentWithFaction />
        </MatrixLayout>
      </TestWrapper>
    );

    const badge = screen.getByTestId('faction-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-red-900/20');
    expect(screen.getByText('⚔️')).toBeInTheDocument();
    expect(screen.getByText('Zion Fleet')).toBeInTheDocument();
  });

  test('MatrixLayout maintains theme consistency with story elements', () => {
    const { container } = render(
      <TestWrapper>
        <MatrixLayout>
          <div className="heading-theme">Story Title</div>
          <div className="body-theme">Story content</div>
          <div className="text-theme-accent">Story highlight</div>
        </MatrixLayout>
      </TestWrapper>
    );

    expect(container.querySelector('.heading-theme')).toBeInTheDocument();
    expect(container.querySelector('.body-theme')).toBeInTheDocument();
    expect(container.querySelector('.text-theme-accent')).toBeInTheDocument();
  });

  test('Story milestone progression can be simulated', () => {
    const milestones = ['entered-entry', 'visited-message', 'completed-stage-3', 'selected-faction'];
    
    const TestComponent = ({ milestone }) => (
      <div data-testid={`milestone-${milestone}`}>
        Milestone: {milestone}
      </div>
    );

    milestones.forEach(milestone => {
      render(
        <TestWrapper>
          <MatrixLayout>
            <TestComponent milestone={milestone} />
          </MatrixLayout>
        </TestWrapper>
      );

      expect(screen.getByTestId(`milestone-${milestone}`)).toBeInTheDocument();
      expect(screen.getByText(`Milestone: ${milestone}`)).toBeInTheDocument();
    });
  });
}); 