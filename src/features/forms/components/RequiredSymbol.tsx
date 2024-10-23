export default function RequiredSymbol() {
  return (
    <>
      <span className="required">*</span>
      <style jsx>{`
        .required {
          color: red;
        }
      `}</style>
    </>
  );
}
