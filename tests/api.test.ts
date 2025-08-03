// Jest test stub for API endpoints
// TODO: Add real tests for API endpoints

test('GET /api/agents returns mock agents', async () => {
  const res = await fetch('http://localhost:3000/api/agents');
  const data = await res.json();
  expect(Array.isArray(data)).toBe(true);
}); 