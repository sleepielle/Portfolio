

API authentication ensures that only authorized users or systems can access your endpoints. One of the most common methods is using **API keys**, which are simple tokens passed in headers or query parameters. While easy to implement, API keys lack fine-grained access control and are best suited for internal or low-security use cases.

Another popular method is **JWT (JSON Web Token)** authentication. With JWTs, the server issues a signed token upon login, and the client includes it with each request. Because JWTs are stateless and self-contained, they scale well in distributed environments and are often used in modern single-page applications.

## OAuth 2.0 and Beyond

For more complex applications, especially those involving third-party integrations or delegated access, **OAuth 2.0** is the standard. It allows users to authorize apps without sharing passwords, using access tokens and refresh tokens to maintain sessions. Services like Google, GitHub, and Facebook use OAuth for login and API access.

Other strategies include **session-based authentication** (more common in traditional web apps) and **HTTP Basic Auth**, which is rarely used due to its simplicity and lack of security over non-HTTPS connections. Choosing the right method depends on your app's architecture, level of sensitivity, and user experience goals.


```js
    const [leftDesignScope, leftDesignAnimate] = useAnimate();
    const [leftPointerScope, leftPointerAnimate] = useAnimate();

    const [rightDesignScope, rightDesignAnimate] = useAnimate();
    const [rightPointerScope, rightPointerAnimate] = useAnimate();


	leftPointerAnimate([
	    [leftPointerScope.current, { opacity: 1 }, { duration: 0.5 }],
	    [leftPointerScope.current, { y: 0, x: -100 }, { duration: 0.5 }],
	    [leftPointerScope.current, { x: 0, y: [0, 16, 0] }, { duration: 0.5 }],
	]);

//Se van encadenando varias animaciones: primero se establece la opacidad, luego se mueve a una posición y finalmente se genera un pequeño "bote" (la propiedad y varía entre 0, 16 y vuelve a 0).
```
