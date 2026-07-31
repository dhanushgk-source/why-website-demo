export function LoadingState({ label = "Loading…" }) {
  return (
    <div className="state-block">
      <div className="spinner" />
      <p>{label}</p>
    </div>
  );
}

export function EmptyState({ title, message }) {
  return (
    <div className="state-block">
      <h3>{title}</h3>
      {message && <p>{message}</p>}
    </div>
  );
}

export function ErrorState({ title = "Couldn't load this", message, onRetry }) {
  return (
    <div className="state-block">
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {onRetry && (
        <button className="btn btn-outline btn-sm mt-24" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
