export default function FieldLoading() {
  return (
    <>
      <input type="text" className="form-control disabled loading" disabled />
      <style jsx>
        {`
          .form-control.loading {
            margin-top: 1.5rem;
          }
        `}
      </style>
    </>
  );
}
