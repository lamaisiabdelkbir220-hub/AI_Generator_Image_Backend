export default function TestDeploy() {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1>✅ Deployment Working!</h1>
      <p>If you can see this, the deployment is successful.</p>
      <p>Timestamp: {new Date().toISOString()}</p>
    </div>
  );
}

