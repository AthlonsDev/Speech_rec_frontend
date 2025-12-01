
export default function Auth() {
    return (
        <>
        <div>
            <h1>Authentication Page</h1>
            <p>This page handles user authentication using OpenID Connect.</p>
        </div>
        <div>
        <h1>Amazon Cognito User Pool Demo</h1>
        </div>
        </>
    );

    // let client;
    // // Initialize OpenID Client
    // async function initializeClient() {
    //     const issuer = await Issuer.discover('https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_68NYuy0mG');
    //     client = new issuer.Client({
    //         client_id: '7v1j6ai4i7d4apc9ptm5hm2tc4',
    //         client_secret: '<client secret>',
    //         redirect_uris: ['https://d84l1y8p4kdic.cloudfront.net'],
    //         response_types: ['code']
    //     });
    // };
    // initializeClient().catch(console.error);

    // app.use(session({
    //     secret: 'some secret',
    //     resave: false,
    //     saveUninitialized: false
    // }));

    // const checkAuth = (req, res, next) => {
    //     if (!req.session.userInfo) {
    //         req.isAuthenticated = false;
    //     } else {
    //         req.isAuthenticated = true;
    //     }
    //     next();
    // };

    // app.get('/', checkAuth, (req, res) => {
    //     res.render('home', {
    //         isAuthenticated: req.isAuthenticated,
    //         userInfo: req.session.userInfo
    //     });
    // });

    // app.get('/login', (req, res) => {
    //     const nonce = generators.nonce();
    //     const state = generators.state();

    //     req.session.nonce = nonce;
    //     req.session.state = state;

    //     const authUrl = client.authorizationUrl({
    //         scope: 'email openid phone',
    //         state: state,
    //         nonce: nonce,
    //     });

    //     res.redirect(authUrl);
    // });


    // // Helper function to get the path from the URL. Example: "http://localhost/hello" returns "/hello"
    // function getPathFromURL(urlString) {
    //     try {
    //         const url = new URL(urlString);
    //         return url.pathname;
    //     } catch (error) {
    //         console.error('Invalid URL:', error);
    //         return null;
    //     }
    // }

    // app.get(getPathFromURL('https://d84l1y8p4kdic.cloudfront.net'), async (req, res) => {
    //     try {
    //         const params = client.callbackParams(req);
    //         const tokenSet = await client.callback(
    //             'https://d84l1y8p4kdic.cloudfront.net',
    //             params,
    //             {
    //                 nonce: req.session.nonce,
    //                 state: req.session.state
    //             }
    //         );

    //         const userInfo = await client.userinfo(tokenSet.access_token);
    //         req.session.userInfo = userInfo;

    //         res.redirect('/');
    //     } catch (err) {
    //         console.error('Callback error:', err);
    //         res.redirect('/');
    //     }
    // });


    // // Logout route
    // app.get('/logout', (req, res) => {
    //     req.session.destroy();
    //     const logoutUrl = `https://eu-west-268nyuy0mg.auth.eu-west-2.amazoncognito.com/logout?client_id=7v1j6ai4i7d4apc9ptm5hm2tc4&logout_uri=<logout uri>`;
    //     res.redirect(logoutUrl);
    // });

    // return (
    //     <>
    //     <div>
    //         <h1>Authentication Page</h1>
    //         <p>This page handles user authentication using OpenID Connect.</p>
    //     </div>
    //     <div>
    //     <h1>Amazon Cognito User Pool Demo</h1>

    //     if (req.isAuthenticated) {
    //         <><p>Welcome, {req.session.userInfo.email}!</p><a href="/logout">Logout</a></>
    //     } else {
    //         <><p>You are not logged in.</p><a href="/login">Login</a></>
    //     }
    //     </div>
    //     </>
    // );

}