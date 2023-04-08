const CategoryList = () => {
  return (
    <table class="table mt-4">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Date</th>
          <th scope="col">Title</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody className="overflow-y-scroll" style={{ height: "400px" }}>
        <tr>
          <td>123454</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td className="d-flex">
            <button className="btn btn-success">Edit</button>
            <button className="mx-3 btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CategoryList;
