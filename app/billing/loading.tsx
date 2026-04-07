export default function Loading() {
  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FA' }}>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}.sp{animation:pulse 1.5s ease-in-out infinite}`}</style>
      <div style={{ background: '#1C3A5E', padding: '32px 20px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="sp" style={{ height: 12, width: 150, background: 'rgba(255,255,255,0.1)', borderRadius: 2, marginBottom: 16 }} />
          <div className="sp" style={{ height: 32, width: '40%', background: 'rgba(255,255,255,0.12)', borderRadius: 2, marginBottom: 10 }} />
          <div className="sp" style={{ height: 16, width: '55%', background: 'rgba(255,255,255,0.07)', borderRadius: 2 }} />
        </div>
      </div>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '32px 20px' }}>
        {[1,2,3].map(i => (
          <div key={i} className="sp" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 2, padding: 24, marginBottom: 16, animationDelay: `${i*150}ms` }}>
            <div style={{ height: 16, width: '45%', background: '#E5E7EB', borderRadius: 2, marginBottom: 12 }} />
            <div style={{ height: 14, width: '80%', background: '#F0F1F2', borderRadius: 2, marginBottom: 8 }} />
            <div style={{ height: 14, width: '60%', background: '#F7F8FA', borderRadius: 2 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
