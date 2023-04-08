import Footer from "../../../components/layout/Footer";
import Layout from "../../../components/layout/Layout";
import AdminMenu from "../components/AdminMenu";
import CategoryList from "./CategoryList";

const Categories = () => {
  return (
    <Layout title="Netflix - Admin Category Page">
      <>
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-md-4 mt-3">
              <AdminMenu />
            </div>
            <div className="col-md-8 mt-3">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-5">
                    <h1>Categories</h1>
                  </div>
                  <div className="col-md-3">
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#categoryModal"
                      className="btn btn-danger"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
              <CategoryList />
            </div>
          </div>
        </div>

        {/* create category Modal */}
        <div class="modal" id="categoryModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Add Category</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Category Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
      <Footer />
    </Layout>
  );
};

export default Categories;
