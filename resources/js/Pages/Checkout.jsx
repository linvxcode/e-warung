import React, { useEffect } from 'react';

function Checkout({token}) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://app.midtrans.com/snap/snap.js';
    script.onload = () => {
      window.snap.pay(token);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [token]);

  return <div>Loading...</div>;
}

export default Checkout