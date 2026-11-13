export default function Home() {
  return (
    <div data-selector="page-wrapper" className="flex-fill-viewport-height">
    <header id="header" className="global-header global-header-v1">
    <nav className="global-header__container content-container content-container--wide" aria-label="Main">
        <div className="global-header__nav-wrapper">
            <div id="block-tableau-logo" className="global-header__logo-wrapper">

                <a href="/" title="Return to the Tableau Software home page" rel="home" className="site-logo logo-img">
                    <img loading="eager" src="https://www.tableau.com/themes/custom/tableau_www/logo.v2.svg" alt="Tableau, from Salesforce" />
                </a>
            </div>

            <div className="mobile-buttons">
                <button className="mobile-nav-button" data-search-trigger="coveo" aria-label="Toggle Main Menu" aria-controls="header-nav" aria-expanded="false">
                    <span className="mobile-nav-button__label">Menu</span>
                    <span aria-hidden="true" className="mobile-nav-button__icon"></span>
                </button>
            </div>
            <div id="site-header__inner" className="site-header__inner">
                <div id="header-nav" className="header-nav header-nav-processed" data-menu-open="false">

                    <div data-menu-name="main" id="block-tableau-main-menu" className="global-header__primary-nav" data-nav-l1-init="true" data-nav-l2-init="true">

                        <ul className="menu primary-nav__menu primary-nav__menu--level-1 menu--main__v1">

                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-1 primary-nav__menu-item--has-children">

                                <a href="https://www.tableau.com/products/tableau" data-value="Products" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-1 primary-nav__menu-link--has-children" data-section="header:primary-link">
                                    <span className="primary-nav__menu-link-inner">Products</span>
                                </a>

                                <button className="primary-nav__button-toggle" aria-controls="submenu-1" aria-expanded="false">
                                    <span className="visually-hidden">Toggle sub-navigation for Products</span>
                                    <span className="icon--menu-toggle"></span>
                                </button>

                                <ul className="menu primary-nav__menu menu--main__v1 primary-nav__menu--level-2" id="submenu-1">

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2">

                                        <a href="https://www.tableau.com/products/tableau" data-value="Overview" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">Overview</span>
                                        </a>

                                    </li>

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2 primary-nav__menu-item--has-children">

                                        <a href="https://www.tableau.com/products/tableau-next" data-value="Tableau Next" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2 primary-nav__menu-link--has-children" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">Tableau Next</span>
                                        </a>

                                        <button className="primary-nav__button-toggle" aria-controls="submenu-2" aria-expanded="false">
                                            <span className="visually-hidden">Toggle sub-navigation for Tableau Next</span>
                                            <span className="icon--menu-toggle"></span>
                                        </button>

                                        <ul className="menu primary-nav__menu menu--main__v1 primary-nav__menu--level-3" id="submenu-2">

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/products/tableau-semantics" data-value="Tableau Semantics" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Tableau Semantics</span>
                                                </a>

                                            </li>
                                        </ul>

                                    </li>

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2">

                                        <a href="https://www.tableau.com/products/cloud-bi" data-value="Tableau Cloud" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">Tableau Cloud</span>
                                        </a>

                                    </li>

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2">

                                        <a href="https://www.tableau.com/products/server" data-value="Tableau Server" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">Tableau Server</span>
                                        </a>

                                    </li>

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2">

                                        <a href="https://www.tableau.com/products/tableau-knowledge" data-value="Tableau Knowledge" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">Tableau Knowledge</span>
                                        </a>

                                    </li>

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2">

                                        <a href="https://www.tableau.com/products/desktop" data-value="Tableau Desktop" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">Tableau Desktop</span>
                                        </a>

                                    </li>

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2">

                                        <a href="https://www.tableau.com/products/new-features" data-value="Latest Release" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">Latest Release</span>
                                        </a>

                                    </li>
                                </ul>

                            </li>

                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-1 primary-nav__menu-item--has-children">

                                <a href="https://www.tableau.com/solutions/customers" data-value="Customers" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-1 primary-nav__menu-link--has-children" data-section="header:primary-link">
                                    <span className="primary-nav__menu-link-inner">Customers</span>
                                </a>

                                <button className="primary-nav__button-toggle" aria-controls="submenu-2--2" aria-expanded="false">
                                    <span className="visually-hidden">Toggle sub-navigation for Customers</span>
                                    <span className="icon--menu-toggle"></span>
                                </button>

                                <ul className="menu primary-nav__menu menu--main__v1 primary-nav__menu--level-2" id="submenu-2--2">

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2">

                                        <a href="https://www.tableau.com/solutions/customers" data-value="Customer Stories" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">Customer Stories</span>
                                        </a>

                                    </li>

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2">

                                        <a href="https://www.tableau.com/community/my-tableau-story" data-value="Community Stories" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">Community Stories</span>
                                        </a>

                                    </li>
                                </ul>

                            </li>

                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-1 primary-nav__menu-item--has-children">

                                <a href="https://www.tableau.com/solutions" data-value="Solutions" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-1 primary-nav__menu-link--has-children" data-section="header:primary-link">
                                    <span className="primary-nav__menu-link-inner">Solutions</span>
                                </a>

                                <button className="primary-nav__button-toggle" aria-controls="submenu-3--2" aria-expanded="false">
                                    <span className="visually-hidden">Toggle sub-navigation for Solutions</span>
                                    <span className="icon--menu-toggle"></span>
                                </button>

                                <ul className="menu primary-nav__menu menu--main__v1 primary-nav__menu--level-2" id="submenu-3--2">

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2 primary-nav__menu-item--has-children">

                                        <a href="https://www.tableau.com/solutions/industries" data-value="By Industry" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2 primary-nav__menu-link--has-children" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">By Industry</span>
                                        </a>

                                        <button className="primary-nav__button-toggle" aria-controls="submenu-1--5" aria-expanded="false">
                                            <span className="visually-hidden">Toggle sub-navigation for By Industry</span>
                                            <span className="icon--menu-toggle"></span>
                                        </button>

                                        <ul className="menu primary-nav__menu menu--main__v1 primary-nav__menu--level-3" id="submenu-1--5" style={{ left: "200px" }}>

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/solutions/industries/financial-services" data-value="Financial Services" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Financial Services</span>
                                                </a>

                                            </li>

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/solutions/industries/healthcare-life-sciences" data-value="Healthcare and Life Sciences" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Healthcare and Life Sciences</span>
                                                </a>

                                            </li>

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/solutions/industries/public-sector" data-value="Public Sector" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Public Sector</span>
                                                </a>

                                            </li>

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/solutions/industries/retail-consumer-goods" data-value="Retail and Consumer Goods" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Retail and Consumer Goods</span>
                                                </a>

                                            </li>

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/solutions/industries/communications-media" data-value="Communications and Media" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Communications and Media</span>
                                                </a>

                                            </li>

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/solutions/industries/manufacturing" data-value="Manufacturing" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Manufacturing</span>
                                                </a>

                                            </li>
                                        </ul>

                                    </li>

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2 primary-nav__menu-item--has-children">

                                        <a href="https://www.tableau.com/roles" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2 primary-nav__menu-link--has-children" data-value="By Role" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">By Role</span>
                                        </a>

                                        <button className="primary-nav__button-toggle" aria-controls="submenu-2--5" aria-expanded="false">
                                            <span className="visually-hidden">Toggle sub-navigation for By Role</span>
                                            <span className="icon--menu-toggle"></span>
                                        </button>

                                        <ul className="menu primary-nav__menu menu--main__v1 primary-nav__menu--level-3" id="submenu-2--5">

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/business-leader" data-value="Business Leader" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Business Leader</span>
                                                </a>

                                            </li>

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/data-it-leader" data-value="Data and IT Leader" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Data and IT Leader</span>
                                                </a>

                                            </li>

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/analyst" data-value="Analyst" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Analyst</span>
                                                </a>

                                            </li>

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/developer" data-value="Developer" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Developer</span>
                                                </a>

                                            </li>

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/solutions/departments/marketing" data-value="Marketing" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Marketing</span>
                                                </a>

                                            </li>

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/solutions/departments/finance" data-value="Finance" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Finance</span>
                                                </a>

                                            </li>

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/solutions/departments/sales" data-value="Sales" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Sales</span>
                                                </a>

                                            </li>

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/solutions/support-and-service-analytics" data-value="Support and Service" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Support and Service</span>
                                                </a>

                                            </li>
                                        </ul>

                                    </li>

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2">

                                        <a href="https://www.tableau.com/solutions/technologies" data-value="By Technology" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">By Technology</span>
                                        </a>

                                    </li>

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2 primary-nav__menu-item--has-children">

                                        <a href="https://www.tableau.com/solutions/exchange" data-value="Tableau Exchange" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2 primary-nav__menu-link--has-children" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">Tableau Exchange</span>
                                        </a>

                                        <button className="primary-nav__button-toggle" aria-controls="submenu-4--4" aria-expanded="false">
                                            <span className="visually-hidden">Toggle sub-navigation for Tableau Exchange</span>
                                            <span className="icon--menu-toggle"></span>
                                        </button>

                                        <ul className="menu primary-nav__menu menu--main__v1 primary-nav__menu--level-3" id="submenu-4--4">

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/solutions/exchange/accelerators" data-value="Accelerators" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Accelerators</span>
                                                </a>

                                            </li>
                                        </ul>

                                    </li>

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2">

                                        <a href="https://www.tableau.com/data-insights/dashboard-showcase" data-value="Dashboard Showcase" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">Dashboard Showcase</span>
                                        </a>

                                    </li>
                                </ul>

                            </li>

                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-1 primary-nav__menu-item--has-children">

                                <a href="https://www.tableau.com/resources" data-value="Resources" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-1 primary-nav__menu-link--has-children" data-section="header:primary-link">
                                    <span className="primary-nav__menu-link-inner">Resources</span>
                                </a>

                                <button className="primary-nav__button-toggle" aria-controls="submenu-4--5" aria-expanded="false">
                                    <span className="visually-hidden">Toggle sub-navigation for Resources</span>
                                    <span className="icon--menu-toggle"></span>
                                </button>

                                <ul className="menu primary-nav__menu menu--main__v1 primary-nav__menu--level-2" id="submenu-4--5">

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2">

                                        <a href="https://www.tableau.com/learn/get-started" data-value="Getting Started" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">Getting Started</span>
                                        </a>

                                    </li>

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2 primary-nav__menu-item--has-children">

                                        <a href="https://www.tableau.com/learn" data-value="Learn Tableau" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2 primary-nav__menu-link--has-children" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">Learn Tableau</span>
                                        </a>

                                        <button className="primary-nav__button-toggle" aria-controls="submenu-2--7" aria-expanded="false">
                                            <span className="visually-hidden">Toggle sub-navigation for Learn Tableau</span>
                                            <span className="icon--menu-toggle"></span>
                                        </button>

                                        <ul className="menu primary-nav__menu menu--main__v1 primary-nav__menu--level-3" id="submenu-2--7">

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/events/webinars" data-value="Webinars" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Webinars</span>
                                                </a>

                                            </li>

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/learn/whitepapers" data-value="Whitepapers" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Whitepapers</span>
                                                </a>

                                            </li>

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/learn/articles" data-value="Articles" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Articles</span>
                                                </a>

                                            </li>

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/learn/training" title="Free Training Videos" data-value="Free Training Videos" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Free Training Videos</span>
                                                </a>

                                            </li>

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/learn/data-skills" data-value="Build Data Literacy" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Build Data Literacy</span>
                                                </a>

                                            </li>

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/learn/classroom" data-value="Instructor-led Training" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Instructor-led Training</span>
                                                </a>

                                            </li>

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/learn/training/elearning" data-value="Tableau eLearning" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Tableau eLearning</span>
                                                </a>

                                            </li>

                                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-3">

                                                <a href="https://www.tableau.com/community/academic" data-value="Academic Programs" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-3" data-section="header:tertiary-link">
                                                    <span className="primary-nav__menu-link-inner">Academic Programs</span>
                                                </a>

                                            </li>
                                        </ul>

                                    </li>

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2">

                                        <a href="https://www.tableau.com/community" data-value="Community" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">Community</span>
                                        </a>

                                    </li>

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2">

                                        <a href="https://www.tableau.com/blog" data-value="Blog" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">Blog</span>
                                        </a>

                                    </li>

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2">

                                        <a href="https://www.tableau.com/community/events" data-value="Events" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">Events</span>
                                        </a>

                                    </li>

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2">

                                        <a href="https://www.tableau.com/support" data-value="Support" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">Support</span>
                                        </a>

                                    </li>

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2">

                                        <a href="https://www.tableau.com/support/help" data-value="Tableau Help" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">Tableau Help</span>
                                        </a>

                                    </li>

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2">

                                        <a href="https://trailhead.salesforce.com/" target="_blank" data-value="Trailhead" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">Trailhead</span>
                                        </a>

                                    </li>
                                </ul>

                            </li>

                            <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-1 primary-nav__menu-item--has-children">

                                <a href="https://www.tableau.com/pricing" data-value="Pricing" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-1 primary-nav__menu-link--has-children" data-section="header:primary-link">
                                    <span className="primary-nav__menu-link-inner">Pricing</span>
                                </a>

                                <button className="primary-nav__button-toggle" aria-controls="submenu-5--7" aria-expanded="false">
                                    <span className="visually-hidden">Toggle sub-navigation for Pricing</span>
                                    <span className="icon--menu-toggle"></span>
                                </button>

                                <ul className="menu primary-nav__menu menu--main__v1 primary-nav__menu--level-2" id="submenu-5--7">

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2">

                                        <a href="https://www.tableau.com/product-and-pricing-selector" data-value="Pricing Calculator" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">Pricing Calculator</span>
                                        </a>

                                    </li>

                                    <li className="primary-nav__menu-item primary-nav__menu-item--link primary-nav__menu-item--level-2">

                                        <a href="https://www.tableau.com/pricing/tableau-plus" data-value="Buy Tableau+" className="primary-nav__menu-link primary-nav__menu-link--link primary-nav__menu-link--level-2" data-section="header:primary-sublink">
                                            <span className="primary-nav__menu-link-inner">Buy Tableau+</span>
                                        </a>

                                    </li>
                                </ul>

                            </li>
                        </ul>

                    </div>

                </div>
            </div>
        </div>
        <div className="global-header__secondary-nav fadable fadable--faded-out fadable--faded-in">
            <div id="block-tableau-menu-secondary-nav">

                <div data-embeddable-id="526" className="embeddable">

                    <div className="">
                        <style>{`
                        .cta-green {
                            background-color: #2E844A;
                            border-color: #2E844A;
                        }
                        `}</style>

                        <nav id="tableau-menu-secondary-nav" role="navigation">
                            <ul className="global-header__secondary-menu">

                                {/* contact us and phone number */}
                                <li className="global-header__secondary-item exp-link">
                                    <a href="/about/contact" className="global-header__secondary-link">Contact us</a>
                                </li>
                                <li className="global-header__secondary-item exp-link">
                                    <a href="tel:+18002706977" className="global-header__secondary-link">1-800-270-6977</a>
                                </li>
                                {/* end contact us and phone number */}

                                {/*<li className="global-header__secondary-item"><a className="global-header__secondary-link user-vary-link user-anonymous-show user-guest-show" href="/pricing/">Pricing</a></li>*/}
                                <li className="global-header__secondary-item">
                                    <a className="global-header__secondary-link user-vary-link user-anonymous-show" href="/tableau-login-hub">Sign in</a>
                                </li>
                                <li className="global-header__secondary-item">
                                    <a rel="nofollow" className="global-header__secondary-link user-vary-link user-guest-show" href="/user/account-convert">Create account</a>
                                </li>
                                <li className="global-header__secondary-item">
                                    <a className="global-header__myaccount-link text--dark-body user-vary-link user-customer-show user-partner-show user-authenticated-show" href="/my-tableau">
                                        <span className="my-account-name"></span>
                                    </a>
                                </li>
                            </ul>

                            <ul className="global-header__secondary-menu-ctas" style={{ opacity: 1 }}>
                                <li className="global-header__secondary-item" data-menu-personalize="hide">
                                    <a className="cta cta-green global-header__secondary-cta user-vary-link user-anonymous-show user-guest-show user-authenticated-show section-vary-link section-academic-hide" href="/products/trial">Start for free</a>
                                </li>
                                <li className="global-header__secondary-item" data-menu-personalize="hide">
                                    <a className="cta cta--secondary cta--buy-now global-header__secondary-cta user-vary-link user-anonymous-show section-vary-link section-academic-hide" href="https://buy.tableau.com/">Buy now</a>
                                </li>

                                <li className="global-header__secondary-item">
                                    <a className="cta cta--dark global-header__secondary-cta user-vary-link user-customer-show section-vary-link section-academic-hide" href="/learn/training">Free training</a>
                                </li>
                                <li className="global-header__secondary-item">
                                    <a className="cta cta--dark global-header__secondary-cta user-vary-link user-partner-show" href="/prc/home">Partner portal</a>
                                </li>
                                <li className="global-header__secondary-item">
                                    <a className="cta cta--dark global-header__secondary-cta section-vary-link section-academic-show" href="/products/public/download">Get Tableau for free</a>
                                </li>
                                <li className="global-header__secondary-item hidden" data-menu-personalize="show">
                                    <a className="cta global-header__secondary-cta user-vary-link user-anonymous-show user-guest-show user-authenticated-show section-vary-link section-academic-hide" href="/about/contact/global-sales">Contact sales</a>
                                </li>
                                <li className="global-header__secondary-item hidden" data-menu-personalize="show">
                                    <a className="cta cta-green cta--secondary global-header__secondary-cta user-vary-link user-anonymous-show user-guest-show user-authenticated-show section-vary-link section-academic-hide" href="/products/trial">Start for free</a>
                                </li>
                            </ul>
                        </nav>

                    </div>
                </div>

            </div>

            <div className="global-header__search-wrapper">
                <div className="global-header__search autocomplete" data-selector="global-search">
                    <input data-selector="global-search-input" className="global-header__search-input autocomplete-input" name="q" type="search" placeholder="Search" autoComplete="off" />
                    <ul id="suggestions-list" data-selector="global-search-suggestions" className="global-header__search-results autocomplete-result-list"></ul>
                    <button data-selector="global-search-close" className="global-header__search-close">
                        <span className="sr-only">Cancel Search</span>
                    </button>
                </div>
            </div>
        </div>
    </nav>
</header>

    <div id="1793624351646_7tx" data-blade-id="1793624351646_7tx" data-blade-position="1" data-blade-name="sf/contiguouscontainer" data-blade-variant="contiguouscontainer" data-blade-source="www" data-blade-type="blade">
      <div id="ts2026-marquee" className="relative contiguouscontainer--blade theme--light_gradient">
    <div className="container container--full-width">

        <div id="1793624354073_1c6i" data-blade-id="1793624354073_1c6i" data-blade-position="1" data-blade-name="sf/marquee" data-blade-variant="marquee" data-blade-source="www" data-blade-type="blade">

            <section id="ts2026-marquee-video" className="relative marquee--blade marquee--center-image
                     theme--light_gradient  theme-light-blue-20">
                <div className="container container--min-spacing-bottom container--min-spacing-top">

                    <article className="grid grid_main grid--threebytwo" data-module-track-impressions="false" data-module-id="1793624354073_1c6i" data-module-name="Tableau Studio" data-module-position="1" data-module-type="headline">

                        <div className="image__wrapper ">

                            <img loading="eager" src="https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/11/tableau-studio-2026-marquee.jpg?w=1024" className="image__asset" alt="" sizes="100vw" srcSet="https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/11/tableau-studio-2026-marquee.jpg?resize=150,150 150w,https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/11/tableau-studio-2026-marquee.jpg?resize=300,188 300w,https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/11/tableau-studio-2026-marquee.jpg?resize=768,482 768w,https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/11/tableau-studio-2026-marquee.jpg?resize=1024,642 1024w,https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/11/tableau-studio-2026-marquee.jpg?resize=1536,963 1536w,https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/11/tableau-studio-2026-marquee.jpg?resize=2048,1285 2048w" height="642" width="1024" />

                        </div>

                        <div className="content__wrapper ">
                            <header className="marquee__blade-heading eyebrow--standard ">

                                <h1 className="headline marquee__headline--standard">
                                    
                                        Tableau Studio
                                    

                                </h1>

                                <div className="blade__description">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mattis magnanec cursus sodales, lorem nulla vehicula ante ultricies turpisex ante.</p>

                                </div>

                            </header>

                            <div className="cta_container flex flex--center ctas__1">

                                <pbc-button className="cta_button__wrapper" data-link-text="Start for free" data-link-url="https://google.com" data-link-type="primary cta">

                                    <a className="cta_button " data-size="" data-variant="primary" data-stacking="default" aria-label="Start for free: Tableau Studio" href="https://google.com">
                                        Start for free
                                        
                                        
                                        
                                        
                                            
                                                
                                            
                                        
                                        

                                        
                                    </a>

                                </pbc-button>

                            </div>

                        </div>

                    </article>
                </div>

            </section>

        </div>

        <div id="1793633945482_1cwz" data-blade-id="1793633945482_1cwz" data-blade-position="1" data-blade-name="sf/media" data-blade-variant="media" data-blade-source="www" data-blade-type="blade">

            <section id="ts2026-marquee-video-1" className="relative media--blade media--center-image
                     theme--light_gradient  theme-light-blue-20">
                <div className="container container--min-spacing-bottom container--min-spacing-top">

                    <article className="grid grid_main grid--sixteenbynine" data-module-track-impressions="false" data-module-id="1793633945482_1cwz" data-module-name="" data-module-position="1" data-module-type="headline">

                        <div className="video__wrapper">

                            <div className="video-html5 desktop-only">
                                <video data-component="html5video" preload="none" playsInline muted poster="https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/11/how-is-arr-trending-poster.png?w=1024">

                                    <source src="https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/11/how-is-arr-trending.mp4" type="video/mp4" />

                                </video>
                            </div>
                            <div className="video-html5 mobile-tablet-only">
                                <video data-component="html5video" preload="none" playsInline muted poster="https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/11/how-is-arr-trending-poster-mobile.png?w=639">

                                    <source src="https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/11/how-is-arr-trending-mobile.mp4" type="video/mp4" />

                                </video>
                            </div>

                        </div>

                        <div className="content__wrapper">
                            <div className="content__container">

                                <div className="display_caption
                                                two_tone">
                                    <p>How is ARR trending? Show as a pie chart.</p>

                                </div>

                            </div>
                        </div>


                    </article>
                </div>

            </section>

        </div>

        <div id="1793634928490_aw9" data-blade-id="1793634928490_aw9" data-blade-position="1" data-blade-name="sf/media" data-blade-variant="media" data-blade-source="www" data-blade-type="blade">

            <section id="ts2026-marquee-video-2" className="relative media--blade media--center-image
                     theme--light_gradient  theme-light-blue-20">
                <div className="container container--min-spacing-bottom container--min-spacing-top">

                    <article className="grid grid_main grid--sixteenbynine" data-module-track-impressions="false" data-module-id="1793634928490_aw9" data-module-name="" data-module-position="1" data-module-type="headline">

                        <div className="video__wrapper">

                            <div className="video-html5 desktop-only">
                                <video data-component="html5video" preload="none" playsInline muted poster="https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/11/how-is-my-pipeline-progressing-poster.png?w=1024">

                                    <source src="https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/11/how-is-my-pipeline-progressing.mp4" type="video/mp4" />

                                </video>
                            </div>
                            <div className="video-html5 mobile-tablet-only">
                                <video data-component="html5video" preload="none" playsInline muted poster="https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/11/how-is-my-pipeline-progressing-poster-mobile.png?w=639">

                                    <source src="https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/11/how-is-my-pipeline-progressing-mobile.mp4" type="video/mp4" />

                                </video>
                            </div>

                        </div>

                        <div className="content__wrapper">
                            <div className="content__container">

                                <div className="display_caption
                                                two_tone">
                                    <p>How is my pipeline progressing across all segments?</p>

                                </div>

                            </div>
                        </div>


                    </article>
                </div>

            </section>

        </div>

        <div id="1793634933284_19xb" data-blade-id="1793634933284_19xb" data-blade-position="1" data-blade-name="sf/media" data-blade-variant="media" data-blade-source="www" data-blade-type="blade">

            <section id="ts2026-marquee-video-3" className="relative media--blade media--center-image
                     theme--light_gradient  theme-light-blue-20">
                <div className="container container--min-spacing-bottom container--min-spacing-top">

                    <article className="grid grid_main grid--sixteenbynine" data-module-track-impressions="false" data-module-id="1793634933284_19xb" data-module-name="" data-module-position="1" data-module-type="headline">

                        <div className="video__wrapper">

                            <div className="video-html5 desktop-only">
                                <video data-component="html5video" preload="none" playsInline muted poster="https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/11/create-an-interactive-data-app-poster.png?w=1024">

                                    <source src="https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/11/create-an-interactive-data-app.mp4" type="video/mp4" />

                                </video>
                            </div>
                            <div className="video-html5 mobile-tablet-only">
                                <video data-component="html5video" preload="none" playsInline muted poster="https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/11/create-an-interactive-data-app-poster-mobile.png?w=639">

                                    <source src="https://wp.sfdcdigital.com/en-us/wp-content/uploads/sites/4/2026/11/create-an-interactive-data-app-mobile.mp4" type="video/mp4" />

                                </video>
                            </div>

                        </div>

                        <div className="content__wrapper">
                            <div className="content__container">

                                <div className="display_caption
                                                two_tone">
                                    <p>Create an interactive data app for global revenue.</p>

                                </div>

                            </div>
                        </div>


                    </article>
                </div>

            </section>

        </div>

        <div id="1793890179097_1b5t" data-blade-id="1793890179097_1b5t" data-blade-position="1" data-blade-name="sf/text" data-blade-variant="text" data-blade-source="www" data-blade-type="blade">

            <section id="ts2026-marquee-text" className="relative text--blade theme--light_gradient  theme-light-blue-20
                    ">

                <div className="container container--min-spacing-bottom container--min-spacing-top">
                    <article className="grid grid_main text__blade--link_below text--center
                            " data-module-id="1793890179097_1b5t" data-module-name="* Some features are only available with Tableau Cloud." data-module-position="1" data-module-type="headline" data-module-track-impressions="false">

                        <header className="text__blade-heading eyebrow--large ">

                            <h2 className="headline text__headline--large">
                                
                                    * Some features are only available with Tableau Cloud.
                                

                            </h2>

                        </header>

                    </article>
                </div>

            </section>

        </div>

        <div id="1793993141537_ajq" data-blade-id="1793993141537_ajq" data-blade-position="1" data-blade-name="sf/text" data-blade-variant="text" data-blade-source="www" data-blade-type="blade">

            <section id="ts2026-marquee-dropdown-btn" className="relative text--blade theme--light_gradient  theme-light-blue-20
                    ">

                <div className="container container--min-spacing-bottom container--min-spacing-top">
                    <article className="grid grid_main text__blade--link_below text--left
                            " data-module-id="1793993141537_ajq" data-module-name="Want to explore more?" data-module-position="1" data-module-type="headline" data-module-track-impressions="false">

                        <header className="text__blade-heading eyebrow--large  grid grid_sub">

                            <h2 className="headline text__headline--large">
                                
                                    Want to explore more?
                                

                            </h2>

                        </header>

                        <div className="text__blade-cta">

                            <div className="cta_container flex flex--left ctas__1">

                                <pbc-button className="cta_button__wrapper" data-link-text="Download for free" data-link-url="https://google.com" data-link-type="primary cta">

                                    <a className="cta_button " data-size="" data-variant="primary" data-stacking="default" aria-label="Download for free: Want to explore more?" href="https://google.com">
                                        Download for free
                                        
                                        
                                        
                                        
                                            
                                                
                                            
                                        
                                        

                                        
                                    </a>

                                </pbc-button>

                            </div>

                        </div>

                    </article>
                </div>

            </section>

        </div>

    </div>

</div>


    </div>
    </div>
  );
}
