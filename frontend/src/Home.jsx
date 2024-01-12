import { SignInButton } from '@clerk/clerk-react';

const Home = () => {
  return (
    <div>
      <h1>Sign in with this button</h1>
      <SignInButton mode="modal" redirectUrl="/dashboard" />
    </div>
  );
};

export default Home;
