import { UserButton } from '@clerk/clerk-react';
import { useClerk } from '@clerk/clerk-react';

const Dashboard = () => {
  const { user } = useClerk();

  return (
    <div>
      <h1>Welcome to your dashboard {user.firstName}</h1>
      <UserButton />
    </div>
  );
};

export default Dashboard;
