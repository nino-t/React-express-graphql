import React from 'react'

const Header = () => (        
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand"
        href="#">
          React Apollo
      </a>
      <button
        className="navbar-toggler hidden-lg-up"
        type="button"
        data-toggle="collapse"
        data-target="#nav-header-app"
        aria-controls="nav-header-app"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse"
        id="nav-header-app">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <a className="nav-link"
              href="#">Dashboard
            </a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2"
            type="text"
            placeholder="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" 
            type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  </nav>
)

export default Header
