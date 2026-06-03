const { useState, useCallback } = React;

function ToastHost({ toasts }) {
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className="toast"><span className="tk"><Icon name="check" size={13} color="#04391f" /></span>{t.msg}</div>
      ))}
    </div>
  );
}

function DashboardApp() {
  const [toasts, setToasts] = useState([]);
  const toast = useCallback(msg => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, { id, msg }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);

  const go = useCallback((view) => {
    if (view === 'home') {
      window.location.href = '../index.html';
    }
  }, []);

  return (
    <>
      <Dashboard go={go} toast={toast} />
      <ToastHost toasts={toasts} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<DashboardApp />);
