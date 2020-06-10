//landing-page
function animateName() {
	const nextElem = document.querySelector('#top a');
	nextElem.style.opacity = 1;
	const mql = window.matchMedia('(min-width: 1200px)');
	if (!mql.matches) return; // screen size smaller than 1200px

	// animate
	const firstNameElem = document.querySelector('#first-name');
	firstNameElem.classList.remove('hidden');
	// move letters
	const firstInitElem = document.querySelector('#first-init');
	const lastNameElem = document.querySelector('#last-name');
	const periodElemWidth = document.querySelector('span').offsetWidth;
	const distance = firstNameElem.offsetWidth / 2;
	const windowWidth = document.body.clientWidth / 2;
	firstInitElem.style.right = windowWidth + distance + periodElemWidth + 'px';
	firstNameElem.style.left = windowWidth - distance - periodElemWidth + 'px';
	lastNameElem.style.left = windowWidth + distance - periodElemWidth + 'px';
	// add period
	lastNameElem.querySelector('span').style.opacity = 1;
}

function resetNameAnimation() {
	const mql = window.matchMedia('(min-width: 1200px)');
	if (mql.matches) return; // screen size smaller than 1200px

	// reset
	const firstNameElem = document.querySelector('#first-name');
	firstNameElem.classList.add('hidden');
	// move letters
	const firstInitElem = document.querySelector('#first-init');
	const lastNameElem = document.querySelector('#last-name');
	firstInitElem.style.right = '50%';
	firstNameElem.style.left = '50%';
	lastNameElem.style.left = '50%';
	// remove period
	lastNameElem.querySelector('span').style.opacity = 0;
}

//canvas
function setCanvasSize() {
	const canvas = document.querySelector('canvas');
	if (!canvas.getContext) return;
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
}

// navbar
const OPEN_NAV_HEIGHT = '25vh';

function checkNavbar() {
	const sticky = document.body.clientHeight;
	const navbar = document.querySelector('nav');
	const closedNavbar = document.querySelector('#closed-nav');
	const openNavbar = document.querySelector('#open-nav');
	const mobileNavbar = document.querySelector('#mobile-nav');
	if (window.pageYOffset >= sticky) {
		navbar.classList.add('sticky');
		navbar.style.backgroundColor = 'transparent';
		closedNavbar.querySelectorAll('a').forEach((elem) => {
			elem.style.color = 'black';
		});
		mobileNavbar.classList.add('filter-black');
		if (openNavbar.style.height === OPEN_NAV_HEIGHT) {
			// opened position
			navbar.style.backgroundColor = 'black';
			mobileNavbar.classList.remove('filter-black');
		} else {
			// closed position
			navbar.style.backgroundColor = 'transparent';
			mobileNavbar.classList.add('filter-black');
		}
	} else {
		navbar.classList.remove('sticky');
		navbar.style.backgroundColor = 'black';
		closedNavbar.querySelectorAll('a').forEach((elem) => {
			elem.style.color = 'white';
		});
		mobileNavbar.classList.remove('filter-black');
	}
	const mql = window.matchMedia('(max-width: 575.98px)');
	if (!mql.matches) openNavbar.style.height = '0';
}

function openNav() {
	const sticky = document.body.clientHeight;
	const navbar = document.querySelector('nav');
	const openNavbar = document.querySelector('#open-nav');
	const mobileNavbar = document.querySelector('#mobile-nav');
	if (openNavbar.style.height !== OPEN_NAV_HEIGHT) {
		// opened position
		openNavbar.style.height = OPEN_NAV_HEIGHT;
		navbar.style.backgroundColor = 'black';
		mobileNavbar.classList.remove('filter-black');
	} else {
		// closed position
		openNavbar.style.height = '0';
		if (window.pageYOffset >= sticky) {
			navbar.style.backgroundColor = 'transparent';
			mobileNavbar.classList.add('filter-black');
		}
	}
}

window.onscroll = () => checkNavbar();

window.onload = () => {
	setTimeout(animateName, 1000);
	setCanvasSize();
	petalsAnimation();
	checkNavbar();
};

window.onresize = () => {
	// for tablet rotation
	resetNameAnimation();
	animateName();
	// resize canvas
	setCanvasSize();
	// navbar
	checkNavbar();
};
