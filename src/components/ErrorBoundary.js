import React from 'react';
import Card from './Card';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: info });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Card>
          <section>
            <p>Something went wrong.</p>
            <p>{JSON.stringify(this.state)}</p>
          </section>
        </Card>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
