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
      cmd_add_prefix(invoking_user, target_user_name, text);
    }
  },
  "/no_prefix": {
    requires_mod: true,
    action: function(invoking_user, target_user_name, text) {
      cmd_remove_prefix(invoking_user, target_user_name);
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
      cmd_toggle_menu();
    }
  }
};
var menu_on = true;

function cmd_toggle_menu() {
  if (menu_on) {
    console.log("the menu is on.");
  } else {
    console.log("the menu is off.");
  }
}

function cmd_add_prefix(user, target_user, text) {
  console.log(`called addPrefix('${user}','${target_user}','${text}')`);
}
function cmd_remove_prefix(target_user, text) {
  console.log(`called removePrefix('${target_user}','${text}')`);
}

function execute_command(messageText, invoking_user) {
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

execute_command("/menu", { is_mod: false });
menu_on = false;
execute_command("/menu", { is_mod: false });
execute_command("/prefix user1 llama", { is_mod: true });
execute_command("/prefix user2 XX", { is_mod: false });
execute_command("/no_prefix user1", { is_mod: true });

function build_tip_menu(settings) {
  var result = {
    get_item(amount) {
      if (result[amount] !== undefined) {
        return result[amount];
      }
    }
  };
  // TODO: enumerate the settings and find the tip menu items.
  // for now we'll hard code them.
  result[8] = "I like potatoes.";
  result[88] = "I love potatoes.";
  result[888] = "I am a potato.";
  return result;
}

var tip_menu = build_tip_menu({});

console.log(tip_menu.get_item_by_price("8"));
console.log(tip_menu.get_item_by_price(8));
