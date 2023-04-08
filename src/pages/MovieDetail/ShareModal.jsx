import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  PinterestShareButton,
  PinterestIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramIcon,
  TelegramShareButton,
  ViberIcon,
  ViberShareButton,
  WhatsappShareButton,
  WhatsappIcon
} from "react-share";
const ShareModal = ({ movie }) => {
  const currentPageUrl = window.location.href;
  return (
    <div id="shareModal" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Share Movie With Social Media Below</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-4 mt-3 d-flex justify-content-center">
                  <FacebookShareButton
                    quote="Please Share This Movie Website With Your Friends"
                    hashtag="#Movies"
                    url={currentPageUrl}
                  >
                    <FacebookIcon />
                  </FacebookShareButton>
                </div>
                <div className="col-md-4 mt-3 d-flex justify-content-center">
                  <TwitterShareButton
                    title={movie?.title}
                    hashtag="#Movies"
                    url={currentPageUrl}
                  >
                    <TwitterIcon />
                  </TwitterShareButton>
                </div>
                <div className="col-md-4 mt-3 d-flex justify-content-center">
                  <PinterestShareButton
                    media={`http://localhost:9000/api/v1/movies/get-movie-image/${movie?._id}`}
                    url={currentPageUrl}
                    description={`${movie?.title} is ${movie?.description}`}
                  >
                    <PinterestIcon />
                  </PinterestShareButton>
                </div>
                <div className="col-md-4 mt-3 d-flex justify-content-center">
                  <LinkedinShareButton
                    url={currentPageUrl}
                    title={movie?.title}
                    summary={`${movie?.title} is ${movie?.description}`}
                  >
                    <LinkedinIcon />
                  </LinkedinShareButton>
                </div>
                <div className="col-md-4 mt-3 d-flex justify-content-center">
                  <TelegramShareButton
                    url={currentPageUrl}
                    title={movie?.title}
                    // summary={`${movie?.title} is ${movie?.description}`}
                  >
                    <TelegramIcon />
                  </TelegramShareButton>
                </div>
                <div className="col-md-4 mt-3 d-flex justify-content-center">
                  <ViberShareButton
                    url={currentPageUrl}
                    title={movie?.title}
                    // summary={`${movie?.title} is ${movie?.description}`}
                  >
                    <ViberIcon />
                  </ViberShareButton>
                </div>
                <div className="col-md-4 mt-3 d-flex justify-content-center">
                  <WhatsappShareButton
                    url={currentPageUrl}
                    title={movie?.title}
                    // summary={`${movie?.title} is ${movie?.description}`}
                  >
                    <WhatsappIcon />
                  </WhatsappShareButton>
                </div>
              </div>
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
            {/* <button type="button" class="btn btn-primary">
              Save changes
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
