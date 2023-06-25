import './styles.css';

export default function Header() {
  return (
    <nav className="navbar navbar-contain bg-primary">
      <div className="container justify-content-between">
        <div>
          <a className="navbar-brand text-white" href="/">E-Book</a>
        </div>

        <div className="dropdown">
          <div
            className="dropdown-toggle username text-white"
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