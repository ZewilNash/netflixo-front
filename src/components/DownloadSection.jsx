const DownloadSection = () => {
  return (
    <div className="row p-4 mt-4 download__section">
      <div className="left col-md-6 mt-4">
        <img
          src="https://www.flixicam.com/img/netflix-video-downloader-banner.png"
          alt=""
        />
      </div>

      <div className="right col-md-6">
        <h3 className="text-center">Download Your Movies Watch Offline.</h3>
        <h3 className="text-center">Enjoy On Your Mobile</h3>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt et
          porro incidunt ipsa. Inventore rerum tempora rem laudantium commodi
          doloribus suscipit beatae dolore, sequi nemo possimus reprehenderit
          assumenda at eaque?
        </p>
        <div className="d-flex">
          <button className="bg-dark text-danger p-2">HD 4K</button>
          <button className="mx-4 bg-dark text-danger p-2">2K</button>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;
