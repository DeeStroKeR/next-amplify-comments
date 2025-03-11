import Login from "@/components/Login";
import '@aws-amplify/ui-react/styles.css';

export default function LoginPage() {
  return <>
    <Login />
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <p>Logging in..</p>
    </div>
  </>;
}