export default function Header() {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container justify-content-between">
        <div>
          <a className="navbar-brand" href="/">E-Book</a>
        </div>

        <div className="dropdown">
          <div
            className="dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-user"></i> UserName
          </div>

          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="/logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}