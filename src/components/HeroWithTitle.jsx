const HeroWithTitle = ({ title, src }) => {
  return (
    <div className="container-fluid mt-2">
      <div className="row">
        <div className="col-md-12 about__banner">
          <img className="about__top__banner" src={src} alt="" />
          <h1 className="text-light">{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default HeroWithTitle;
