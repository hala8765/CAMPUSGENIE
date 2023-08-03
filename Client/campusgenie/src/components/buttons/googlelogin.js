import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './googlelog.css';
function GoogleButton() {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <Button
      className='google-btn'
      variant="primary"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
      
    >
      {isLoading ? 'Loading…' : 'Sign in with google'}
    </Button>
  );
}

export default GoogleButton;