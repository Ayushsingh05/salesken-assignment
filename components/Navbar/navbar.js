
const navbar= ()=>{
    return `
    <img src="./image/logo.png" alt="logo">
   
    <h1>
        Quiz App
    </h1>
    <div>
        <img src="./image/user.png" alt="user"><span id="nav-username"></span>
        <button id="home_or_report" class="navbar_button"></button>
        <button id="login_logout_button" class="navbar_button">Login</button>
    </div>
    `
}
export default navbar;