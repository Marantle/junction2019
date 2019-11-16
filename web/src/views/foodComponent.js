import React from 'react';

export default function ProductPicture(product) {
  return (
    <>
      <div className="container">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <h4>Some text</h4>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <img key={product.ean} src={product.pictureUrls[0].originalUrl} alt="" className="img-responsive" />
        </div>
      </div>
    </>
  );
}
