var kasta = require ("./");

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

describe ("User roles and access levels", function (){
  it ("should generate 3 roles and 4 access levels with bitMasks", function () {
    Object.keys(kasta(config).accessLevels).length.should.equal(4);
    Object.keys(kasta(config).userRoles).length.should.equal(3);

    Object.keys(kasta(config).accessLevels).forEach(function(role){
      kasta(config).accessLevels[role].should.have.property("bitMask");
      kasta(config).accessLevels[role].bitMask.should.not.equal(null);
    });

    Object.keys(kasta(config).userRoles).forEach(function(role){
      kasta(config).userRoles[role].should.have.property("bitMask");
      kasta(config).userRoles[role].bitMask.should.not.equal(null);
    });
    
  });

  it ("should forbid public role to access user access level", function (){
    var role = kasta(config).userRoles["public"];
    var accessLevel = kasta(config).accessLevels["user"];
    var allowed = role.bitMask & accessLevel.bitMask;
    (allowed > 0).should.be.false;
  });

  it ("should allow user role to access user access level", function (){
    var role = kasta(config).userRoles["user"];
    var accessLevel = kasta(config).accessLevels["user"];
    var allowed = role.bitMask & accessLevel.bitMask;
    (allowed > 0).should.be.true;
  });

  it ("should forbid user role to access admin access level", function (){
    var role = kasta(config).userRoles["user"];
    var accessLevel = kasta(config).accessLevels["admin"];
    var allowed = role.bitMask & accessLevel.bitMask;
    (allowed > 0).should.be.false;
  });


  it ("should allow admin role to access user access level", function (){
    var role = kasta(config).userRoles["admin"];
    var accessLevel = kasta(config).accessLevels["user"];
    var allowed = role.bitMask & accessLevel.bitMask;
    (allowed > 0).should.be.true;
  });
})