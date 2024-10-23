function TextColumnFilter({ column: { filterValue, setFilter } }: any) {
  return (
    <input
      className="form-control"
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
    />
  );
}

export default TextColumnFilter;
