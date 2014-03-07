# Kasta

Given a JSON-based config

```js
var config = {
  /**
   * list of roles 
   */
  roles :[
    "public",
    "user",
    "admin"],

  /**
   * access levels
   */
  accessLevels : {
    "public" : "*",
    "anonymous" : [ "public" ],
    "user" : [ "user", "admin" ],
    "admin" : [ "admin" ]
  }
}
```

```js
var kasta = require ("kasta");
console.log (kasta(config));
```

Transform it into 

```js
{
  userRoles: {
    public: {
        bitMask: 1,
        title: 'public'
    },
    user: {
        bitMask: 2,
        title: 'user'
    },
    admin: {
        bitMask: 4,
        title: 'admin'
    }
  },
  accessLevels: {
    public: {
        bitMask: 7
    },
    anonymous: {
        bitMask: 1
    },
    user: {
        bitMask: 6
    },
    admin: {
        bitMask: 4
    }
  }
}
```

Then we can check if someone with specific roles can access a defined level

```js

var role = kasta(config).userRoles["admin"];
var accessLevel = kasta(config).accessLevels["user"];

var allowed = role.bitMask & accessLevel.bitMask;

if (allowed) {
  // congratulate the user!
} else {
  // throw error
}
```

# License

MIT