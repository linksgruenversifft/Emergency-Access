export function Bar() {
  return (
    <div class="navbar bg-base-200 sticky z-10 top-0">
      <div className="navbar-start">
        <a href="/" className="btn btn-ghost text-xl">
          daisyUI
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <details>
              <summary>Dev</summary>
              <ul className="p-2">
                <li>
                  <a href="/dev/Recover">Recover</a>
                </li>
                <li>
                  <a href="/dev/Family">Family</a>
                </li>
                <li>
                  <a href="/dev/Data">Data</a>
                </li>
                <li>
                  <a href="/dev/RecoverMenu">RecoverMenu</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a href="/account/login" className="btn bg-base-100">
          Login
        </a>
      </div>
    </div>
  );
}
