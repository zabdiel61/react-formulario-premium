import * as React from 'react';

export default function Header(props) {
  return (
    <header className="bg-primary text-white">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="img-container">
              <img src={props.logoSrc} alt="Factura" className="img-fluid" />
            </div>
          </div>
          <div className="col-md-6">
            <h1 className="display-1">{props.pageTitle}</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
