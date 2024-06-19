import "./Header.scss";

const Header = () => {
	document.title = window.location.href;
	return (
		<>
			<h1>Hello</h1>
		</>
	);
};

export default Header;
