
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAdBXJ1zbnCq5lEy4ZWI7NH0fpatkRlIn0",
    authDomain: "digitalpets-d3444.firebaseapp.com",
    databaseURL: "https://digitalpets-d3444.firebaseio.com",
    projectId: "digitalpets-d3444",
    storageBucket: "digitalpets-d3444.appspot.com",
    messagingSenderId: "1053936998540",
    appId: "1:1053936998540:web:9f4b52e3f96a84b0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

database = firebase.database();



function DigitalPal(name) {
    this.name = name;
    this.hungry = false;
    this.sleepy = false;
    this.bored = true;
    this.age = 0;
    this.feed = function () {
        if (this.hungry === true) {
            console.log("That was yummy!");
            petTalk("That was yummy!");
            this.hungry = false;
            this.sleepy = true;
            setDataBase();
        }

        else if (this.hungry === false) {
            console.log("no thank! I'm full!");
            petTalk("no thank! I'm full!");
        }
    };

    this.sleep = function () {
        if (this.sleepy === true) {
            console.log("ZZZzzzzzZZZZZZzzzzzzzZZZZ");
            petTalk("ZZZzzzzzZZZZZZzzzzzzzZZZZ");
            this.sleepy = false;
            this.bored = true;
            this.increaseAge();
            setDataBase();
        }
        else if (this.sleepy === false) {
            console.log("No way! I'm not tired.")
            petTalk("No way! I'm not tired.");
        }
    };

    this.play = function () {
        if (this.bored === true) {
            console.log("yay lets play");
            petTalk("yay lets play");
            this.bored = false;
            this.hungry = true;
            setDataBase();
        }
        else if (this.bored === false) {
            console.log("Not right now. Later?");
            petTalk("Not right now. Later?");
        }
    };

    this.increaseAge = function () {
        this.age = this.age + 1;
        console.log("Happy Birthday to me! I am " + this.age + " old!");
        petTalk("Happy Birthday to me! I am " + this.age + " old!");
    };
};

let dog = new DigitalPal("Eddy");
dog.outside = false;
dog.bark = function () {
    console.log("wooof wooof");
    petTalk("wooof wooof");
};
dog.goOutSide = function () {
    if (this.outside === false) {
        console.log("yay I love the outside");
        petTalk("yay I love the outside");
        this.outside = true;
        this.bark();
        setDataBase();
    }
    else if (this.outside === true) {
        console.log("...... we're already outside!");
        petTalk("...... we're already outside!");
    }
};
dog.goInSide = function () {
    if (this.outside === true) {
        console.log("aww do we have too!!");
        petTalk("aww do we have too!!");
        this.outside = false;
        setDataBase();
    }
    else if (this.outside === false) {
        console.log("hey were already inside!");
        petTalk("hey were already inside!");
    };
};


let cat = new DigitalPal("Uno");
cat.houseCondition = 100;
cat.meow = function () {
    console.log("meow meow");
    petTalk("meow meow");
};
cat.destroyFurniture = function () {
    if (this.houseCondition === 0) {
        console.log("theres nothing left");
        petTalk("theres nothing left");
    }
    else {
        this.houseCondition = this.houseCondition - 10;
        console.log("MUAHAHAHAHA! TAKE THAT FURNITURE!")
        petTalk("MUAHAHAHAHA! TAKE THAT FURNITURE!");
        this.bored = false;
        this.sleepy = true;
        setDataBase();
    };
};
cat.buyNewFurniture = function () {
    this.houseCondition += 50;
    setDataBase();
    console.log("are you sure about that!");
    petTalk("are you sure about that!");
};

var palyerPick;


function petTalk(string) {
    $("#petTalk").empty();
    var p = $("<p>").html(string);
    $("#petTalk").append(p);
};

function gameStart() {
    $("#gameControls").empty();
    var dir = $("<p>").html("Which animal do you want to play with?");
    $("#petTalk").empty();
    $("#petTalk").append(dir);
    var cat = $("<button>").addClass("btn btn-primary m-2").attr("id", "cat").html("cat");
    var dog = $("<button>").addClass("btn btn-primary m-2").attr("id", "dog").html("dog");
    $("#gameControls").append(cat, dog);

};

function catControl() {
    $("#gameControls").empty();
    $("#petTalk").empty();
    var feed = $("<button>").addClass("btn btn-primary m-2").attr("id", "feed").html("feed");
    var sleep = $("<button>").addClass("btn btn-primary m-2").attr("id", "sleep").html("sleep");
    var play = $("<button>").addClass("btn btn-primary m-2").attr("id", "play").html("play");
    var furn = $("<button>").addClass("btn btn-primary m-2").attr("id", "destroy").html("Destroy Furniture");
    var buyFurn = $("<button>").addClass("btn btn-primary m-2").attr("id", "buyFurn").html("Buy New Furniture");
    $("#gameControls").append(feed, sleep, play, furn, buyFurn);
};

function dogControl() {
    $("#gameControls").empty();
    $("#petTalk").empty();
    var feed = $("<button>").addClass("btn btn-primary m-2").attr("id", "feed").html("feed");
    var sleep = $("<button>").addClass("btn btn-primary m-2").attr("id", "sleep").html("sleep");
    var play = $("<button>").addClass("btn btn-primary m-2").attr("id", "play").html("play");
    var outside = $("<button>").addClass("btn btn-primary m-2").attr("id", "goOutside").html("Go Outside");
    var inside = $("<button>").addClass("btn btn-primary m-2").attr("id", "goInside").html("go Inside");
    $("#gameControls").append(feed, sleep, play, outside, inside);
};

$(document).on("click", "#cat", function () {
    catControl();
    playerPick = "cat";
});
$(document).on("click", "#dog", function () {
    dogControl();
    playerPick = "dog";
    console.log(playerPick);
});

function setDataBase() {

    database.ref("/cat").set({
        name: cat.name,
        hungry: cat.hungry,
        sleepy: cat.sleepy,
        bored: cat.bored,
        age: cat.age,
        houseCondition: cat.houseCondition,
    });

    database.ref("/dog").set({
        name: dog.name,
        hungry: dog.hungry,
        sleepy: dog.sleepy,
        bored: dog.bored,
        age: dog.age,
        outside: dog.outside,
    });


};

// cat status updater
database.ref("/cat").on("value", function (snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().email);
    console.log(snapshot.val().age);
    console.log(snapshot.val().comment);

    // Change the HTML to reflect
    $("#catName").text("Name: " + snapshot.val().name);
    $("#catHungry").text("Hungry: " + snapshot.val().hungry);
    $("#catSleepy").text("Sleepy: " + snapshot.val().sleepy);
    $("#catBored").text("Bored: " + snapshot.val().bored);
    $("#catAge").text("Age: " + snapshot.val().age);
    $("#catHouseCondition").text("House: " + snapshot.val().houseCondition);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});



//dog status updater
database.ref("/dog").on("value", function (snapshot) {



    // Change the HTML to reflect
    $("#dogName").text("name: " + snapshot.val().name);
    $("#dogHungry").text("Hungry: " + snapshot.val().hungry);
    $("#dogSleepy").text("Sleepy: " + snapshot.val().sleepy);
    $("#dogBored").text("Bored: " + snapshot.val().bored);
    $("#dogAge").text("Age: " + snapshot.val().age);
    $("#dogOutside").text("Outside: " + snapshot.val().outside);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

//button click events
$(document).on("click", "#feed", function () {
    if (playerPick == "cat") {
        cat.feed();
    }
    else if (playerPick == "dog") {
        dog.feed();
    }
});

$(document).on("click", "#sleep", function () {
    if (playerPick == "cat") {
        cat.sleep();
    }
    else if (playerPick == "dog") {
        dog.sleep();
    }
});

$(document).on("click", "#play", function () {
    if (playerPick == "cat") {
        cat.play();
    }
    else if (playerPick == "dog") {
        dog.play();
    }
});

$(document).on("click", "#destroy", function () {
    if (playerPick == "cat") {
        cat.destroyFurniture();
    }

});

$(document).on("click", "#buyFurn", function () {
    if (playerPick == "cat") {
        cat.buyNewFurniture();
    }

});

$(document).on("click", "#goOutside", function () {
    if (playerPick == "dog") {
        dog.goOutSide();
    }

});

$(document).on("click", "#goInside", function () {
    if (playerPick == "dog") {
        dog.goInSide();
    }

});

gameStart();

