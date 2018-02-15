// playground node.js app for testing ideas on how to restructure the bot.

var message = "A Test App.";
console.log(message);
var possessives = {
  m: "his",
  f: "her",
  s: "its",
  c: "their"
};

var gender = "m";
console.log(possessives[gender]);
gender = "f";
console.log(possessives[gender]);
gender = "s";
console.log(possessives[gender]);
gender = "c";
console.log(possessives[gender]);

var settings_choices = [
  {
    name: "name1",
    value: "value1"
  },
  {
    name: "name2",
    value: "value2"
  }
];

var createMapFromList = function(objectList, property) {
  var objMap = {};
  objectList.forEach(function(obj) {
    objMap[obj[property]] = obj;
  });
  return objMap;
};
var settings = createMapFromList(settings_choices, "name");
console.log(settings["name1"].value);
console.log(settings["name2"].value);
console.log(settings.name1.value);
console.log(settings.name2.value);

var commands = {
  "/prefix": {
    requires_mod: true,
    action: function(invoking_user, target_user_name, text) {
      addPrefix(invoking_user, target_user_name, text);
    }
  },
  "/no_prefix": {
    requires_mod: true,
    action: function(invoking_user, target_user_name, text) {
      removePrefix(invoking_user, target_user_name);
    }
  },
  "/claim": {
    requires_mod: true,
    action: function(invoking_user, target_user_name, text) {}
  },
  "/free": {
    requires_mod: true,
    action: function(invoking_user, target_user_name, text) {}
  },
  "/notice": {
    requires_mod: true,
    action: function(invoking_user, target_user_name, text) {}
  },
  "/silence": {
    requires_mod: true,
    action: function(invoking_user, target_user_name, text) {}
  },
  "/release": {
    requires_mod: true,
    action: function(invoking_user, target_user_name, text) {}
  },
  "/private": {
    requires_mod: true,
    action: function(invoking_user, target_user_name, text) {}
  },
  "/tippers": {
    requires_mod: true,
    action: function(invoking_user, target_user_name, text) {}
  },
  "/menu": {
    requires_mod: false,
    action: function(invoking_user, target_user_name, text) {
      showMenu();
    }
  }
};
var menu_on = true;

function showMenu() {
  if (menu_on) {
    console.log("the menu is on.");
  } else {
    console.log("the menu is off.");
  }
}

function addPrefix(user, target_user, text) {
  console.log(`called addPrefix('${user}','${target_user}','${text}')`);
}
function removePrefix(target_user, text) {
  console.log(`called removePrefix('${target_user}','${text}')`);
}

function executeCommand(messageText, invoking_user) {
  var is_mod = invoking_user.is_mod;
  var parts = messageText.split(" ");
  var cmdText = parts[0];
  var cmd = commands[cmdText];
  var target_user_name = null;
  var text = null;
  if (parts.length >= 2) target_user_name = parts[1];
  if (parts.length >= 3) {
    parts.splice(0, 2);
    text = parts.join(" ");
  }
  // if we have a command, and it's public, or the invoking user is a mod, allow it to execute.
  if (cmd != null) {
    if (!cmd.requires_mod || is_mod) {
      cmd.action(invoking_user, target_user_name, text);
    } else {
      console.log(
        `${invoking_user} attempted to execute ${cmdText} but is not a mod.`
      );
    }
  }
}

executeCommand("/menu", { is_mod: false });
menu_on = false;
executeCommand("/menu", { is_mod: false });
executeCommand("/prefix user1 llama", { is_mod: true });
executeCommand("/prefix user2 XX", { is_mod: false });
executeCommand("/no_prefix user1", { is_mod: true });
