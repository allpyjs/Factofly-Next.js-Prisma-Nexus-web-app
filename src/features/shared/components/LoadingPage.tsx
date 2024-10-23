export default function LoadingPage() {
  return (
    <div className="loading">
      <span className="loading-text">
        <div className="spinner-border text-primary me-3" role="status" />
        Loading...
      </span>
      <style jsx>{`
        .loading {
          text-align: center;
          margin-top: 10%;
        }
        .loading .loading-text {
          font-size: 2rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
