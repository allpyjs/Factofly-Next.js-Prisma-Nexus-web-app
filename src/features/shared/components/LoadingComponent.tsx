export default function LoadingComponent() {
  return (
    <div className="loading">
      <span className="loading-text">
        <div className="spinner-border text-primary me-3" role="status" />
        Loading...
      </span>
      <style jsx>{`
        .loading {
          text-align: center;
        }
        .loading .loading-text {
          font-size: 1.5rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
